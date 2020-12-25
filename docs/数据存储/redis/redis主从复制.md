# redis主从复制

## 1. redis主从架构示意图
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203094442305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
## 2. 主从复制简介
简介：主从复制即将master中的数据及时有效地复制到slave中。
特征：一个master可以有多个slave，一个slave只对应一个master。
职责：
- master：写数据，同步数据到salve
- slave：读数据

## 3. 主从工作流程
### 3.1 建立连接
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203131319126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
### 3.2 同步数据
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203131306330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
## 4. 主从复制配置
### 4.1 操作方式

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
### 4.2 操作实例：进入命令行开启主从

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
### 4.3 操作实例：修改配置文件指定master
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

### 4.4 相关命令
```java
# 查看所有信息
info

# 查看主从信息
info replication 

# 断开连接
slaveof no one
```
## 5. 注意事项
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