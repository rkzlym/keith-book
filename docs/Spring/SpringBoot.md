# Spring Boot

## Spring Boot 使用

### 静态资源访问

#### 1. 静态资源目录

只要项目的静态资源放在类路径下以下目录，就可以正常访问

```properties
/static 
/public 
/resources 
/META-INF/resources
```

#### 2. 静态资源访问

默认是当前项目的根路径 + 静态资源名

收到请求时，SpringBoot会先找Controller是否能处理，不能处理的所有请求再交给静态资源处理器

#### 3. 静态资源配置

配置访问前缀

```properties
spring.mvc.static-path-pattern=/static
```

配置访问路径：配置完访问路径后默认访问路径失效

```properties
spring.web.resources.static-locations=classpath:/my
```

## Spring Boot 热更新

1. 引入依赖 `spring-boot-devtools`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

2. 修改完之后按 `Ctrl + F9` 更新项目

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

**自动配置提示**

引入 `spring-boot-configuration-processor`

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-configuration-processor</artifactId>
    <optional>true</optional>
</dependency>
```

在SpringBoot打包时排除该依赖

```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-maven-plugin</artifactId>
            <configuration>
                <excludes>
                    <exclude>
                        <groupId>org.springframework.boot</groupId>
                        <artifactId>spring-boot-configuration-processor</artifactId>
                    </exclude>
                </excludes>
            </configuration>
        </plugin>
    </plugins>
</build>
```

重启项目 在配置文件中键入自定义配置类的配置 产生提示

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228222953379.png)

## 自动配置原理

### 流程图

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122821461787.png)

### 自动包规则原理 

AutoConfigurationPackages.Registrar

```java
// 导入 Registrar 注解路径
@SpringBootApplication
@EnableAutoConfiguration
@AutoConfigurationPackage
@Import(AutoConfigurationPackages.Registrar.class)
```

```java
// 获取到标注类上的包名，将包名下的所有组件注册进容器
register(registry, new PackageImports(metadata).getPackageNames().toArray(new String[0]));
```

### 自动配置原理

@Import(AutoConfigurationImportSelector.class)

```java
// 导入 AutoConfigurationImportSelector 注解路径
@SpringBootApplication
@EnableAutoConfiguration
@Import(AutoConfigurationImportSelector.class)
```

```java
// 获取自动配置的入口
getAutoConfigurationEntry(annotationMetadata);
// 获取所有候选的配置    
List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
// META-INF/spring.factories里面写了SpringBoot一启动就需加载的所有配置类
Enumeration<URL> urls = classLoader.getResources(FACTORIES_RESOURCE_LOCATION);
```

### 按需开启配置项

```
SpringBoot使用spring.factories导入了所有场景启动器
但是由于@Conditional会按需将相应的场景启动器加载到容器中
```

以DispatcherServlet为例

```java
@AutoConfigureOrder(Ordered.HIGHEST_PRECEDENCE)
@Configuration(proxyBeanMethods = false)
// 在Servlet的Web模块才生效
@ConditionalOnWebApplication(type = Type.SERVLET)
// 容器中拥有DispatcherServlet这个类才生效
@ConditionalOnClass(DispatcherServlet.class)
// 在 ServletWebServerFactoryAutoConfiguration 后配置
@AutoConfigureAfter(ServletWebServerFactoryAutoConfiguration.class)
public class DispatcherServletAutoConfiguration{
	@Configuration(proxyBeanMethods = false)
    // 匹配自定义规则
	@Conditional(DefaultDispatcherServletCondition.class)
	@ConditionalOnClass(ServletRegistration.class)
	@EnableConfigurationProperties(WebMvcProperties.class)
    protected static class DispatcherServletConfiguration {
        @Bean(name = DEFAULT_DISPATCHER_SERVLET_BEAN_NAME)
        public DispatcherServlet dispatcherServlet(WebMvcProperties webMvcProperties) {
            DispatcherServlet dispatcherServlet = new DispatcherServlet();
            dispatcherServlet.setDispatchOptionsRequest(webMvcProperties.isDispatchOptionsRequest());
            dispatcherServlet.setDispatchTraceRequest(webMvcProperties.isDispatchTraceRequest());
            dispatcherServlet.setThrowExceptionIfNoHandlerFound(webMvcProperties.isThrowExceptionIfNoHandlerFound());
            dispatcherServlet.setPublishEvents(webMvcProperties.isPublishRequestHandledEvents());
            dispatcherServlet.setEnableLoggingRequestDetails(webMvcProperties.isLogRequestDetails());
            return dispatcherServlet;
        }
    }
}

