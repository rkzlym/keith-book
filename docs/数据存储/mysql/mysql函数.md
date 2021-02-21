# mysql 函数

## 存储过程和函数的区别
- 存储过程：可以有0个返回，也可以有多个返回，适合做批量插入、更新
- 函数：有且仅有一个返回。适合做处理数据后返回一个结果

## 语法
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
## 查看和删除函数
```sql
# 查看函数
SHOW CREATE FUNCTION fun_test;

# 删除函数
DROP FUNCTION fun_test;
```