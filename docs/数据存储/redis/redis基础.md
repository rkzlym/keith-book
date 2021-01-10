# redis基础

## redis管道

可以将多个操作合并成一次请求，降低通信的成本

```powershell
# 开启socket连接使用redis
nc localhost 6379
set k1 v1
# 批量操作redis
echo -e "set k2 2\n incr k2\n get k2" | nc localhost 6379
```

## 消息订阅

在redis中的A端开启消息的发布`publish`

在redis中的B端使用`subscribe`可实时监听消息

**服务端**

```powershell
127.0.0.1:6379> publish my hello
(integer) 0
127.0.0.1:6379> publish my world
(integer) 1
```

**消费端**

```powershell
127.0.0.1:6379> subscribe my
Reading messages... (press Ctrl-C to quit)
1) "subscribe"
2) "my"
3) (integer) 1
1) "message"
2) "my"
3) "world"
```

**使用场景：实时聊天**

客户端A发布消息到redis

1. 客户端B订阅消息，收消息

2. redis zset服务订阅消息，维护近期的热点消息，时间作为分值，消息作为元素，剔除早期的数据

3. 数据库服务订阅消息，维护全量消息数据

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210110094824260.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## redisBloom（布隆过滤器）

布隆过滤器：解决缓存穿透

1. 将可以查询到的数据向布隆过滤器里添加

2. 如果一个请求查询一个不存在的数据，布隆过滤器大概率会打回

3. 数据库增加了元素，也需要向布隆过滤器里增加

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210110163932551.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

布隆过滤器的3种实现

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210110164709746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

安装布隆过滤器

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210110164739616.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)