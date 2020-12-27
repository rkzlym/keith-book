# Spring Boot

```java
@Configuration(proxyBeanMethods = false)
proxyBeanMethods: true表示该配置类被代理，false表示该配置类不被代理
代理类中返回Bean是单例的，普通类中返回的Bean不是单例的
```

```java
@ImportResource("classpath:beans.xml")	// 导入资源文件
```

## 配置绑定

> 只有在容器中的组件，才能使用 @ConfigurationProperties

使用配置绑定读取配置文件 `application.properties` 中的属性有以下2种方式

```properties
user.nickname=张三
user.age=18
```

**@ConfigurationProperties + @Component**

```java
@Data
@Component
@ConfigurationProperties(prefix = "user")
public class User {
    private String nickname;

    private Integer age;
}
```

**@ConfigurationProperties + @EnableConfigurationProperties(User.class)**

```java
@Data
@ConfigurationProperties(prefix = "user")
public class User {
    private String nickname;

    private Integer age;
}
```

```java
@Configuration
@EnableConfigurationProperties(User.class)
public class SpringConfig {

}
```

## 自动配置原理

自动包规则原理：

```java
// 导入Registrar类
@Import(AutoConfigurationPackages.Registrar.class)
// 获取到标注类上的包名，将包名下的所有组件注册进容器
register(registry, new PackageImports(metadata).getPackageNames().toArray(new String[0]));
```

