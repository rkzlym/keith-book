# Mybatis

## Mybatis 缓存

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

## Mybatis 多数据源配置

```properties
dub.datasource.oracle.driver-class-name=oracle.jdbc.driver.OracleDriver
dub.datasource.oracle.url=jdbc:oracle:thin:@127.0.0.1:1521:test
dub.datasource.oracle.username=root
dub.datasource.oracle.password=root

dub.datasource.mysql.driver-class-name=com.mysql.jdbc.Driver
dub.datasource.mysql.url=jdbc:mysql://127.0.0.1:3306/test?characterEncoding=utf-8&useSSL=false
dub.datasource.mysql.username=root
dub.datasource.mysql.password=root
```

```java
@Configuration
@MapperScan(basePackages ="com.smartebao.dub.export.declare.common.mapper.oracle", sqlSessionTemplateRef  = "oracleSqlSessionTemplate")
public class DubOracleDataSourceConfig {

    @Primary
    @Bean("oracleSqlSessionFactory")
    public SqlSessionFactory ds1SqlSessionFactory(@Qualifier("oracleDataSource") DataSource dataSource) throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(dataSource);
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
        configuration.setJdbcTypeForNull(JdbcType.NULL);
        sqlSessionFactory.setConfiguration(configuration);
        sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().
                getResources("classpath*:com/smartbao/dub/export/declare/common/mapper/oracle/**"));
        sqlSessionFactory.setGlobalConfig(new GlobalConfig().setBanner(false));
        return sqlSessionFactory.getObject();
    }

    @Primary
    @Bean(name = "oracleTransactionManager")
    public DataSourceTransactionManager ds1TransactionManager(@Qualifier("oracleDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Primary
    @Bean(name = "oracleSqlSessionTemplate")
    public SqlSessionTemplate ds1SqlSessionTemplate(@Qualifier("oracleSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

```java
@Configuration
@MapperScan(basePackages ="com.smartebao.dub.export.declare.common.mapper.mysql", sqlSessionTemplateRef  = "mysqlSqlSessionTemplate")
public class DubMysqlDataSourceConfig {

    @Bean("mysqlSqlSessionFactory")
    public SqlSessionFactory ds1SqlSessionFactory(@Qualifier("mysqlDataSource") DataSource dataSource) throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(dataSource);
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
        configuration.setJdbcTypeForNull(JdbcType.NULL);
        sqlSessionFactory.setConfiguration(configuration);
        sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().
                getResources("classpath*:com/smartbao/dub/export/declare/common/mapper/mysql/**"));
        sqlSessionFactory.setGlobalConfig(new GlobalConfig().setBanner(false));
        return sqlSessionFactory.getObject();
    }

    @Bean(name = "mysqlTransactionManager")
    public DataSourceTransactionManager ds1TransactionManager(@Qualifier("mysqlDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Bean(name = "mysqlSqlSessionTemplate")
    public SqlSessionTemplate ds1SqlSessionTemplate(@Qualifier("mysqlSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

```java
@Configuration
@MapperScan(basePackages ="com.smartebao.dub.export.declare.common.mapper.oracle", sqlSessionTemplateRef  = "oracleSqlSessionTemplate")
public class DubOracleDataSourceConfig {

    @Primary
    @Bean("oracleSqlSessionFactory")
    public SqlSessionFactory ds1SqlSessionFactory(@Qualifier("oracleDataSource") DataSource dataSource) throws Exception {
        MybatisSqlSessionFactoryBean sqlSessionFactory = new MybatisSqlSessionFactoryBean();
        sqlSessionFactory.setDataSource(dataSource);
        MybatisConfiguration configuration = new MybatisConfiguration();
        configuration.setDefaultScriptingLanguage(MybatisXMLLanguageDriver.class);
        configuration.setJdbcTypeForNull(JdbcType.NULL);
        sqlSessionFactory.setConfiguration(configuration);
        sqlSessionFactory.setMapperLocations(new PathMatchingResourcePatternResolver().
                getResources("classpath*:com/smartbao/dub/export/declare/common/mapper/oracle/**"));
        sqlSessionFactory.setGlobalConfig(new GlobalConfig().setBanner(false));
        return sqlSessionFactory.getObject();
    }

    @Primary
    @Bean(name = "oracleTransactionManager")
    public DataSourceTransactionManager ds1TransactionManager(@Qualifier("oracleDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    @Primary
    @Bean(name = "oracleSqlSessionTemplate")
    public SqlSessionTemplate ds1SqlSessionTemplate(@Qualifier("oracleSqlSessionFactory") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
```

