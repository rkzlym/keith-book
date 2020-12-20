

# Redis

## redis基础

### 5种数据类型

String、List、Hash、Set、ZSet (sorted set)

### 常用命令

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203083421315.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### redis配置文件

> redis.conf

查看redis最大占用内存，如不设置在64位操作系统不限制大小，32位操作系统最多使用3GB

推荐redis内存设置为最大物理内存的3/4

方式1：修改redis.conf

```powershell
maxmemory <bytes>
```

方式2：在redis-cli执行命令

```powershell
config set maxmemory <bytes>
```

## redis主从复制

### 1. redis主从架构示意图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203094442305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
### 2. 主从复制简介
简介：主从复制即将master中的数据及时有效地复制到slave中。
特征：一个master可以有多个slave，一个slave只对应一个master。
职责：
- master：写数据，同步数据到salve
- slave：读数据

### 3. 主从工作流程
#### 3.1 建立连接
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203131319126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
#### 3.2 同步数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203131306330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
### 4. 主从复制配置
#### 4.1 操作方式

方式1：客户端发送命令
```java
slaveof <master-ip> <master-port>
```
方式2：启动服务器参数
```java
redis-server -slaveof <master-ip> <master-port>
```
方式3：服务器配置
```java
slaveof <master-ip> <master-port>
```
#### 4.2 操作实例：进入命令行开启主从

> master：192.168.25.103:6379
> slave：192.168.25.104:6379

salve
```java
127.0.0.1:6379> slaveof 192.168.25.103 6379
OK
```
master：设置name
```java
127.0.0.1:6379> set name test
OK
```
slave：读取name
```java
127.0.0.1:6379> get name
"test"
```
#### 4.3 操作实例：修改配置文件指定master
在salve配置文件末尾加入`salveof master的Ip和端口`
```java
salveof 192.168.25.103 6379
```
这时slave一启动就直接变成了从机，不再测试
```java
1:S 03 Feb 2020 04:53:13.558 * MASTER <-> REPLICA sync: receiving 196 bytes from master
1:S 03 Feb 2020 04:53:13.559 * MASTER <-> REPLICA sync: Flushing old data
1:S 03 Feb 2020 04:53:13.559 * MASTER <-> REPLICA sync: Loading DB in memory
1:S 03 Feb 2020 04:53:13.559 * MASTER <-> REPLICA sync: Finished with success
```

#### 4.4 相关命令
```java
# 查看所有信息
info

# 查看主从信息
info replication 

# 断开连接
slaveof no one
```
### 5. 注意事项
1. 复制缓冲区大小设置不合理会导致数据溢出使主从数据不一致，主从数据不一致会导致全量复制，所以必须将复制缓冲区设置一个合理的大小。
```java
# 复制缓冲区默认为1mb
repl-blocking-size 1mb
```
2. master单机内存占用建议使用50%-70%，留下30%-50%用于执行bgsave命令和创建缓冲区。
3. slave最好只对外开放读功能，不开放写功能
```java
slave-serve-stale-data yes|no
```

## redis事务

### 简介

redis事务不保证原子性，redis同一个事务中如果有一条命令执行失败，其它命令仍然会被执行，不会回滚。
常用命令
| 命令 | 序号         | 描述                                                         |
| ---- | ------------ | ------------------------------------------------------------ |
| 1    | DISCARD      | 取消事务，放弃执行事务块内的所有命令                         |
| 2    | EXEC         | 执行事务块内的命令                                           |
| 3    | MULTI        | 标记一个事务的开始                                           |
| 4    | WATCH key... | 监视一个或多个key，如果事务执行前这些key被其它命令改动，那么事务将被打断 |
| 5    | UNWATCH      | 取消对所有Key的监视                                          |
### 命令演示
初始化数据，并使用watch监视name
```
127.0.0.1:6379> set name a
OK
```
客户端A开watch监视name
```
127.0.0.1:6379> watch name
OK
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set name aa
QUEUED
```
此时客户端B抢先提交了
```
127.0.0.1:6379> multi
OK
127.0.0.1:6379> set name bb
QUEUED
127.0.0.1:6379> exec
1) OK
```
那么客户端A提交会失败
```
127.0.0.1:6379> exec
(nil)
```

