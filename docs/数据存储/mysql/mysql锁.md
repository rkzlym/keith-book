# mysql锁

> Mysql有三种锁：表锁(偏读)、行锁(偏写)、页锁
## 1. 查看锁命令
### 1.1 查看锁

```sql
show open tables;
```
In_use为0表示没有被锁
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200201080542825.png)
### 1.2 分析表锁定
```sql
show status like '%table%'
```
- Table_locks_immediate：产生表级锁定的次数（锁的查询次数）。
- Table_locks_waited：出现表级锁定争用而发生等待的次数，此值高说明存在严重表级锁争用情况。
## 2. 表锁
### 2.1 读锁（共享锁）
Session 1 为Table增加<font color=red>读锁</font>之后：
- Session 1 只能读锁定表，不能读其他表，写锁定表<font color=red>报错</font>。
- Session 2 可以读任何表，写锁定表<font color=red>阻塞</font>。
### 2.2 写锁（独占锁）
Session 1 为Table增加<font color=red>写锁</font>之后：
- Session 1 可以做锁定表进行任何操作
- Session 2 无法对锁定表进行任何操作
### 2.3 相关命令
**加读锁**
```sql
lock table 表名1 read, 表名2 read;
```
**加写锁**
```sql
lock table 表名1 read, 表名2 read;
```
**解锁**
```sql
unlock tables;
```
## 3. 行锁
### 3.1 开启事务即开启了行锁
提交事务之前，其它会话查询到的都是未提交的数据，如果更新了同一行，会被阻塞，直到这个事务被提交。
```sql
set autocommit = 0;
update dept set dname = '开发部2' where deptno = 1; 
commit;
```
### 3.2 手动上锁
当查询deptno=1的数据的时候，加`for update`语句，此时其它会话修改这条记录就会被阻塞。
```sql
select * from dept where deptno = 1 for update;
```