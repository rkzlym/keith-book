# mysql调优

## 数据类型的优化

### 设计原则

#### 更小的通常更好

应该尽量使用可以正确存储数据的最小数据类型，更小的数据类型通常更快，因为它们占用更少的磁盘、内存和CPU缓存，并且处理时需要的CPU周期更少，但是要确保没有低估需要存储的值的范围，如果无法确认哪个数据类型，就选择你认为不会超过范围的最小类型

#### 简单就好

简单数据类型的操作通常需要更少的CPU周期

1. 整型比字符操作代价更低，因为字符集和校对规则是字符比较比整型比较更复杂
2. 使用mysql自建类型而不是字符串来存储日期和时间
3. 用整型存储IP地址

#### 尽量避免null

如果查询中包含可为NULL的列，对mysql来说很难优化，因为可为null的列使得索引、索引统计和值比较都更加复杂，坦白来说，通常情况下null的列改为not null带来的性能提升比较小，所有没有必要将所有的表的schema进行修改，但是应该尽量避免设计成可为null的列

### 设计细则

#### 整数类型

可以使用的几种整数类型：TINYINT，SMALLINT，MEDIUMINT，INT，BIGINT分别使用8，16，24，32，64位存储空间。
尽量使用满足需求的最小数据类型

#### 字符和字符串类型

**varchar根据实际内容长度保存数据**

1. 使用最小的符合需求的长度。
2. varchar(n) n小于等于255使用额外一个字节保存长度，n>255使用额外两个字节保存长度。
3. varchar(5)与varchar(255)保存同样的内容，硬盘存储空间相同，但内存空间占用不同，是指定的大小 。
4. varchar在mysql5.6之前变更长度，或者从255一下变更到255以上时时，都会导致锁表。

应用场景：

1. 存储长度波动较大的数据，如：文章，有的会很短有的会很长
2. 字符串很少更新的场景，每次更新后都会重算并使用额外存储空间保存长度
3. 适合保存多字节字符，如：汉字，特殊字符等

**char固定长度的字符串**

1. 最大长度：255
2. 会自动删除末尾的空格
3. 检索效率、写效率 会比varchar高，以空间换时间​

应用场景：

1. 存储长度波动不大的数据，如：md5摘要
2. 存储短字符串、经常更新的字符串

#### BLOB和TEXT类型

MySQL 把每个 BLOB 和 TEXT 值当作一个独立的对象处理。

两者都是为了存储很大数据而设计的字符串类型，分别采用二进制和字符方式存储

#### 日期类型

> 不要使用字符串存储日期类型，占用空间大，损失日期类型函数的便捷性

**datetime**

占用8个字节

与时区无关，数据库底层时区配置对datetime无效，可保存到毫秒，可保存时间范围大

**timestamp**

占用4个字节，时间范围：1970-01-01到2038-01-19

精确到秒，采用整形存储，依赖数据库设置的时区自动更新timestamp列的值

**date**

占用3个字节，时间范围 1000-01-01~9999-12-31

可以利用日期时间函数进行日期之间的计算

#### 使用枚举代替字符串类型

有时可以使用枚举类代替常用的字符串类型，mysql存储枚举类型会非常紧凑，会根据列表值的数据压缩到一个或两个字节中，mysql在内部会将每个值在列表中的位置保存为整数，并且在表的.frm文件中保存“数字-字符串”映射关系的查找表

```mysql
create table enum_test(e enum('fish','apple','dog') not null);
insert into enum_test(e) values('fish'),('dog'),('apple');
select e+0 from enum_test;
```

#### 特殊类型数据

人们经常使用varchar(15)来存储ip地址，然而，它的本质是32位无符号整数不是字符串，可以使用INET_ATON()和INET_NTOA函数在这两种表示方法之间转换

```mysql
select inet_aton('1.1.1.1')
select inet_ntoa(16843009)
```

## 索引基本知识

### 索引的优点

1. 大大减少了服务器需要扫描的数据量

2. 助服务器避免排序和临时表

