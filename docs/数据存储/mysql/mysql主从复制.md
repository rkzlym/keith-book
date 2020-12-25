# mysql主从复制

## 1. 复制原理
1. master将改变记录到二进制日志(binary log)，这个记录过程叫二进制日志事件(binary log events)。
2. slave将master的binary log events拷贝到它的中继日志(relay log)。
3. slave重做中继日志中的事件，将改变应用到自己的数据库中，Mysql复制是异步且串行化的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203173115696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## 2. 配置(基于mysql 8.x)
### 2.1 master配置文件修改
```
[mysqld]
# 设置主机Id
server-id=1
# 启用二进制日志
log-bin=E:\\Software\\mysql-8.0.19\\data\\logbin
```
### 2.2 slave配置文件修改
```
[mysqld]
# 设置从机Id
server-id=2
# 启用二进制日志
log-bin=/var/run/mysqld/logbin
```
### 2.3 具体操作
>主机IP：192.168.1.104
>从机IP：192.168.25.103

1. 主节点创建用户并授权
```sql
create user 'repl'@'192.168.1.104' identified with mysql_native_password by '123456';
grant replication slave on *.* to 'repl'@'192.168.1.104';
```
2. 查询主节点状态
```sql
-- 刷新
flush privileges;
-- 查询主节点状态
show master status;
```
参数解释：
- File：二进制日志文件
- Position：开始抄数据的位置
- Binlog_Do_DB：需要复制的数据库，空表示都要复制
- Binlog_Ignore_DB：忽略的数据库，空表示没有
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200201111401768.png)
3. 在从节点上设置主节点参数
```sql
change master to master_host = '192.168.1.104',
master_user = 'repl',
master_password = '123456',
master_log_file = 'binlog.000017', master_log_pos = 5934;
```
4. 开启主从同步
```sql
start slave;
```
5. 查看主从同步状态
```sql
show slave status;
```
6. 测试
```sql
create database dbtest;
use dbtest;
drop table if exists dog;
create table dog(
	id int primary key not null auto_increment,
    dog_name varchar(20)
);
insert into dog (dog_name) values ('旺财');
insert into dog (dog_name) values ('大白');
insert into dog (dog_name) values ('汪汪');
```
主机从机同步，测试成功。
## 3. 番外之常用命令
```sql
# 获取binlog文件列表
show binary logs;

# 查看指定binlog文件的内容
show binlog events in 'binlog.000017';

# 停止同步
stop slave;

# 查询用户
select * from mysql.user;

# 删除用户
DELETE FROM `mysql`.`user` WHERE (`Host` = '192.168.25.103') and (`User` = 'rep1');

# 修改用户密码
alter user 'repl'@'192.168.1.104' identified with mysql_native_password by '654321';

# 授予用户权限
grant replication slave on *.* to 'repl'@'192.168.1.104';
```