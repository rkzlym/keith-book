# mysql索引

## 1. 概念
索引是帮助Mysql高效获取数据的排好序的数据结构

索引会影响到 where 后面的查找和 order by 后面的排序

索引的优点

1. 大大减少了服务器需要扫描的数据量
2. 助服务器避免排序和临时表
3. 将随机 IO 变成顺序 IO	

索引的用处

1. 快速查找匹配 WHERE 子句的行

2. 从consideration中消除行,如果可以在多个索引之间进行选择，mysql通常会使用找到最少行的索引

3. 如果表具有多列索引，则优化器可以使用索引的任何最左前缀来查找行

4. 当有表连接的时候，从其他表检索行数据

5. 查找特定索引列的min或max值

6. 如果排序或分组时在可用索引的最左前缀上完成的，则对表进行排序和分组

7. 在某些情况下，可以优化查询以检索值而无需查询数据行

索引采用的数据结构：哈希表，B+树

## 2. 索引分类

1. 普通索引：是最基本的索引，它没有任何限制
2. 主键索引：是一种特殊的唯一索引，一个表只能有一个主键
3. 唯一索引：索引列的值必须唯一，但允许有空值
4. 组合索引：一个索引包含多个列
5. 全文索引：主要用来查找文本中的关键字，而不是直接与索引中的值相比较，只有char，varchar，text 列上可以创建全文索引

技术名词：回表，覆盖索引，最左匹配，索引下推

| 类型        | 描述                                     |
| ----------- | :--------------------------------------- |
| PRIMARY KEY | 主键，索引值必须唯一，且不能为NULL       |
| UNIQUE      | 索引值必须唯一，可以为NULL，并可出现多次 |
| INDEX       | 普通索引，索引值可能出现多次             |
| FULLTEXT    | 全文索引                                 |

## 3. 索引语法和匹配方式
### 3.1 基本语法
```sql
-- 创建索引
CREATE INDEX idx_name ON tb_name(column_name);
ALTER TABLE tb_name ADD INDEX idx_name(column_name);
-- 删除索引
DROP INDEX idx_name ON tb_name;
-- 查看索引
SHOW INDEX FROM tb_name;
```
### 3.2 索引匹配方式

当包含多个列作为索引，需要注意的是正确的顺序依赖于该索引的查询，同时需要考虑如何更好的满足排序和分组的需要

案例，建立组合索引a,b,c，不同SQL语句使用索引情况

| 语句                                    | 索引是否发挥作用   |
| --------------------------------------- | ------------------ |
| where a = 3                             | 是，使用了 a       |
| where a= 3 and b = 4                    | 是，使用了 a, b    |
| where a = 3 and b = 4 and c =5          | 是，使用了 a, b, c |
| where b = 3 or c = 4                    | 否                 |
| where a = 3 and c = 4                   | 是，使用了 a       |
| where a = 3 and b > 10 and c = 7        | 是，使用了 a, b    |
| where a = 3 and b like '%xx%' and c = 7 | 是，使用了 a       |

### 3.3 索引匹配方式 案例

```sql
create table staffs(
    id int primary key auto_increment,
    name varchar(24) not null default '' comment '姓名',
    age int not null default 0 comment '年龄',
    pos varchar(20) not null default '' comment '职位',
    add_time timestamp not null default current_timestamp comment '入职时间'
  ) charset utf8 comment '员工记录表';
-----------alter table staffs add index idx_nap(name, age, pos);
```

全值匹配：全值匹配指的是和索引中的所有列进行匹配

```mysql
explain select * from staffs where name = 'July' and age = '23' and pos = 'dev';
```

匹配最左前缀：只匹配前面的几列

```mysql
explain select * from staffs where name = 'July' and age = '23';
explain select * from staffs where name = 'July';
```

匹配列前缀：可以匹配某一列的值的开头部分

```mysql
explain select * from staffs where name like 'J%';
explain select * from staffs where name like '%y';
```