3. 将随机 IO 变成顺序 IO	

### 索引的用处

1. 快速查找匹配 WHERE 子句的行

2. 从consideration中消除行,如果可以在多个索引之间进行选择，mysql通常会使用找到最少行的索引

3. 如果表具有多列索引，则优化器可以使用索引的任何最左前缀来查找行

4. 当有表连接的时候，从其他表检索行数据

5. 查找特定索引列的min或max值

6. 如果排序或分组时在可用索引的最左前缀上完成的，则对表进行排序和分组

7. 在某些情况下，可以优化查询以检索值而无需查询数据行

### 索引技术名词

分类：主键索引，唯一索引，普通索引，全文索引，组合索引

技术名词：回表，覆盖索引，最左匹配，索引下推

索引采用的数据结构：哈希表，B+树

### 索引匹配方式

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

### 哈希索引

> 在mysql中，只有memory的存储引擎显式支持哈希索引

基于哈希表的实现，只有精确匹配索引所有列的查询才有效

哈希索引自身只需存储对应的hash值，所以索引的结构十分紧凑，这让哈希索引查找的速度非常快

**哈希索引的限制**

哈希索引只包含哈希值和行指针，而不存储字段值，索引不能使用索引中的值来避免读取行

哈希索引数据并不是按照索引值顺序存储的，所以无法进行排序

哈希索引不支持部分列匹配查找，哈希索引是使用索引列的全部内容来计算哈希值

哈希索引支持等值比较查询，也不支持任何范围查询

访问哈希索引的数据非常快，除非有很多哈希冲突，当出现哈希冲突的时候，存储引擎必须遍历链表中的所有行指针，逐行进行比较，直到找到所有符合条件的行

哈希冲突比较多的话，维护的代价也会很高

案例

```
当需要存储大量的URL，并且根据URL进行搜索查找，如果使用B+树，存储的内容就会很大
select id from url where url=""
也可以利用将url使用CRC32做哈希，可以使用以下查询方式：
select id fom url where url="" and url_crc=CRC32("")
此查询性能较高原因是使用体积很小的索引来完成查找
```

### 组合索引

当包含多个列作为索引，需要注意的是正确的顺序依赖于该索引的查询，同时需要考虑如何更好的满足排序和分组的需要

案例，建立组合索引a,b,c，不同SQL语句使用索引情况

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210121200556694.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

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



查询优化
	查询慢的原因
		网络
		CPU
		IO
		上下文切换
		系统调用
		生成统计信息
		锁等待时间
	优化数据访问
		查询性能低下的主要原因是访问的数据太多，某些查询不可避免的需要筛选大量的数据，我们可以通过减少访问数据量的方式进行优化
			确认应用程序是否在检索大量超过需要的数据
			确认mysql服务器层是否在分析大量超过需要的数据行
		是否向数据库请求了不需要的数据
			查询不需要的记录
			多表关联时返回全部列
			总是取出全部列
			重复查询相同的数据
	执行过程的优化
		查询缓存
		查询优化处理
			语法解析器和预处理
			查询优化器
				select count() from film_actor;
show status like 'last_query_cost';
可以看到这条查询语句大概需要做1104个数据页才能找到对应的数据，这是经过一系列的统计信息计算来的
					每个表或者索引的页面个数
					索引的基数
					索引和数据行的长度
					索引的分布情况
				在很多情况下mysql会选择错误的执行计划，原因如下：
					统计信息不准确
					执行计划的成本估算不等同于实际执行的成本
					mysql的最优可能跟你想的不一样
					mysql不考虑其他并发执行的查询
					mysql不会考虑不受其控制的操作成本
				优化器的优化策略
					静态优化
						直接对解析树进行分析，并完成优化
					动态优化
						动态优化与查询的上下文有关，也可能跟取值、索引对应的行数有关
					mysql对查询的静态优化只需要一次，但对动态优化在每次执行时都需要重新评估
				优化器的优化类型
					重新定义关联表的顺序
					将外连接转化成内连接，内连接的效率要高于外连接
					使用等价变换规则，mysql可以使用一些等价变化来简化并规划表达式
					优化count(),min(),max()
					预估并转化为常数表达式，当mysql检测到一个表达式可以转化为常数的时候，就会一直把该表达式作为常数进行处理
					索引覆盖扫描，当索引中的列包含所有查询中需要使用的列的时候，可以使用覆盖索引
					子查询优化
					等值传播
				关联查询
					join的实现方式原理
						Simple Nested-Loop Join
						Index Nested-Loop Join
						Block Nested-Loop Join
							（1）Join Buffer会缓存所有参与查询的列而不是只有Join的列。
