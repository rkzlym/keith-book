# mysql索引

## 查看表中的索引
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