# ES 基础

## 数据库查询的问题

假设有下列查询，由于是模糊匹配，如%在前面，索引不生效。

原因：数据库索引本质就是排序，当%在后面时，可以通过排序快速地缩小搜索范围，而当%在前面时，数据库就并能使用排序

```sql
select * from product where brand like '%小米手机%'
```

而且数据库不支持分词，无法通过分词给用户想要的结果

## 倒排索引

数据结构

1. 包含这个关键词的 Document list
2. 关键词在每个 Doc 中出现的次数 TF ( Term Frequency )：TF 越高相关度越高
3. 关键词在整个索引中出现的次数 IDF ( Inverse Doc Frequency )：IDF 越高相关度越低
4. 关键词在当前 Doc 中出现的次数
5. 每个 Doc 的长度，越长相关度越低
6. 包含这个字段的关键词的所有 Doc 的平均长度

## Lucene

做了两件事：创建索引、提供API

问题：

1. 节点一旦宕机，数据丢失，可用性差
2. 自己维护，麻烦（自己创建 管理索引），需要人工做负载

所以需要ES来解决这些问题

## ElasticSearch

分布式、高性能、高可用、可伸缩、易维护

1. 分布式搜索、存储和数据分析引擎
2. 优点：
   1. 面向开发者友好，屏蔽了Lucene，集群自动发现
   2. 自动维护数据在多个节点的建立
   3. 会帮我做搜索引擎的负载均衡
   4. 自动维护冗余副本，保证了部分宕机的情况下不会有任何数据丢失
   5. ES基于Lucene提供很多高级功能：符合查询、聚合分析、基于地理位置
   6. 对于大公司，可以构建几百台服务器的大型分布式集群，处理PB级数据
   7. 相对于传统数据库，提供了全文检索，同义词处理，相关度排名，聚合分析以及海量数据的近实时（NTR）
3. 应用领域
   1. 百度（全文检索、高亮、搜索推荐）
   2. 各大网站的用户行为日志
   3. BI（Business Intelligence）商业智能：数据分析，数据挖掘统计
   4. github
   5. ELK：Elasticsearch(数据存储) Logstash(日志采集) Kibana(可视化)
4. ES核心概念
   1. Cluster：每个集群至少包含两个节点
   2. Node：集群中的每个节点，一个节点不代表一台服务器
   3. Field：一个数据字段，与index和type一起，可以定位一个doc，我们可以手动指定doc的id
   4. Document：ES最小的数据单元
   5. Type：逻辑上的数据分类
   6. Index：一类相同或者类似的doc，如员工索引、商品索引
5. 分片
   1. 一个index包含多个Shard，默认5P，默认每个P分配一个R，P的数量在创建索引的时候设置，如果想修改，需要重建索引
   2. 每一个Shard都是一个Lucene实例，有完整的创建索引的处理请求能力
   3. ES会自动在nodes上为我们做shard均衡
   4. 一个doc是不可能存在于多个PShard中的，可以存在在多个RShard中
   5. P和R不能同时存在同一个节点，所以最低的可用的配置是两台节点，互为主备
   6. 如果某一台机器宕机，可以保证其他节点的数据完整性
   7. 横向扩展可存储数据得到提升，副本可以提升QPS，

## 拓展

**Cpu 内存 磁盘速度对比**

1. 单核 100G

2. 内存： 20G-50G

3. 磁盘：机械 500M ，固态 2G

