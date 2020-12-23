# mysql建库建表

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