### 代码演示

```java
while(true){
    stringRedisTemplate.watch(REDIS_LOCK);
    if (uuid.equals(stringRedisTemplate.opsForValue().get(REDIS_LOCK))){
        stringRedisTemplate.setEnableTransactionSupport(true);
        stringRedisTemplate.multi();
        stringRedisTemplate.delete(REDIS_LOCK);
        List<Object> exec = stringRedisTemplate.exec();
        if (CollectionUtils.isEmpty(exec)) continue;
    }
    stringRedisTemplate.unwatch();
    break;
}
```

## reids集群

### 1. 集群之间的通信
各个数据库相互通信，保存各个库中槽的编号数据
一次命中，直接返回
一次未命中，告知具体位置
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203150519604.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
### 2. 集群配置
1. 修改redis.conf
```java
# 开启集群
cluster-enabled yes
# 设置集群配置文件，每个服务器要不一样
cluster-config-file node-6379.conf
# 设置下线时间
cluster-node-timeoout 10000
```
2. 依次启动集群服务
```java
redis-server redis-6379.conf
```
3. 将redis服务连接起来
需要执行src目录下的redis-trib.rb，且需要ruby环境
下列命名表示1个master有1个slave，且一共有6个服务器
```java
./redis-trib.rb create --replicas 1 \
127.0.0.1:6379 127.0.0.1:6380 127.0.0.1:6381 \
127.0.0.1:6382 127.0.0.1:6383 127.0.0.1:6384
```
### 3. 集群开启
进入客户端，需要加`-c`参数
```java
redis-cli -c
```

## redis哨兵模式

### 1. 哨兵简介

#### 1.1 定义
哨兵（sentinel）是一个分布式系统，用于对主从结构中的每台服务器进行监控，当出现故障时通过投票机制选择新的master并将所有slave连接到新的master。
#### 1.2 作用
1. 监控
不断的检查master和slave是否正常运行
master存活检测、master与slave运行情况检测
2. 通知
当被监控的服务器出现故障时，向其他客户端发送通知
3. 自动故障转移
断开master和slave连接，选取一个slave作master，将其他slave连接到新master，并告知客户端新的服务器地址

#### 1.3 说明
- 哨兵也是一台redis服务器，只是不提供数据服务
- 通常哨兵的配置数量为单数

### 2. 配置文件
#### 2.1 解释
2个哨兵认为这个master挂了就挂了

```java
sentinel monitor mymaster 127.0.0.1 6379 2
```
30秒未响应判断死亡
```java
sentinel down-after-milliseconds mymaster 30000
```
#### 2.2 启动哨兵
1. 启动哨兵服务器
```java
redis-sentinel sentinel.conf
```
2. 启动哨兵客户端
```java
redis-cli -p 26379
```

## redis分布式锁

### 1. 实现方式

redis与zookeeper的区别：redis是ap不保证一致性，zk是cp不保证高可用

redis分布式锁流程：抢锁 - 执行业务 - 删锁

使用redis作分布式锁需要注意的问题：

1. 锁需要设置过期时间，以便异常情况下未能成功删锁
2. 对于加锁和解锁需要保证操作的原子性
3. 删锁时使用uuid作为value判断value是否一致，防止删除别人的锁

```
@GetMapping("buy")
public String buyGoods() throws Exception {
    String uuid = UUID.randomUUID().toString();
    Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(REDIS_LOCK, uuid, 10L, TimeUnit.SECONDS);
    if (flag == null || !flag) return "抢锁失败";
    try {
        // 执行业务逻辑
        return doBuyGoods();
    } finally {
        Jedis jedis = RedisUtils.getJedis();
        String script = "if redis.call(\"get\",KEYS[1]) == ARGV[1]\n" +
                "then\n" +
                "    return redis.call(\"del\",KEYS[1])\n" +
                "else\n" +
                "    return 0\n" +
                "end";
        try {
            Object o = jedis.eval(script, Collections.singletonList(REDIS_LOCK), Collections.singletonList(uuid));
            if ("1".equals(o.toString())){
                System.out.println("delete redis lock ok");
            } else {
                System.out.println("delete redis lock error");
            }
        } finally {
            if (jedis != null){
                jedis.close();
            }
        }
    }
}
```

