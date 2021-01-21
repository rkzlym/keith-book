# mysql存储过程

## 含义
一组预先编译好的SQL语句的集合，可以理解为批处理语句，优势有：
1. 提高了代码的重用性
2. 简化操作
3. 减少了编译次数和与数据库的连接次数，提高了效率

## 操作
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
## 查看和删除存储过程

```sql
# 查看存储过程信息
SHOW CREATE PROCEDURE proc_test

# 删除存储过程
DROP PROCEDURE proc_test
```