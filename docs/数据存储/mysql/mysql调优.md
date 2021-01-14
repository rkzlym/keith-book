# mysql调优

## 数据类型的优化

### 设计原则

#### 更小的通常更好

应该尽量使用可以正确存储数据的最小数据类型，更小的数据类型通常更快，因为它们占用更少的磁盘、内存和CPU缓存，并且处理时需要的CPU周期更少，但是要确保没有低估需要存储的值的范围，如果无法确认哪个数据类型，就选择你认为不会超过范围的最小类型
案例：
设计两张表，设计不同的数据类型，查看表的容量

#### 简单就好

简单数据类型的操作通常需要更少的CPU周期，例如，
1、整型比字符操作代价更低，因为字符集和校对规则是字符比较比整型比较更复杂，
2、使用mysql自建类型而不是字符串来存储日期和时间
3、用整型存储IP地址
案例：
创建两张相同的表，改变日期的数据类型，查看SQL语句执行的速度

#### 尽量避免null

如果查询中包含可为NULL的列，对mysql来说很难优化，因为可为null的列使得索引、索引统计和值比较都更加复杂，坦白来说，通常情况下null的列改为not null带来的性能提升比较小，所有没有必要将所有的表的schema进行修改，但是应该尽量避免设计成可为null的列

### 设计细则

#### 整数类型

可以使用的几种整数类型：TINYINT，SMALLINT，MEDIUMINT，INT，BIGINT分别使用8，16，24，32，64位存储空间。
尽量使用满足需求的最小数据类型

#### 字符和字符串类型

##### varchar根据实际内容长度保存数据

​	1、使用最小的符合需求的长度。
​	2、varchar(n) n小于等于255使用额外一个字节保存长度，n>255使用额外两个字节保存长度。
​	3、varchar(5)与varchar(255)保存同样的内容，硬盘存储空间相同，但内存空间占用不同，是指定的大小 。
​	4、varchar在mysql5.6之前变更长度，或者从255一下变更到255以上时时，都会导致锁表。
​	应用场景
​		1、存储长度波动较大的数据，如：文章，有的会很短有的会很长
​		2、字符串很少更新的场景，每次更新后都会重算并使用额外存储空间保存长度
​		3、适合保存多字节字符，如：汉字，特殊字符等

##### char固定长度的字符串

​	1、最大长度：255
​	2、会自动删除末尾的空格
​	3、检索效率、写效率 会比varchar高，以空间换时间
​	应用场景
​		1、存储长度波动不大的数据，如：md5摘要
​		2、存储短字符串、经常更新的字符串

#### BLOB和TEXT类型

MySQL 把每个 BLOB 和 TEXT 值当作一个独立的对象处理。
两者都是为了存储很大数据而设计的字符串类型，分别采用二进制和字符方式存储

#### 日期类型

datetime
		占用8个字节
		与时区无关，数据库底层时区配置，对datetime无效
		可保存到毫秒
		可保存时间范围大
		不要使用字符串存储日期类型，占用空间大，损失日期类型函数的便捷性
timestamp
		占用4个字节
		时间范围：1970-01-01到2038-01-19
		精确到秒
		采用整形存储
		依赖数据库设置的时区
		自动更新timestamp列的值
date
		占用的字节数比使用字符串、datetime、int存储要少，使用date类型只需要3个字节
		使用date类型还可以利用日期时间函数进行日期之间的计算
		date类型用于保存1000-01-01到9999-12-31之间的日期

#### 使用枚举代替字符串类型

有时可以使用枚举类代替常用的字符串类型，mysql存储枚举类型会非常紧凑，会根据列表值的数据压缩到一个或两个字节中，mysql在内部会将每个值在列表中的位置保存为整数，并且在表的.frm文件中保存“数字-字符串”映射关系的查找表
 create table enum_test(e enum('fish','apple','dog') not null);
 insert into enum_test(e) values('fish'),('dog'),('apple');
 select e+0 from enum_test;

#### 特殊类型数据