匹配范围值：可以查找某一个范围的数据

```mysql
explain select * from staffs where name > 'Mary';
```

精确匹配某一列并范围匹配另外一列：可以查询第一列的全部和第二列的部分

```mysql
explain select * from staffs where name = 'July' and age > 25;
```

只访问索引的查询：查询的时候只需要访问索引，不需要访问数据行，本质上就是覆盖索引

```mysql
explain select name,age,pos from staffs where name = 'July' and age = 25 and pos = 'dev';
```

## 4. 创建索引情景

### 4.1 需要建立索引
1. 主键自动建立唯一索引
2. 频繁作为查询条件的字段应该创建索引
3. 查询中与其它表关联的字段，外键关系建立索引
4. 在高并发下倾向创建复合索引
5. 排序字段若通过索引去访问将大大提高排序速度
6. 查询中统计或分组字段需要建索引
### 4.2 不需创建索引
1. 表记录太少
2. 经常增删改的字段
3. 数据重复且平均分布的表字段

原因

1. 更新会变更 B+ 树，更新频繁的字段建立索引会大大降低数据库性能

2. 区分不大的属性，建立索引是没有意义的，不能有效的过滤数据

3. 一般区分度在80%以上的时候就可以建立索引，计算区分度 `count(distinct(列名))/count(*) `

4. 创建索引的列，不允许为null，可能会得到不符合预期的结果

## 5. 索引的数据结构
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
## 6. mysql存储引擎
### 6.1 存储引擎
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

### 6.2 聚簇索引和非聚簇索引
**聚集索引**：索引和数据存储在一个文件，如InnoDB的主键索引。

优点

1. 数据访问更快，因为索引和数据保存在同一个树中

2. 使用覆盖索引扫描的查询可以直接使用页节点中的主键值

缺点

1. 聚簇数据最大限度地提高了IO密集型应用的性能，如果数据全部在内存，那么聚簇索引就没有什么优势

2. 插入速度严重依赖于插入顺序，按照主键的顺序插入是最快的方式

3. 更新聚簇索引列的代价很高，因为会强制将每个被更新的行移动到新的位置

4. 基于聚簇索引的表在插入新行，或者主键被更新导致需要移动行的时候，可能面临页分裂的问题

5. 聚簇索引可能导致全表扫描变慢，尤其是行比较稀疏，或者由于页分裂导致数据存储不连续的时候

**非聚集索引**：索引和数据存储在不同文件，如MyISAM的主键索引。

### 6.3 哈希索引

> 在mysql中，只有memory的存储引擎显式支持哈希索引

基于哈希表的实现，只有精确匹配索引所有列的查询才有效

哈希索引自身只需存储对应的hash值，所以索引的结构十分紧凑，这让哈希索引查找的速度非常快

**哈希索引的限制**

1. 哈希索引只包含哈希值和行指针，而不存储字段值，索引不能使用索引中的值来避免读取行

2. 哈希索引数据并不是按照索引值顺序存储的，所以无法进行排序

3. 哈希索引不支持部分列匹配查找，哈希索引是使用索引列的全部内容来计算哈希值

4. 哈希索引支持等值比较查询，也不支持任何范围查询

5. 访问哈希索引的数据非常快，除非有很多哈希冲突，当出现哈希冲突的时候，存储引擎必须遍历链表中的所有行指针，逐行进行比较，直到找到所有符合条件的行

6. 哈希冲突比较多的话，维护的代价也会很高

**案例**

```sql
-- 当需要存储大量的URL，并且根据URL进行搜索查找，如果使用B+树，存储的内容就会很大
select id from url where url=""
-- 也可以利用将url使用CRC32做哈希，可以使用以下查询方式：
select id fom url where url="" and url_crc=CRC32("")
-- 此查询性能较高原因是使用体积很小的索引来完成查找
```

### 6.4 覆盖索引

基本介绍

1. 如果一个索引包含所有需要查询的字段的值，我们称之为覆盖索引

