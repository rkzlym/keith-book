# Mysql

## Mysql建库建表：DDL

### DDL（数据定义语言）
库和表的管理
创建：create
修改：alter
删除：drop
### 库的管理
```sql
# 若库不存在创建一个名为demo的库
CREATE DATABASE IF NOT EXISTS demo

# 更改库的字符集为utf-8
ALTER DATABASE demo CHARACTER SET utf-8

# 库的删除
DROP DATABASE IF EXISTS demo
```
### 表的管理

```sql
# 案例：创建表book
CREATE TABLE IF NOT EXISTS book(
	id INT,
	bname VARCHAR(50),
	price DOUBLE,
	author VARCHAR(50),
	publicDate DATETIME,
)

/**
表的修改
ALTER TABLE 表名 ADD|DROP|MODIFY|CHANGE COLUMN 列名 [列类型 约束]
*/
# 修改列名
ALTER TABLE item CHANGE COLUMN publishDate pubDate DATETIME

# 修改列的类型或约束
ALTER TABLE item MODIFY COLUMN pubDate TIMESTAMP

# 添加新列
ALTER TABLE item ADD COLUMN annual DOUBLE;

# 删除列
ALTER TABLE item DROP COLUMN annual;

# 修改表名
ALTER TABLE item RENAME TO items

# 表的删除
DROP TABLE IF EXISTS item

# 查看当前库的所有表
SHOW TABLES

# 查看表的信息
DESC book

# 表的复制 仅仅复制表的结构
CREATE TABLE copy LIKE author

# 表的复制 复制表的结构+数据
CREATE TABLE copy2 SELECT * FROM author

# 表的复制 仅仅复制某些字段
CREATE TABLE copy3 SELECT id, aname FROM author WHERE 0
```

## Mysql约束

### 六大约束
| 约束        | 说明                 |
| ----------- | -------------------- |
| NOT NULL    | 非空                 |
| DEFAULT     | 非有默认值           |
| PRIMARY KEY | 主键，唯一非空       |
| UNIQUE      | 唯一可空             |
| CHECK       | 检查（ Mysql中无效） |
| FOREIGN KEY | 外键，限制两表关系   |
约束添加的分类
1. 列级约束：除了外键约束，其它都支持
2. 表级约束：除了非空、默认，其它都支持

### 创建表时添加约束

```sql
CREATE TABLE tb_stu(
	id INT PRIMARY KEY,
	stuName VARCHAR(20) NOT NULL,
	gender CHAR(1) CHECK(gender='男' OR gender='女'),
	seat INT UNIQUE,
	age INT DEFAULT 18,
	marjorId INT,

	CONSTRAINT fk_stu_major FOREIGN KEY(majorId) REFERENCES major(id) # 创建外键
)

CREATE TABLE tb_major(
	id INT PRIMARY KEY,
	majorName VARCHAR(50)
)

# 查看表中的索引
SHOW INDEX FROM tb_stu
```

## Mysql索引

### 1. 概念
索引是帮助Mysql高效获取数据的<font color=red>排好序</font>的数据结构。
索引会影响到where后面的查找和order by后面的排序。
### 2. 索引分类
1.单值索引：一个索引只包含	单个列，一个表可以有多个单值索引。
2.唯一索引：索引列的值必须唯一，但允许有空值。
3.复合索引：即一个索引包含多个列。
### 3. 索引类型和语法
#### 3.1 索引类型
| 类型        | 描述                                     |
| ----------- | ---------------------------------------- |
| PRIMARY KEY | 主键，索引值必须唯一，且不能为NULL       |
| UNIQUE      | 索引值必须唯一，可以为NULL，并可出现多次 |
| INDEX       | 普通索引，索引值可能出现多次             |
| FULLTEXT    | 全文索引                                 |
#### 3.2 基本语法
1.创建索引
```sql
CREATE INDEX idx_name ON tb_name(column_name);
ALTER TABLE tb_name ADD INDEX idx_name(column_name);
```
2.删除索引
```sql
DROP INDEX idx_name ON tb_name;
```
3.查看索引
```sql
SHOW INDEX FROM tb_name;
```
### 4. 创建索引情景
#### 4.1 需要建立索引
1. 主键自动建立唯一索引
2. 频繁作为查询条件的字段应该创建索引
3. 查询中与其它表关联的字段，外键关系建立索引
4. 在高并发下倾向创建复合索引
5. 排序字段若通过索引去访问将大大提高排序速度
6. 查询中统计或分组字段需要建索引
#### 4.2 不需创建索引
1. 表记录太少
2. 经常增删改的字段
3. 数据重复且平均分布的表字段

