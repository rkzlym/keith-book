# redis哨兵模式

## 1. 哨兵简介

### 1.1 定义
哨兵（sentinel）是一个分布式系统，用于对主从结构中的每台服务器进行监控，当出现故障时通过投票机制选择新的master并将所有slave连接到新的master。
### 1.2 作用
1. 监控
不断的检查master和slave是否正常运行
master存活检测、master与slave运行情况检测
2. 通知
当被监控的服务器出现故障时，向其他客户端发送通知
3. 自动故障转移
断开master和slave连接，选取一个slave作master，将其他slave连接到新master，并告知客户端新的服务器地址

### 1.3 说明
- 哨兵也是一台redis服务器，只是不提供数据服务
- 通常哨兵的配置数量为单数

## 2. 配置文件
### 2.1 解释
2个哨兵认为这个master挂了就挂了

```java
sentinel monitor mymaster 127.0.0.1 6379 2
```
30秒未响应判断死亡
```java
sentinel down-after-milliseconds mymaster 30000
```
### 2.2 启动哨兵
1. 启动哨兵服务器
```java
redis-sentinel sentinel.conf
```
2. 启动哨兵客户端
```java
redis-cli -p 26379
```