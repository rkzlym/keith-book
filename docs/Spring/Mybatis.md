# Mybatis

## Mybatis缓存

一级缓存：在同一个SqlSession中，执行相同的查询sql会从缓存中取，执行增删改后失效。

二级缓存：在同一个Namespace中，查询sql会先从二级缓存中找，没找到再去查询数据库。