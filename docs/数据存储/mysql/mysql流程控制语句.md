# mysql 流程控制语句

## IF函数
语法：IF(表达式1，表达式2，表达式3)
解释：如果表达式1成立，则返回表达式2，否则返回表达式3
## CASE 结构
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
## IF结构
应用在BEGIN END中
```sql
IF 条件1 THEN 语句1;
ELSEIF 条件2 THEN 语句2;
...
ELSE 语句n;
END IF
```
## 循环结构
分类：while、loop、repeat
循环控制：
- iterate 类似于 continue，结束本次循环，继续下一次
- leave 类似于 break，结束当前所在循环

**while语法**
```sql
-- 标签可不写
标签:while 循环条件 do
	循环体;
end while 标签
```
**loop语法**
```sql
-- 可以用来模拟简单的死循环
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
-- 向admin表批量插入count条记录
CREATE PROCEDURE proc_test(IN count INT)
BEGIN
	DECLARE i INT DEFAULT 1;
	WHILE i <= count DO
		INSERT INTO admin (username, passowrd) VALUES (CONCAT('Jack', i), '123456');
		SET i = i + 1;
	END WHILE;
END
```