### 5. 索引的数据结构
> 数据库索引所使用的数据结构是<font color=red>B+Tree</font>

1. 使用二叉树可能导致的场景：极端情况变成链表
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209094343621.png)
2. 使用红黑树：可能会导致树的高度过高
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209094426919.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
3. B-Tree：横向存储更多数据
- 叶节点具有相同的深度，叶节点的指针为空
- 所有索引元素不重复
- 节点中的数据索引从左到右递增排序
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209094450310.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
4. B+ Tree（B-Tree变种）
- 非叶子节点不存储data，值存储索引（冗余），可以放更多的索引。
- 叶子节点包含所有索引字段。
- 叶子节点用指针连接，提高访问的性能。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200209094508109.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
### 6. Mysql存储引擎
#### 6.1 存储引擎
1. MyISAM：一张表有3个文件 -- frm, MYD, MYI
执行一条查询SQL流程：首先判断条件是否带有索引，如果带有索引，那么先去MYI文件中找到这个索引所代表的数据的地址，再根据这个地址去MYD中查询相应的数据。
2. InnoDB：一张表有2个文件 -- frm, ibd
执行一条查询SQL流程：首先判断条件是否带有索引，如果带有索引，可以直接到ibd文件中查询到相应数据。

| 文件类型 | 描述           |
| -------- | -------------- |
| frm      | 存储表结构     |
| MYD      | 存储数据       |
| MYI      | 存储索引       |
| ibd      | 存储索引和数据 |

#### 6.2 聚集索引和非聚集索引
聚集索引：索引和数据存储在一个文件，如InnoDB的主键索引，聚集索引查找效率高。
非聚集索引：索引和数据存储在不同文件，如MyISAM的主键索引。
#### 6.3 InnoDB表必须有主键，并且推荐使用整形的自增主键
**必须有主键原因**：B+树必须有个主键，没有主键这个树无法组织。

**推荐整型原因**：因为B+树需要一直比较主键的大小，整型的比较速度比字符串快，因为比较字符串需要先转换为ASCII码。而且整型比字符串省空间。

**推荐自增原因**：因为B+树的存储是从左到右递增的。如果使用随机数存储，那么有可能将索引插入到中间的一个已经满的子节点中，那么就会导致树需要分裂再平衡来维护索引。如果是自增的话，每一次插入的索引都是在最后的，所以性能比较高。
#### 6.4 范围查找
如果想要找data>20的这个范围，只需要找到20这个元素，然后直接根据指针依次查询就可以了。

### 7. Explain
#### 7.1 作用
表的读取顺序、数据读取操作的操作类型、哪些索引可以使用、哪些索引被实际使用、表之间的引用、每张表有多少行被优化器查询。
#### 7.2 Explain查询结果字段说明
| 字段          | 描述                                                         |
| ------------- | ------------------------------------------------------------ |
| id            | id越大，优先级越高；id相同，执行顺序由上至下                 |
| select_type   | 查询类型，主要用于区别普通查询、联合查询、子查询等           |
| table         | 查询的表                                                     |
| type          | 访问类型                                                     |
| possible_keys | 查询涉及到的字段若存在索引，将被列出，但不一定被实际使用     |
| key           | 实际使用的索引，如为NULL，则没使用索引。查询中若使用了覆盖索引，则该索引仅出现在key列表中 |
| key_len       | 索引的长度                                                   |
|ref|显示索引的哪一列被使用了
|rows|根据表统计信息索引选用的情况，大致估算出找出所需的记录需要读取的行数|
|Extra|额外信息|

#### 7.3 type
1. 性能从好到差：
system>const>eq_ref>ref>range>index>ALL
一般来说，得保证查询至少达到range级别，最好能达到ref。

| 属性   | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| system | 表中只有一行记录，可忽略不计                                 |
| const  | 一次就检索到，主键或唯一索引比较常量                         |
| eq_ref | 唯一性索引扫描，表中只有一条记录与之匹配，常见于主键或唯一索引扫描 |
| ref    | 非唯一性索引扫描，返回匹配某个单独值 的所有行                |
| range  | 只检索给定范围的行，where子句中出现<、>、between、in等查询   |
| index  | 全索引扫描                                                   |
| ALL    | 全表扫描                                                     |