2. 不是所有类型的索引都可以称为覆盖索引，覆盖索引必须要存储索引列的值

3. 不同的存储实现覆盖索引的方式不同，不是所有的引擎都支持覆盖索引，如memory不支持覆盖索引

优势

1. 索引条目通常远小于数据行大小，如果只需要读取索引，那么mysql就会极大的较少数据访问量

2. 因为索引是按照列值顺序存储的，所以对于IO密集型的范围查询会比随机从磁盘读取每一行数据的IO要少的多

3. 一些存储引擎如MYISAM在内存中只缓存索引，数据则依赖于操作系统来缓存，因此要访问数据需要一次系统调用，这可能会导致严重的

4. 由于innodb是聚簇索引，覆盖索引对innodb表特别有用

案例演示

1、当发起一个被索引覆盖的查询时，在explain的extra列可以看到using index的信息，此时就使用了覆盖索引

```sql
mysql> explain select store_id,film_id from inventory\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: inventory
   partitions: NULL
         type: index
possible_keys: NULL
          key: idx_store_id_film_id
      key_len: 3
          ref: NULL
         rows: 4581
     filtered: 100.00
        Extra: Using index
1 row in set, 1 warning (0.01 sec)
```

2、在大多数存储引擎中，覆盖索引只能覆盖那些只访问索引中部分列的查询。不过，可以进一步的进行优化，可以使用innodb的二级索引来覆盖查询。

例如：actor使用innodb存储引擎，并在last_name字段又二级索引，虽然该索引的列不包括主键actor_id，但也能够用于对actor_id做覆盖查询

```sql
mysql> explain select actor_id,last_name from actor where last_name='HOPPER'\G
*************************** 1. row ***************************
           id: 1
  select_type: SIMPLE
        table: actor
   partitions: NULL
         type: ref
possible_keys: idx_actor_last_name
          key: idx_actor_last_name
      key_len: 137
          ref: const
         rows: 2
     filtered: 100.00
        Extra: Using index
1 row in set, 1 warning (0.00 sec)
```

### 6.5 InnoDB表必须有主键

> 推荐使用整型的自增主键

**必须有主键原因**：B+树必须有个主键，没有主键这个树无法组织。

**推荐整型原因**：因为B+树需要一直比较主键的大小，整型的比较速度比字符串快，因为比较字符串需要先转换为ASCII码。而且整型比字符串省空间。

**推荐自增原因**：因为B+树的存储是从左到右递增的。如果使用随机数存储，那么有可能将索引插入到中间的一个已经满的子节点中，那么就会导致树需要分裂再平衡来维护索引。如果是自增的话，每一次插入的索引都是在最后的，所以性能比较高。
### 6.6 范围查找
如果想要找data>20的这个范围，只需要找到20这个元素，然后直接根据指针依次查询就可以了。

## 7. 索引监控

```sql
show status like 'Handler_read%';
```

参数解释

```
Handler_read_first：读取索引第一个条目的次数
Handler_read_key：通过index获取数据的次数
Handler_read_last：读取索引最后一个条目的次数
Handler_read_next：通过索引读取下一条数据的次数
Handler_read_prev：通过索引读取上一条数据的次数
Handler_read_rnd：从固定位置读取数据的次数
Handler_read_rnd_next：从数据节点读取下一条数据的次数
```

## 8. 索引失效原因

1. 最佳左前缀法则：如果索引了多列，查询从索引的最左前列开始并<font color=red>不跳过索引中的列</font>。
2. 不在索引上做任何操作（计算、函数、类型转换），会导致索引失效转向权标扫描
3. 存储引擎不能使用索引中范围条件右边的列
4. 尽量使用覆盖索引（只访问索引的查询），不使用select *
5. 使用 != < > 的时候使用索引会导致全表扫描
6. is null，is not null无法使用索引
7. like以通配符开头会导致索引失效，所以%要写最右边
8. 字符串不加单引号会导致索引失效
9. 使用OR连接会导致索引失效  
