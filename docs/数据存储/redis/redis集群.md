# reids集群

## 1. 集群之间的通信
各个数据库相互通信，保存各个库中槽的编号数据
一次命中，直接返回
一次未命中，告知具体位置
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203150519604.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
## 2. 集群配置
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