#### 7.4 Extra
| 属性                         | 描述                                                         |
| ---------------------------- | ------------------------------------------------------------ |
| Using filesort               | Mysql中无法利用索引完成的排序成为"文件排序"                  |
| Using temporary              | Mysql在对查询结果排序时使用临时表，常见于order by和group by  |
| Using Index                  | 表示相应的select操作中使用了覆盖索引，避免访问表的数据行，效率不错 |
| Using where                  | 使用了where查询                                              |
| Using join buffer            | 使用了连接缓存                                               |
| impossible where             | where子句的值是false，不能用来获取任何元组                   |
| select tables optimized away | 在没有group by子句的情况下，基于索引优化MIN/MAX操作          |
| distinct                     | 优化distinct操作，在找到第一匹配元组后即停止找同样值的动作   |

### 8. 索引失效原因
1. 最佳左前缀法则：如果索引了多列，查询从索引的最左前列开始并<font color=red>不跳过索引中的列</font>。
2. 不在索引上做任何操作（计算、函数、类型转换），会导致索引失效转向权标扫描
3. 存储引擎不能使用索引中范围条件右边的列
4. 尽量使用覆盖索引（只访问索引的查询），不使用select *
5. 使用 != < > 的时候使用索引会导致全表扫描
6. is null，is not null无法使用索引
7. like以通配符开头会导致索引失效，所以%要写最右边
8. 字符串不加单引号会导致索引失效
9. 使用OR连接会导致索引失效  
### 9. Join调优总结
尽可能减少Join语句中NestedLoop的循环总次数，永远用小结果集驱动大结果集。
优先优化NestedLoop的内层循环。
保证Join语句中被驱动表上的Join条件字段已经被索引。

### 10. 慢查询日志
查看是否开启
```sql
show variables like '%slow_query_log%'
```
开启和关闭 (1和0)，数据库关闭失效
```sql
set global slow_query_log=1;
```
查看多少时间算慢查询，默认10秒
```sql
show variables like '%long_query_time%';
```
设置慢sql阈值
```sql
set global long_query_time=3;
```
### 11. show profile
> 是mysql提供可以用来分析当前会话中的语句执行的资源消耗情况，可以用于sql调优的测量

查看profile是否开启，默认关闭
```sql
show variables like 'profiling';
```
打开profile
```sql
set profiling = on;
```
查询profiles
```sql
show profiles;
```
查询详情
```sql
show profile cpu, block io for query [Query_ID];
```

## Mysql事务

### 1. 开启事务提交（Mysql）
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
### 2. 事务并发性问题
对于同时运行多个事务，这些事务访问**数据库中相同的数据**时，没有没有采取必要的隔离机制，就会导致各种并发问题：
- 脏读：事务A读到了事务B已修改但尚未提交的数据，此时事务B回滚，A读取数据无效，不符合一致性。
- 不可重复读：事务A读到了事务B已提交的修改数据，不符合隔离性。
- 幻读：事务A读到了事务B提交的新增数据，不符合隔离性。

### 3. Mysql提供的4种隔离级别
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

## Mysql变量

### 系统变量
```sql
# 查看所有系统变量
SHOW VARIABLES

# 查看所有全局变量
SHOW GLOBAL VARIABLES

# 查看所有会话变量
SHOW SESSION VARIABLES

# 查看某个系统变量的值
SELECT @@系统变量名

# 为某个系统变量赋值
SET 系统变量名 = 值
```
### 自定义变量
针对于当前会话有效，同于会话变量的作用域
```sql
# 声明并初始化 三种写法
SET @用户变量名=值;
SET @用户变量名:=值;
SELECT @用户变量名:=值;

# 赋值（更新用户变量的值）
SET @用户变量名=值;
SET @用户变量名:=值;
SELECT @用户变量名:=值;
SELECT 字段 INTO @变量名 FROM 表;

# 查看用户变量的值
SELECT @用户变量名;
```
局部变量（仅仅在定义它的begin end中有效）

```sql
# 声明
DECLARE 变量名 类型;
DECLARE 变量名 类型 DEFAULT 值;

# 赋值
SET 局部变量名=值;
SET 局部变量名:=值;
SELECT @局部变量名:=值;
SELECT 字段 INTO 局部变量名 FROM 表;

# 查看
SELECT 局部变量名
```