（2）可以通过调整join_buffer_size缓存大小
（3）join_buffer_size的默认值是256K，join_buffer_size的最大值在MySQL 5.1.22版本前是4G-1，而之后的版本才能在64位操作系统下申请大于4G的Join Buffer空间。
（4）使用Block Nested-Loop Join算法需要开启优化器管理配置的optimizer_switch的设置block_nested_loop为on，默认为开启。
							show variables like '%optimizer_switch%'
					案例演示
				排序优化
					排序的算法
						两次传输排序
						单次传输排序
						当需要排序的列的总大小超过max_length_for_sort_data定义的字节，mysql会选择双次排序，反之使用单次排序，当然，用户可以设置此参数的值来选择排序的方式
	优化特定类型的查询
		优化count()查询
			总有人认为myisam的count函数比较快，这是有前提条件的，只有没有任何where条件的count()才是比较快的
			使用近似值
			更复杂的优化
		优化关联查询
			确保on或者using子句中的列上有索引，在创建索引的时候就要考虑到关联的顺序
			确保任何的groupby和order by中的表达式只涉及到一个表中的列，这样mysql才有可能使用索引来优化这个过程
		优化子查询
		优化limit分页
			优化此类查询的最简单的办法就是尽可能地使用覆盖索引，而不是查询所有的列
				select film_id,description from film order by title limit 50,5
				explain select film.film_id,film.description from film inner join (select film_id from film order by title limit 50,5) as lim using(film_id);
				查看执行计划查看扫描的行数
		优化union查询
			除非确实需要服务器消除重复的行，否则一定要使用union all，因此没有all关键字，mysql会在查询的时候给临时表加上distinct的关键字，这个操作的代价很高
		推荐使用用户自定义变量
			自定义变量的使用
				set @one :=1
				set @min_actor :=(select min(actor_id) from actor)
				set @last_week :=current_date-interval 1 week;
			自定义变量的限制
				1、无法使用查询缓存
				2、不能在使用常量或者标识符的地方使用自定义变量，例如表名、列名或者limit子句
				3、用户自定义变量的生命周期是在一个连接中有效，所以不能用它们来做连接间的通信
				4、不能显式地声明自定义变量地类型
				5、mysql优化器在某些场景下可能会将这些变量优化掉，这可能导致代码不按预想地方式运行
				6、赋值符号：=的优先级非常低，所以在使用赋值表达式的时候应该明确的使用括号
				7、使用未定义变量不会产生任何语法错误
			自定义变量的使用案例
				优化排名语句
					1、在给一个变量赋值的同时使用这个变量
						select actor_id,@rownum:=@rownum+1 as rownum from actor limit 10;
					2、查询获取演过最多电影的前10名演员，然后根据出演电影次数做一个排名
						select actor_id,count(*) as cnt from film_actor group by actor_id order by cnt desc limit 10;
				避免重新查询刚刚更新的数据
					当需要高效的更新一条记录的时间戳，同时希望查询当前记录中存放的时间戳是什么
						update t1 set  lastUpdated=now() where id =1;
select lastUpdated from t1 where id =1;
						update t1 set lastupdated = now() where id = 1 and @now:=now();
select @now;
				确定取值的顺序
					在赋值和读取变量的时候可能是在查询的不同阶段
						set @rownum:=0;