### 2. redisson

```xml
<dependency>
    <groupId>org.redisson</groupId>
    <artifactId>redisson</artifactId>
    <version>3.14.0</version>
</dependency>
```

```java
@Configuration
public class RedisConfig {
    @Bean
    public Redisson redisson(){
        Config config = new Config();
        config.useSingleServer().setAddress("redis//127.0.0.1:6379").setDatabase(0);
        return (Redisson) Redisson.create(config);
    }
}
```

```java
@Resource
private Redisson redisson;

@GetMapping("buy")
public String buyGoods() {
    String uuid = UUID.randomUUID().toString();
    RLock lock = redisson.getLock(REDIS_LOCK);
    lock.lock();
    Boolean flag = stringRedisTemplate.opsForValue().setIfAbsent(REDIS_LOCK, uuid, 10L, TimeUnit.SECONDS);
    if (flag == null || !flag) return "抢锁失败";
    try {
        // 执行业务逻辑
        return doBuyGoods();
    } finally {
        if (lock.isLocked() && lock.isHeldByCurrentThread())
            lock.unlock();
    }
}
```

## redis常见缓存问题

**缓存与数据库双写不一致**

现象1：先修改数据库，再删除缓存，如果缓存删除失败，缓存中是旧数据，就会出现数据不一致。

解决1：先删除缓存，再修改数据库，如果修改数据库失败了，数据库是旧数据，缓存为空，数据一致。

现象2：在更新一个库存的时候，同时在读取这个库存，此时数据库修改还未完成，旧的数据就会落到缓存中。

解决2：将数据库与缓存的更新和读取进行异步串行化。

**缓存雪崩**

现象：key集中过期导致短时间内大量请求落到数据库。

解决方案：过期时间使用固定时间+随机值模式，稀释集中到期的key的数量

**缓存穿透**

现象：查询一个一定不存在的数据，缓存不会命中

解决：空结果进行缓存，但它的过期时间会很短，最长不超过五分钟。

**缓存击穿**

现象：超高热点的key过期导致短时间内大量请求落到数据库。

解决：分布式锁

**缓存内存超出设置的最大值会发生什么**

OOM command not allowed when used memory

## redis的过期策略，内存淘汰机制

**定期删除**：redis每隔100ms就随机抽取一些设置了过期时间的key，检查是否过期，如果过期就删除。

**惰性删除**：在获取某个key的时候，redis会检查一下，这个key如果过期了就会被删除。

**内存淘汰机制**

当redis内存占用过高的时候，此时会进行淘汰，有如下策略

1. noeviction：当内存不足以容纳新写入数据时，新写入被报错
2. allkeys-lru（常用）：当内存不足以容纳新写入数据时，移除最近最久未使用的key
3. allkeys-random：当内存不足以容纳新写入数据时，随机移除某个key
4. volatile-lru：当内存不足以容纳新写入数据时，在设置过期时间的key中，移除最近最最久未使用的key
5. volatile-random：当内存不足以容纳新写入数据时，在设置过期时间的key中，随机移除某个key
6. volatile-ttl：当内存不足以容纳新写入数据时，在设置过期时间的key中，有更早过期时间的key优先移除
7. allkeys-lfu：当内存不足以容纳新写入数据时，移除最近最少使用的key
8. volatile-lfu：当内存不足以容纳新写入数据时，在设置过期时间的key中，移除最近最少使用的key

内存淘汰机制的配置

```powershell
maxmemory-policy noeviction
```

LRU

核心算法：LinkedHashMap

```java
public class LruCacheDemo<K, V> extends LinkedHashMap<K, V> {

    private int capacity;   // 缓存容量

    public LruCacheDemo(int capacity){
        super(capacity, 0.75F, true);
        this.capacity = capacity;
    }

    @Override
    protected boolean removeEldestEntry(Map.Entry<K, V> eldest) {
        return super.size() > capacity;
    }

    public static void main(String[] args) {
        LruCacheDemo<Integer, String> lru = new LruCacheDemo<>(3);
        lru.put(1, "a");
        lru.put(2, "b");
        lru.put(3, "c");
        lru.get(1);
        lru.put(4, "d");
        System.out.println(lru.keySet());
    }
}
```

使用 哈希 + 双向链表 实现

