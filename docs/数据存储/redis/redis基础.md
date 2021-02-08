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

1. 将可查询到的数据通过映射函数向布隆过滤器里标记
2. 如果用户请求的数据你有，就会放行到DB，如果你没有，也有小概率被放行
3. 可能会误标记：商品3 映射到了商品1和商品2标记的位置
4. 但是一定概率会大量减少穿透，而且成本低
5. 数据库增加了元素，也需要向布隆过滤器里增加

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210110163932551.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

布隆过滤器的3种实现

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210110164709746.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

安装布隆过滤器

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210110164739616.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## redis encoding

**判断这个key中value的编码**

```shell
object encoding key
```

二进制安全：redis只取字节流

如果进行了 incr 操作，那么 redis 会将 value 取出转换成数值类型再进行 incr

**编码集格式化**

```shell
redis-cli --raw
```

## bitmap

1字节 = 8位 即 1字节 = 0000 0000

将k1偏移量为1的位置上设置为1，即 0100 0000

```shell
setbit k1 1 1
strlen k1 # 长度是1
```

将k1偏移量为9的位置上设置为1，即 0000 0000 0100 0000

```shell
setbit k2 9 1
strlen k2 # 长度是2
```

**bitpos**

```shell
bitpos key bit start end
```

从第一个字节中找出1的第一次出现位置

```shell
bitpos k1 1 0 0
(integer) 1
```

从第二个字节中找出1的第一次出现位置

```shell
bitpos k2 1 1 1
(integer) 9
```

**bitcount**

```shell
BITCOUNT key [start] [end]
```

`start` 和 `end` 都可以使用负数值：比如 `-1` 表示最后一个位，而 `-2` 表示倒数第二个位，以此类推。

返回前两个字节中1的个数

```shell
bitcount k1 0 1
```

**bitop**

```shell
# 按位与 有0则0
bitop and ka k1 k2
# 按位或 有1则1
bitop or ko k1 k2
```

**应用场景**

1. 有用户系统，统计用户登录天数，且窗口随机

```shell
setbit sean 1 1		# 第1天登录
setbit sean 7 1		# 第7天登录
setbit sean 364 1	# 第364天登录
# 查看长度，即46个字节即可保存一个用户一年的登录天数
strlen sean
(integer) 46
# 反向索引找到最后一次的登录时间
bitcount sean -2 -1
```

2. 统计某几天的活跃用户数

```shell
# 2020-6-18 号用户数1个
setbit 20200618 1 1
# 2020-6-18 号用户数2个
setbit 20200619	1 1
setbit 20200619	7 1
# 按位或运算
bitop or destkey 20190618 20190619
# 统计人数
bitcount destkey 0 -1
```

位图可以这样表示：user1登录了一天，user2登录了两天，user3没登录

| key      | user1 | user2 | user3 |
| -------- | ----- | ----- | ----- |
| 20200618 | 0     | 1     | 0     |
| 20200619 | 1     | 1     | 0     |