```

### 定制化配置

- 修改配置文件为自定义的值
- 使用@Bean去替换底层的组件
- 使用自定义器XxxCustomizer

## 指标监控

> Spring Boot Ac0tuator

### 监控规则

引入依赖

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

访问 `域名/actuator/health` 可以查看服务的健康信息

访问规则： `域名/actuator/*`

| `auditevents`      | Exposes audit events information for the current application. Requires an `AuditEventRepository` bean. |
| ------------------ | ------------------------------------------------------------ |
| `beans`            | Displays a complete list of all the Spring beans in your application. |
| `caches`           | Exposes available caches.                                    |
| `conditions`       | Shows the conditions that were evaluated on configuration and auto-configuration classes and the reasons why they did or did not match. |
| `configprops`      | Displays a collated list of all `@ConfigurationProperties`.  |
| `env`              | Exposes properties from Spring’s `ConfigurableEnvironment`.  |
| `flyway`           | Shows any Flyway database migrations that have been applied. Requires one or more `Flyway` beans. |
| `health`           | Shows application health information.                        |
| `httptrace`        | Displays HTTP trace information (by default, the last 100 HTTP request-response exchanges). Requires an `HttpTraceRepository` bean. |
| `info`             | Displays arbitrary application info.                         |
| `integrationgraph` | Shows the Spring Integration graph. Requires a dependency on `spring-integration-core`. |
| `loggers`          | Shows and modifies the configuration of loggers in the application. |
| `liquibase`        | Shows any Liquibase database migrations that have been applied. Requires one or more `Liquibase` beans. |
| `metrics`          | Shows ‘metrics’ information for the current application.     |
| `mappings`         | Displays a collated list of all `@RequestMapping` paths.     |
| `scheduledtasks`   | Displays the scheduled tasks in your application.            |
| `sessions`         | Allows retrieval and deletion of user sessions from a Spring Session-backed session store. Requires a Servlet-based web application using Spring Session. |
| `shutdown`         | Lets the application be gracefully shutdown. Disabled by default. |
| `startup`          | Shows the startup steps data collected by the `ApplicationStartup`. Requires the `SpringApplication` to be configured with a `BufferingApplicationStartup`. |
| `threaddump`       | Performs a thread dump.                                      |

### 开启Web端配置

SpringBoot默认不开启Web端的所有Endpoint，配置开启

```properties
management.endpoints.web.exposure.include=*
```

配置health端点展示详细数据

```properties
management.endpoint.health.show-details=always
```

配置info的信息

```properties
info.appName=my-project
info.version=1.0.0
info.mavenProjectName=@project.artifactId@
```

### 定制Endpoint

```java
@Component
public class MyHealthIndicator extends AbstractHealthIndicator {

    @Override
    protected void doHealthCheck(Health.Builder builder) throws Exception {
        Map<String, Object> map = new HashMap<>();
        map.put("count", 1);
        map.put("ms", 30);
        builder.status(Status.DOWN)
                .withDetail("code", 100)
                .withDetails(map);
    }
}
```

访问health后就有定制

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201231201651587.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### Spring Boot Admin

#### Spring Boot Admin Server

新建一个SpringBoot项目 加入依赖

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-server</artifactId>
    <version>2.3.1</version>
</dependency>
```

在启动类注解上增加 `@EnableAdminServer`

```java
@EnableAdminServer
@SpringBootApplication
public class MyBootAdminServerApplication {
    public static void main(String[] args) {
        SpringApplication.run(MyBootAdminServerApplication.class, args);
    }
}
```

修改端口为7000

```properties
server.port=7000
```

#### Spring Boot Admin Client

增加依赖

```xml
<dependency>
    <groupId>de.codecentric</groupId>
    <artifactId>spring-boot-admin-starter-client</artifactId>
    <version>2.3.1</version>
</dependency>
```

修改配置文件使其指向 `Spring Boot Admin Server` 的地址

```properties
spring.application.name=my-demo-app
spring.boot.admin.client.url=http://127.0.0.1:7000
spring.boot.admin.client.instance.prefer-ip=true
```

#### 启动项目测试

输入地址 http://127.0.0.1:7000

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201231210122929.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)