人们经常使用varchar(15)来存储ip地址，然而，它的本质是32位无符号整数不是字符串，可以使用INET_ATON()和INET_NTOA函数在这两种表示方法之间转换
案例：
select inet_aton('1.1.1.1')
select inet_ntoa(16843009)

## 索引基本知识

​	索引的优点
​		1、大大减少了服务器需要扫描的数据量
​		2、帮助服务器避免排序和临时表
​		3、将随机io变成顺序io
​	索引的用处
​		1、快速查找匹配WHERE子句的行
​		2、从consideration中消除行,如果可以在多个索引之间进行选择，mysql通常会使用找到最少行的索引
​		3、如果表具有多列索引，则优化器可以使用索引的任何最左前缀来查找行
​		4、当有表连接的时候，从其他表检索行数据
​		5、查找特定索引列的min或max值
​		6、如果排序或分组时在可用索引的最左前缀上完成的，则对表进行排序和分组
​		7、在某些情况下，可以优化查询以检索值而无需查询数据行
​	索引的分类
​		主键索引
​		唯一索引
​		普通索引
​		全文索引
​		组合索引
​	面试技术名词
​		回表
​		覆盖索引
​		最左匹配
​		索引下推
​	索引采用的数据结构
​		哈希表
​		B+树
​	索引匹配方式
​		全值匹配
​			全值匹配指的是和索引中的所有列进行匹配
​				explain select * from staffs where name = 'July' and age = '23' and pos = 'dev';
​		匹配最左前缀
​			只匹配前面的几列
​				explain select * from staffs where name = 'July' and age = '23';
​				explain select * from staffs where name = 'July';
​		匹配列前缀
​			可以匹配某一列的值的开头部分
​				explain select * from staffs where name like 'J%';
​				explain select * from staffs where name like '%y';
​		匹配范围值
​			可以查找某一个范围的数据
​				explain select * from staffs where name > 'Mary';
​		精确匹配某一列并范围匹配另外一列
​			可以查询第一列的全部和第二列的部分
​				explain select * from staffs where name = 'July' and age > 25;
​		只访问索引的查询
​			查询的时候只需要访问索引，不需要访问数据行，本质上就是覆盖索引
​				explain select name,age,pos from staffs where name = 'July' and age = 25 and pos = 'dev';



哈希索引
	基于哈希表的实现，只有精确匹配索引所有列的查询才有效
	在mysql中，只有memory的存储引擎显式支持哈希索引
	哈希索引自身只需存储对应的hash值，所以索引的结构十分紧凑，这让哈希索引查找的速度非常快
	哈希索引的限制
		1、哈希索引只包含哈希值和行指针，而不存储字段值，索引不能使用索引中的值来避免读取行
		2、哈希索引数据并不是按照索引值顺序存储的，所以无法进行排序
		3、哈希索引不支持部分列匹配查找，哈希索引是使用索引列的全部内容来计算哈希值
		4、哈希索引支持等值比较查询，也不支持任何范围查询
		5、访问哈希索引的数据非常快，除非有很多哈希冲突，当出现哈希冲突的时候，存储引擎必须遍历链表中的所有行指针，逐行进行比较，直到找到所有符合条件的行
		6、哈希冲突比较多的话，维护的代价也会很高
	案例

```
当需要存储大量的URL，并且根据URL进行搜索查找，如果使用B+树，存储的内容就会很大
select id from url where url=""
也可以利用将url使用CRC32做哈希，可以使用以下查询方式：
select id fom url where url="" and url_crc=CRC32("")
此查询性能较高原因是使用体积很小的索引来完成查找
```

组合索引
	当包含多个列作为索引，需要注意的是正确的顺序依赖于该索引的查询，同时需要考虑如何更好的满足排序和分组的需要
	案例，建立组合索引a,b,c
		不同SQL语句使用索引情况