## Mysql函数

### 存储过程和函数的区别
- 存储过程：可以有0个返回，也可以有多个返回，适合做批量插入、更新
- 函数：有且仅有一个返回。适合做处理数据后返回一个结果

### 语法
参数列表 包含两部分：参数名、参数类型
函数体肯定会有RETURN语句，否则会报错
使用 DELIMITER 设置结束标记

```sql
DELIMITER $
# 创建函数
CREATE FUNCTION 函数名(参数列表) RETURNS 返回类型
BEGIN
	函数体 
END $

# 调用语法
SELECT 函数名(参数列表)$
```
### 案例
1.无参有返回
```sql
DELIMITER $
# 返回公司员工的个数
CREATE FUNCTION fun_test() RETURNS INT
BEGIN
	DECLARE c INT DEFAULT 0;
	SELECT COUNT(*) INTO c
	FROM tb_employee;
	RETURN c;
END $
# 调用
SELECT fun_test()$
```
2.有参有返回
```sql
DELIMITER $
# 根据员工名，返回他的工资
CREATE FUNCTION fun_test(empName VARCHAR(20)) RETURNS DOUBLE
BEGIN
	SET @sal = 0; # 可使用局部变量和用户变量，这里使用用户变量
	SELECT salary INTO @sal	#赋值
	FROM tb_employee
	WHERE last_name = empName;
	RETURN @sal;
END $
SELECT fun_test('张三')$
```
### 查看和删除函数
```sql
# 查看函数
SHOW CREATE FUNCTION fun_test;

# 删除函数
DROP FUNCTION fun_test;
```

## Mysql流程控制语句

### IF函数
语法：IF(表达式1，表达式2，表达式3)
解释：如果表达式1成立，则返回表达式2，否则返回表达式3
### CASE 结构
特点：可以作为表达式，嵌套在其它语句中使用，也可以作为独立的语句使用
1. 类似switch case语句，一般用于实现等值判断
```sql
CASE 变量|表达式|字段
WHEN 要判断的值 THEN 返回值1或语句1
WHEN 要判断的值 THEN 返回值2或语句2
...
ELSE 返回值n或语句n
END
```
2. 类型多重if语句，一般用于实现区间判断

```sql
CASE 
WHEN 要判断的条件1 THEN 返回值1或语句1
WHEN 要判断的条件2 THEN 返回值2或语句2
...
ELSE 返回值n或语句n
END
```
### IF结构
应用在BEGIN END中
```sql
IF 条件1 THEN 语句1;
ELSEIF 条件2 THEN 语句2;
...
ELSE 语句n;
END IF
```
### 循环结构
分类：while、loop、repeat
循环控制：
- iterate 类似于 continue，结束本次循环，继续下一次
- leave 类似于 break，结束当前所在循环

**while语法**
```sql
# 标签可不写
标签:while 循环条件 do
	循环体;
end while 标签
```
**loop语法**
```sql
# 可以用来模拟简单的死循环
标签:loop
	循环体;
end loop 标签;
```
**repeat语法**
```sql
标签:repeat
	循环体;
until 结束循环的条件
end repeat
```
**while案例**
```sql
# 向admin表批量插入count条记录
CREATE PROCEDURE proc_test(IN count INT)
BEGIN
	DECLARE i INT DEFAULT 1;
	WHILE i <= count DO
		INSERT INTO admin (username, passowrd) VALUES (CONCAT('Jack', i), '123456');
		SET i = i + 1;
	END WHILE;
END
```

## Mysql存储过程

## 含义
一组预先编译好的SQL语句的集合，可以理解为批处理语句，优势有：
1. 提高了代码的重用性
2. 简化操作
3. 减少了编译次数和与数据库的连接次数，提高了效率

### 操作
创建语法 参数列表有3部分：参数模式、参数名、参数类型
参数举例： IN stuname VARCHAR(20)
参数模式：
- IN 该参数可以作为输入，即需要调用方传过来值
- OUT 该参数可以作为输出，即可作为返回值
- INOUT 该参数既可以作为输入也可以作为输出

