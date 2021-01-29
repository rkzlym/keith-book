# Zookeeper

## 基本概念

zookeeper是一个目录结构，node可以存放数据（1M），节点分为持久节点、临时节点（session）、序列节点。

zookeeper提供了一系列的保证

顺序性

原子性：创建节点要么是集群内都成功，要么都失败。最终一致性，过半通过。

单系统映像：无论客户端连接到哪个服务器，都将看到相同的服务视图、

可靠性/持久性：一旦应用更新，它将从那时起持续到客户端覆盖更新，持久化，写日志。

实时性：系统的客户视图保证特定的时间范围内是最新的，最终一致性

**三种角色**

Leader：负责处理集群的写请求，并发起投票，只有超过半数的节点同意后才会提交该请求。

Follower：处理读请求，相应结果，转发写请求给leader，在选举leader时参与投票。

Observer：没有投票权的follower，协助follower处理读请求。

**应用场景**：配置中心、负载均衡、命名服务、DNS服务、集群管理

**zookeeper缺陷**：master宕机后剩余节点会重新进行leader选举，但选举时间太长，且选举期间整个集群都是不可用的，这就导致了在选举期间注册服务瘫痪。

## Linux 安装 Zookeeper

下载 解压 改名

```shell
wget https://mirror.bit.edu.cn/apache/zookeeper/stable/apache-zookeeper-3.5.9-bin.tar.gz
tar xf apache-zookeeper-3.5.9-bin.tar.gz
mv apache-zookeeper-3.5.9-bin/ zookeeper
```

配置环境变量

```shell
vim /etc/profile

export ZOOKEEPER=/root/server/zookeeper
export PATH=$PATH:$ZOOKEEPER/bin

source /etc/profile
```

启动，查看状态，连接客户端

```shell
zkServer.sh start
zkServer.sh status
zkCli.sh
```

## Zookeeper 基本命令

```shell
# 查看节点
ls /
# 创建节点/test,值为value
create /test "value"
# 获取数据
get /test
# 设置数据
set /test "value2"

----
# 概念解释
cZxid = 0x200000002	# 创建的事务ID
mZxid = 0x200000003	# 修改的事务ID
pZxid = 0x200000004 # 子节点创建/删除的事务ID
```



## 配置文件

复制 zoo_sample.cfg 到 zoo.cfg

```shell
cp zoo_sample.cfg zoo.cfg
```

参数解释

```shell
# 心跳时间（毫秒）
tickTime=2000
# follower连接leader时，初始化有10次心跳机会连接leader，结合tickTime即20s
initLimit=10
# follower同步leader时，同步心跳有5次机会，结合tikeTime即10s
syncLimit=5
# 持久化目录
dataDir=/tmp/zookeeper
# zookeeper的端口
clientPort=2181
# 允许最大的客户端连接数
maxClientCnxns=60
```

## 选举机制

目前有5台服务器，每台服务器均没有数据，它们的编号分别是1,2,3,4,5,按编号依次启动，它们的选择举过程如下：

- 服务器1启动，给自己投票，然后发投票信息，由于其它机器还没有启动所以它收不到反馈信息，服务器1的状态一直属于Looking(选举状态)。
- 服务器2启动，给自己投票，同时与之前启动的服务器1交换结果，由于服务器2的编号大所以服务器2胜出，但此时投票数没有大于半数，所以两个服务器的状态依然是LOOKING。
- 服务器3启动，给自己投票，同时与之前启动的服务器1,2交换信息，由于服务器3的编号最大所以服务器3胜出，此时投票数正好大于半数，所以服务器3成为领导者，服务器1,2成为小弟。
- 服务器4启动，给自己投票，同时与之前启动的服务器1,2,3交换信息，尽管服务器4的编号大，但之前服务器3已经胜出，所以服务器4只能成为小弟。
- 服务器5启动，后面的逻辑同服务器4成为小弟。