聚簇索引与非聚簇索引
	聚簇索引
		不是单独的索引类型，而是一种数据存储方式，指的是数据行跟相邻的键值紧凑的存储在一起
			优点
				1、可以把相关数据保存在一起
				2、数据访问更快，因为索引和数据保存在同一个树中
				3、使用覆盖索引扫描的查询可以直接使用页节点中的主键值
			缺点
				1、聚簇数据最大限度地提高了IO密集型应用的性能，如果数据全部在内存，那么聚簇索引就没有什么优势
				2、插入速度严重依赖于插入顺序，按照主键的顺序插入是最快的方式
				3、更新聚簇索引列的代价很高，因为会强制将每个被更新的行移动到新的位置
				4、基于聚簇索引的表在插入新行，或者主键被更新导致需要移动行的时候，可能面临页分裂的问题
				5、聚簇索引可能导致全表扫描变慢，尤其是行比较稀疏，或者由于页分裂导致数据存储不连续的时候
	非聚簇索引
		数据文件跟索引文件分开存放

覆盖索引
	基本介绍
		1、如果一个索引包含所有需要查询的字段的值，我们称之为覆盖索引
		2、不是所有类型的索引都可以称为覆盖索引，覆盖索引必须要存储索引列的值
		3、不同的存储实现覆盖索引的方式不同，不是所有的引擎都支持覆盖索引，memory不支持覆盖索引
	优势
		1、索引条目通常远小于数据行大小，如果只需要读取索引，那么mysql就会极大的较少数据访问量
		2、因为索引是按照列值顺序存储的，所以对于IO密集型的范围查询会比随机从磁盘读取每一行数据的IO要少的多
		3、一些存储引擎如MYISAM在内存中只缓存索引，数据则依赖于操作系统来缓存，因此要访问数据需要一次系统调用，这可能会导致严重的性能问题
		4、由于INNODB的聚簇索引，覆盖索引对INNODB表特别有用
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

优化小细节
	当使用索引列进行查询的时候尽量不要使用表达式，把计算放到业务层而不是数据库层
		select actor_id from actor where actor_id=4;
		select actor_id from actor where actor_id+1=5;
	尽量使用主键查询，而不是其他索引，因此主键查询不会触发回表查询
	使用前缀索引
		前缀索引实例说明.md
	使用索引扫描来排序
		使用索引扫描来做排序.md
	union all,in,or都能够使用索引，但是推荐使用in
		explain select * from actor where actor_id = 1 union all select * from actor where actor_id = 2;
		explain select * from actor where actor_id in (1,2);
		 explain select * from actor where actor_id = 1 or actor_id =2;
	范围列可以用到索引
		范围条件是：<、>
		范围列可以用到索引，但是范围列后面的列无法用到索引，索引最多用于一个范围列
	强制类型转换会全表扫描
		explain select * from user where phone=13800001234;
			不会触发索引
		explain select * from user where phone='13800001234';
			触发索引
	更新十分频繁，数据区分度不高的字段上不宜建立索引
		更新会变更B+树，更新频繁的字段建议索引会大大降低数据库性能
		类似于性别这类区分不大的属性，建立索引是没有意义的，不能有效的过滤数据，
		一般区分度在80%以上的时候就可以建立索引，区分度可以使用 count(distinct(列名))/count(*) 来计算
	创建索引的列，不允许为null，可能会得到不符合预期的结果
	当需要进行表连接的时候，最好不要超过三张表，因为需要join的字段，数据类型必须一致
	能使用limit的时候尽量使用limit
	单表索引建议控制在5个以内
	单索引字段数不允许超过5个（组合索引）
	创建索引的时候应该避免以下错误概念
		索引越多越好
		过早优化，在不了解系统的情况下进行优化



索引监控
	show status like 'Handler_read%';
	参数解释
		Handler_read_first：读取索引第一个条目的次数
		Handler_read_key：通过index获取数据的次数
		Handler_read_last：读取索引最后一个条目的次数
		Handler_read_next：通过索引读取下一条数据的次数
		Handler_read_prev：通过索引读取上一条数据的次数
		Handler_read_rnd：从固定位置读取数据的次数
		Handler_read_rnd_next：从数据节点读取下一条数据的次数