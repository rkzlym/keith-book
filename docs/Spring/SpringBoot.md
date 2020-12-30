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