# mysql 约束

## 六大约束
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

## 创建表时添加约束

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