如果存储过程体只有一句话，BEGIN END可以省略
存储过程体中每条SQL语句的结尾必须加分号
需要修改分隔符否则mysql遇到分号就退出了<code>DELIMITER $</code>
```sql
# 创建语法
DELIMITER $
CREATE PROCEDURE 存储过程名(参数列表)
BEGIN
	存储过程体
END $

# 调用语法
CALL 存储过程名(参数列表);
```
案例（带IN模式的存储过程）
```sql
# 账号密码相等返回成功，否则返回失败
DELIMITER $
CREATE PROCEDURE proc_test(IN username VARCHAR(20), IN password VARCHAR(20))
BEGIN
	DECLARE result INT DEFAULT 0; # 声明并初始化
	SELECT COUNT(*) INTO result
	FROM admin
	WHERE admin.username = username
	AND admin.password = password;
	SELECT IF(result>0,'成功','失败');	# 使用变量
END $
# 调用存储过程
CALL proc_test('admin', '123456');
```
案例（带OUT模式的存储过程）

```sql
# 根据女生名称查询出对应的男生名称
DELIMITER $
CREATE PROCEDURE proc_test(IN girl VARCHAR(20), OUT boy VARCHAR(20))
BEGIN
	SELECT bo.boyname INTO boy
	FROM boys a
	INNER JOIN girls b ON a.id = b.boyid
	WHERE b.name = girl;
END $

# 调用存储过程
CALL proc_test('小昭', @bname);
SELECT @bname;
```
案例（带INOUT模式的存储过程）

```sql
# 传入a，b两个值，最终a，b都将翻倍并返回
DELIMITER $
CREATE PROCEDURE proc_test(INOUT a INT, INOUT b INT)
BEGIN
	SET a = a * 2;
	SET b = b * 2;
END $

# 调用存储过程，必须先定义用户变量
SET @a = 10;
SET @b = 20;
CALL proc_test(@a, @b);
SELECT @a, @b;
```
### 查看和删除存储过程

```sql
# 查看存储过程信息
SHOW CREATE PROCEDURE proc_test

# 删除存储过程
DROP PROCEDURE proc_test
```

## Mysql锁

> Mysql有三种锁：表锁(偏读)、行锁(偏写)、页锁
### 1. 查看锁命令
#### 1.1 查看锁

```sql
show open tables;
```
In_use为0表示没有被锁
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200201080542825.png)
#### 1.2 分析表锁定
```sql
show status like '%table%'
```
- Table_locks_immediate：产生表级锁定的次数（锁的查询次数）。
- Table_locks_waited：出现表级锁定争用而发生等待的次数，此值高说明存在严重表级锁争用情况。
### 2. 表锁
#### 2.1 读锁（共享锁）
Session 1 为Table增加<font color=red>读锁</font>之后：
- Session 1 只能读锁定表，不能读其他表，写锁定表<font color=red>报错</font>。
- Session 2 可以读任何表，写锁定表<font color=red>阻塞</font>。
#### 2.2 写锁（独占锁）
Session 1 为Table增加<font color=red>写锁</font>之后：
- Session 1 可以做锁定表进行任何操作
- Session 2 无法对锁定表进行任何操作

#### 2.3 相关命令
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
### 3. 行锁
#### 3.1 开启事务即开启了行锁
提交事务之前，其它会话查询到的都是未提交的数据，如果更新了同一行，会被阻塞，直到这个事务被提交。
```sql
set autocommit = 0;
update dept set dname = '开发部2' where deptno = 1; 
commit;
```
#### 3.2 手动上锁
当查询deptno=1的数据的时候，加`for update`语句，此时其它会话修改这条记录就会被阻塞。
```sql
select * from dept where deptno = 1 for update;
```

## Mysql主从复制

### 1. 复制原理
1. master将改变记录到二进制日志(binary log)，这个记录过程叫二进制日志事件(binary log events)。
2. slave将master的binary log events拷贝到它的中继日志(relay log)。
3. slave重做中继日志中的事件，将改变应用到自己的数据库中，Mysql复制是异步且串行化的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20200203173115696.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### 2. 配置(基于mysql 8.x)
#### 2.1 master配置文件修改
```
[mysqld]
# 设置主机Id
server-id=1
# 启用二进制日志
log-bin=E:\\Software\\mysql-8.0.19\\data\\logbin
```
#### 2.2 slave配置文件修改
```
[mysqld]
# 设置从机Id
server-id=2
# 启用二进制日志
log-bin=/var/run/mysqld/logbin
```
#### 2.3 具体操作
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
### 3. 番外之常用命令
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