```java
public class LruDemo {

    // 构造一个Node节点作为数据载体
    static class Node<K, V>{
        K key;
        V value;
        Node<K, V> prev;
        Node<K, V> next;

        public Node(){
            this.prev = this.next = null;
        }

        public Node(K key, V value){
            this.key = key;
            this.value = value;
            this.prev = this.next = null;
        }
    }

    // 构建一个虚拟的双向链表，存放Node
    static class DoubleLinkedList<K, V>{
        Node<K, V> head;
        Node<K, V> tail;

        public DoubleLinkedList(){
            head = new Node<>();
            tail = new Node<>();
            head.next = tail;
            tail.prev = head;
        }

        public void addHead(Node<K, V> node){
            node.next = head.next;
            node.prev = head;
            head.next.prev = node;
            head.next = node;
        }

        public void removeNode(Node<K, V> node){
            node.next.prev = node.prev;
            node.prev.next = node.next;
            node.prev = null;
            node.next = null;
        }

        public Node<K, V> getLast(){
            return tail.prev;
        }
    }

    private int cacheSize;

    Map<Integer, Node<Integer, Integer>> map;

    DoubleLinkedList<Integer, Integer> doubleLinkedList;

    public LruDemo(int cacheSize){
        this.cacheSize = cacheSize;
        map = new HashMap<>();
        doubleLinkedList = new DoubleLinkedList<>();
    }

    public int get(int key){
        if (map.containsKey(key)){
            return -1;
        }
        Node<Integer, Integer> node = map.get(key);
        doubleLinkedList.removeNode(node);
        doubleLinkedList.addHead(node);
        return node.value;
    }

    public void put(int key, int value){
        // 更新
        if (map.containsKey(key)){
            Node<Integer, Integer> node = map.get(key);
            node.value = value;
            map.put(key, node);
            doubleLinkedList.removeNode(node);
            doubleLinkedList.addHead(node);
        } else {
            // 满了 删除链表最后的Node
            if (map.size() == cacheSize){
                Node<Integer, Integer> lastNode = doubleLinkedList.getLast();
                map.remove(lastNode.key);
                doubleLinkedList.removeNode(lastNode);
            }
        }
        // 新增
        Node<Integer, Integer> node = new Node<>(key, value);
        map.put(key, node);
        doubleLinkedList.addHead(node);
    }

    public static void main(String[] args) {
        LruDemo lru = new LruDemo(3);
        lru.put(1, 1);
        lru.put(2, 2);
        lru.put(3, 3);
        lru.get(1);
        lru.put(4, 4);
        System.out.println(lru.map.keySet());
    }
}
```

## redis单线程性能为什么高

**redis线程模型**：NIO异步单线程

**为什么redis单线程还能支撑高并发**

1. IO多路复用程序只负责监听所有的socket产生的请求，有人发过来请求就直接放入队列中。
2. 事件处理器是基于纯内存操作的。
3. 单线程反而避免了多线程频繁切换上下文问题。

**客户端与redis的通信的一次流程**

1. 在redis初始化的时候，redis会将连接应答处理器跟AE_READABLE事件关联起来，接着如果一个客户端与redis发起连接，此时会产生一个AE_READABLE事件，然后由<font color=blue>连接应答处理器</font>来处理与客户端的连接，创建客户端对应的socket，同时将这个socket的AE_READABLE事件跟<font color=blue>命令请求处理器</font>关联起来。
2. 当客户端想redis发起请求的时候，首先会在socket产生一个AE_READABLE事件，然后由<font color=blue>命令请求处理器</font>来处理，这个命令请求处理器就会从socket中读取请求相关数据，然后进行执行和处理。
3. 接着redis这边准备好了给客户端的相应数据之后，就会将socket的AE_WRITEABLE事件跟<font color=blue>命令回复处理器</font>关联起来，当客户端这边准备好读取相应数据时，就会在socket上产生一个AE_WRITEABLE事件，会由<font color=blue>命令回复处理器</font>来处理，就是准备好写入socket，供客户端来读取。
4. <font color=blue>命令回复处理器</font>写完之后，就会删除这个socket的AE_WRITEABLE事件和<font color=blue>命令回复处理器</font>的关联关系。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020121916394029.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

