# mysql变量

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