select actor_id,@rownum:=@rownum+1 as cnt from actor where @rownum<=1;
因为where和select在查询的不同阶段执行，所以看到查询到两条记录，这不符合预期
						set @rownum:=0;
select actor_id,@rownum:=@rownum+1 as cnt from actor where @rownum<=1 order by first_name
当引入了orde;r by之后，发现打印出了全部结果，这是因为order by引入了文件排序，而where条件是在文件排序操作之前取值的  
						解决这个问题的关键在于让变量的赋值和取值发生在执行查询的同一阶段：
set @rownum:=0;
select actor_id,@rownum as cnt from actor where (@rownum:=@rownum+1)<=1;

分区表
	分区表的应用场景
		表非常大以至于无法全部都放在内存中，或者只在表的最后部分有热点数据，其他均是历史数据
		分区表的数据更容易维护
			批量删除大量数据可以使用清除整个分区的方式
			对一个独立分区进行优化、检查、修复等操作
		分区表的数据可以分布在不同的物理设备上，从而高效地利用多个硬件设备
		可以使用分区表来避免某些特殊的瓶颈
			innodb的单个索引的互斥访问
			ext3文件系统的inode锁竞争
		可以备份和恢复独立的分区
	分区表的限制
		一个表最多只能有1024个分区，在5.7版本的时候可以支持8196个分区
		在早期的mysql中，分区表达式必须是整数或者是返回整数的表达式，在mysql5.5中，某些场景可以直接使用列来进行分区
		如果分区字段中有主键或者唯一索引的列，那么所有主键列和唯一索引列都必须包含进来
		分区表无法使用外键约束
	分区表的原理
		分区表的底层原理.md
	分区表的类型
		范围分区
			根据列值在给定范围内将行分配给分区
				范围分区.md
		列表分区
			类似于按range分区，区别在于list分区是基于列值匹配一个离散值集合中的某个值来进行选择
		列分区
			mysql从5.5开始支持column分区，可以认为i是range和list的升级版，在5.5之后，可以使用column分区替代range和list，但是column分区只接受普通列不接受表达式
		hash分区
			基于用户定义的表达式的返回值来进行选择的分区，该表达式使用将要插入到表中的这些行的列值进行计算。这个函数可以包含myql中有效的、产生非负整数值的任何表达式
		key分区
			类似于hash分区，区别在于key分区只支持一列或多列，且mysql服务器提供其自身的哈希函数，必须有一列或多列包含整数值
		子分区
			在分区的基础之上，再进行分区后存储
	如何使用分区表
		全量扫描数据，不要任何索引
		索引数据，并分离热点
	在使用分区表的时候需要注意的问题
		null值会使分区过滤无效
		分区列和索引列不匹配，会导致查询无法进行分区过滤
		选择分区的成本可能很高
		打开并锁住所有底层表的成本可能很高
		维护分区的成本可能很高

