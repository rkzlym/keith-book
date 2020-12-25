# mysql事务

## 1. 开启事务提交（Mysql）
```sql
# 查看自动提交
SHOW VARIABLES LIKE '%autocommit%'

# 关闭自动提交，只针对当前的会话有效
SET autocommit = 0

START TRANSACTION # 开启事务（可选）
INSERT tb_user VALUES ('张三', 22);
INSERT tb_user VALUES ('李四', 23);
COMMIT # 提交事务
# ROLLBACK # 回滚事务
```
## 2. 事务并发性问题
对于同时运行多个事务，这些事务访问**数据库中相同的数据**时，没有没有采取必要的隔离机制，就会导致各种并发问题：
- 脏读：事务A读到了事务B已修改但尚未提交的数据，此时事务B回滚，A读取数据无效，不符合一致性。
- 不可重复读：事务A读到了事务B已提交的修改数据，不符合隔离性。
- 幻读：事务A读到了事务B提交的新增数据，不符合隔离性。

## 3. Mysql提供的4种隔离级别
| 隔离级别                         | 描述                                 |
| -------------------------------- | ------------------------------------ |
| 读未提交 READ UNCOMMITTED        | 存在脏读，不可重复读，幻读问题       |
| 读已提交 READ COMMITTED          | 可避免脏读，存在不可重复度，幻读问题 |
| 可重复读 REPEATABLE READ（默认） | 可避免脏读，不可重复读，存在幻读问题 |
| 可序列化 SERIALIZABLE            | 所有问题可避免，但性能低下           |

查看数据库隔离级别
```sql
show variables like '%isolation%';
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200201091723142.png)