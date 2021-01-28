# Mybatis

## Mybatis缓存

一级缓存：在同一个SqlSession中，执行相同的查询sql会从缓存中取，执行增删改后失效。

二级缓存：在同一个Namespace中，查询sql会先从二级缓存中找，没找到再去查询数据库。

## Mybatis 批量删除

```java
int deleteByIds(@Param("ids") List<Long> ids);
```

```xml
<delete id="deleteByIds" parameterType="java.util.List">
    delete from DUB_ORIGIN_ATTACH
    <where>
        id in
        <foreach collection="ids" item="id" separator="," open="(" close=")">
            #{id}
        </foreach>
    </where>
</delete>
```