服务器参数设置
	general
		datadir=/var/lib/mysql
			数据文件存放的目录
		socket=/var/lib/mysql/mysql.sock
			mysql.socket表示server和client在同一台服务器，并且使用localhost进行连接，就会使用socket进行连接
		pid_file=/var/lib/mysql/mysql.pid
			存储mysql的pid
		port=3306
			mysql服务的端口号
		default_storage_engine=InnoDB
			mysql存储引擎
		skip-grant-tables
			当忘记mysql的用户名密码的时候，可以在mysql配置文件中配置该参数，跳过权限表验证，不需要密码即可登录mysql
	character
		character_set_client
			客户端数据的字符集
		character_set_connection
			mysql处理客户端发来的信息时，会把这些数据转换成连接的字符集格式
		character_set_results
			mysql发送给客户端的结果集所用的字符集
		character_set_database
			数据库默认的字符集
		character_set_server
			mysql server的默认字符集
	connection
		max_connections
			mysql的最大连接数，如果数据库的并发连接请求比较大，应该调高该值
		max_user_connections
			限制每个用户的连接个数
		back_log
			mysql能够暂存的连接数量，当mysql的线程在一个很短时间内得到非常多的连接请求时，就会起作用，如果mysql的连接数量达到max_connections时，新的请求会被存储在堆栈中，以等待某一个连接释放资源，如果等待连接的数量超过back_log,则不再接受连接资源
		wait_timeout
			mysql在关闭一个非交互的连接之前需要等待的时长
		interactive_timeout
			关闭一个交互连接之前需要等待的秒数
	log
		log_error
			指定错误日志文件名称，用于记录当mysqld启动和停止时，以及服务器在运行中发生任何严重错误时的相关信息
		log_bin
			指定二进制日志文件名称，用于记录对数据造成更改的所有查询语句
		binlog_do_db
			指定将更新记录到二进制日志的数据库，其他所有没有显式指定的数据库更新将忽略，不记录在日志中
		binlog_ignore_db
			指定不将更新记录到二进制日志的数据库
		sync_binlog
			指定多少次写日志后同步磁盘
		general_log
			是否开启查询日志记录
		general_log_file
			指定查询日志文件名，用于记录所有的查询语句
		slow_query_log
			是否开启慢查询日志记录
		slow_query_log_file
			指定慢查询日志文件名称，用于记录耗时比较长的查询语句
		long_query_time
			设置慢查询的时间，超过这个时间的查询语句才会记录日志
		log_slow_admin_statements
			是否将管理语句写入慢查询日志
	cache
		key_buffer_size
			索引缓存区的大小（只对myisam表起作用）
		query cache
			query_cache_size
				查询缓存的大小，未来版本被删除
					show status like '%Qcache%';查看缓存的相关属性
					Qcache_free_blocks：缓存中相邻内存块的个数，如果值比较大，那么查询缓存中碎片比较多
					Qcache_free_memory：查询缓存中剩余的内存大小
					Qcache_hits：表示有多少此命中缓存
					Qcache_inserts：表示多少次未命中而插入
					Qcache_lowmen_prunes：多少条query因为内存不足而被移除cache
					Qcache_queries_in_cache：当前cache中缓存的query数量
					Qcache_total_blocks：当前cache中block的数量
			query_cache_limit
				超出此大小的查询将不被缓存
			query_cache_min_res_unit
				缓存块最小大小
			query_cache_type
				缓存类型，决定缓存什么样的查询
					0表示禁用
					1表示将缓存所有结果，除非sql语句中使用sql_no_cache禁用查询缓存
					2表示只缓存select语句中通过sql_cache指定需要缓存的查询
		sort_buffer_size
			每个需要排序的线程分派该大小的缓冲区
		max_allowed_packet=32M
			限制server接受的数据包大小
		join_buffer_size=2M
			表示关联缓存的大小
		thread_cache_size
			Threads_cached：代表当前此时此刻线程缓存中有多少空闲线程
			Threads_connected：代表当前已建立连接的数量
			Threads_created：代表最近一次服务启动，已创建现成的数量，如果该值比较大，那么服务器会一直再创建线程
			Threads_running：代表当前激活的线程数
	INNODB
		innodb_buffer_pool_size=
			该参数指定大小的内存来缓冲数据和索引，最大可以设置为物理内存的80%
		innodb_flush_log_at_trx_commit
			主要控制innodb将log buffer中的数据写入日志文件并flush磁盘的时间点，值分别为0，1，2
		innodb_thread_concurrency
			设置innodb线程的并发数，默认为0表示不受限制，如果要设置建议跟服务器的cpu核心数一致或者是cpu核心数的两倍
		innodb_log_buffer_size
			此参数确定日志文件所用的内存大小，以M为单位
		innodb_log_file_size
			此参数确定数据日志文件的大小，以M为单位
		innodb_log_files_in_group
			以循环方式将日志文件写到多个文件中
		read_buffer_size
			mysql读入缓冲区大小，对表进行顺序扫描的请求将分配到一个读入缓冲区
		read_rnd_buffer_size
			mysql随机读的缓冲区大小
		innodb_file_per_table
			此参数确定为每张表分配一个新的文件