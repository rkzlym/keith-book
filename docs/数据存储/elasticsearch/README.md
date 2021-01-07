# elasticsearch

## 倒排索引

解释：已知数据，欲检索文件，这是建立：数据——文件的映射。

详解：先经过<font color=red>分词</font>后检索文档中的数据，收集并按得分排序，当用户搜索相应关键字时，就按照得分较高的文档返回给用户。

## es分布式架构原理

概念：es会有多个shard，一个Index中的数据可能存放在多个Shard中，每个Shard存放在不同的服务器中，每个Shard都有备份（replica）。es集群会自动选举一个节点为master节点，用于做一些管理工作，比如维护索引元数据，切换primary shard和replica shard身份。若master宕机，那么会重新选举一个节点为master节点。若非master宕机，那个节点的primary shard的身份就转移到了replica shard。

![image-20200209173421615](E:/Resources/doc/img/es集群架构.png)

## es写数据过程

1. 客户端选择一个node发送请求过去，这个node就是coordinating node（协调节点）。
2. coordinating node，对数据进行哈希，对document进行路由，将请求转发给对应的node（有primary shard）。
3. 实际的node上的primary shard处理请求，然后将数据同步到replica node。
4. coordinating node如果发现primary node和所有replica node都处理完后，就返回相应结果给客户端。

**如何写到primary shard**

1. 先将数据写入buffer，同时写入translog日志文件，这时buffer中的数据是搜索不到的。

2. 如果buffer快满了，es默认每隔一秒就会将buffer中的数据写入到一个新的segment file中，每秒都会产生一个新的磁盘文件(segment file)，但此时数据不是直接进入segment file的磁盘文件的，而是先进入os cache的，这个过程就是refresh。

3. 只要buffer中的数据被刷入os cache中，就代表这个数据可以被搜索到了。

4. 每写一次buffer，同时会写入一条日志到translog日志文件中去，所以translog是不断变大的，当translog大到一定程度的时候，就会执行flush操作。

5. flush操作：

   ① commit point：标识这一次commit对应了哪些segment file

   ② 将os cache数据fsync强刷到磁盘上

   ③ 清空translog日志文件

6. 所以es是准实时的，数据写入后1秒可以搜索到，5秒停留在buffer、translog os cache、segment os cache 中，可能有5秒的数据不在磁盘上，如果宕机可能导致5秒的数据丢失。

![image-20200209173702904](E:/Resources/doc/img/es写数据流程.png)

## es读数据过程

**查询**

客户端GET某一条数据，协调节点通过负载均衡算法挑选一个节点查询，节点返回数据给协调节点，协调节点再将数据返回给客户端。

**搜索**

将搜索请求发送到所有的shard节点中，挑选一个primary shard 或 replica shard进行查询，然后评比一下哪些Document与搜索关键字的相关度最高，协调节点拿到所有shard返回的匹配的doc id，再次根据doc id去各个节点查询完整Document，进行筛选最匹配的那些Document，再返回给客户端。

## es在数据量很大的情况下如何提升查询效率

**filesystem cache**

要点：es减少数据量仅仅放搜索关键字段，尽量保证数据量不超过filesystem cache，不用来检索的数据放hbase中（如果没有hbase可以放mysql）。

es会先查询filesystem cache，如果没有再去查询磁盘，从磁盘中查询出的数据存到cache中，下次查询速度就快了。

要想让es性能提升，最佳情况下需要将机器的内存至少达到你总数据量的一半。

举例：1T的数据量，所有集群的filesystem cache容量总和需要512G以上。

还有注意：es中仅仅写入少数几个用来被检索的字段就可以了，其它字段可以存放在hbase里面。

hbase特点：适用于海量数据的在线存储，不做复杂搜索，就做很简单的根据ID或范围查询的一些操作。

流程举例：从es根据名称和年龄搜索，拿到20个dog id，根据id去hbase中查询每个dog id对应的完整数据。

**数据预热**

如果需要放入es的数据实在太多，超过了filesystem cache的一倍，就需要做一个专门的缓存预热子系统，每隔一段时间，使用这个系统提前访问一些热点数据，让其存到filesystem cache，之后用户来搜索数据的时候，就会很快了。

**冷热分离**

es可以将大量的访问量很少，频率较低的数据，单独写一个索引，然后将访问量比较大的数据单独写一个索引。

**Document模型设计**

不要在es的搜索中进行一些复杂搜索，而是要在写入es的时候就查询（比如关联查询）好这些数据写入好es中。

**分页性能优化**

es分页机制：假如每页10条数据，你要查询第100页，es会把每个shard上存储的前1000条数据都查询一个协调节点上，如果有5个shard，那么就有5000条数据，接着协调节点对5000条数据进行合并处理，再最终获取到100页的10条数据。所以越翻到后面性能越差。

解决方案1： 不允许深度分页

解决方案2： <font color=blue>scroll api</font>, scroll会一次性给你生成所有数据的一个快照，每次翻页就是通过游标移动，获取下一页，性能会比上面的分页性能高很多。无论翻多少页，性能基本上都是毫秒级的。缺点是只能一页一页往后翻，不能随意跳页。

## 脑裂问题

定义：不同的节点对于master的选择出现了分歧，出现了多个master竞争，导致主分片和副本的识别也发生了分歧，对一些分歧中的分片标识为了坏片。

**原因**

1. 网络问题：集群间的网络延迟导致一些节点访问不到master，认为master挂掉了从而选举出新的master，并对master上的分片和副本标红，分配新的主分片

2. 节点负载：主节点的角色既为master又为data，访问量较大时可能会导致ES停止响应造成大面积延迟，此时其他节点得不到主节点的响应认为主节点挂掉了，会重新选取主节点。

3. 内存回收：data节点上的ES进程占用的内存较大，引发JVM的大规模内存回收，造成ES进程失去响应。

**脑裂问题解决方案**

1. 可以适当调大节点状态的响应时间：discovery.zen.ping_timeout，默认为3s

2. 选举触发

   discovery.zen.minimum_master_nodes（默认是1）：这个参数控制的是，一个节点需要看到的具有master节点资格的最小数量，然后才能在集群中做操作。官方的推荐值是(N/2)+1，其中N是具有master资格的节点的数量（我们的情况是3，因此这个参数设置为2，但对于只有2个节点的情况，设置为2就有些问题了，一个节点DOWN掉后，你肯定连不上2台服务器了，这点需要注意）。增大该参数，当该值为2时，我们可以设置master的数量为3，这样，挂掉一台，其他两台都认为主节点挂掉了，才进行主节点选举。

3. 角色分离：即master节点与data节点分离