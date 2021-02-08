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

## Spring Boot 启动源码解析

### 总体概览

```java
//创建一个新的实例，这个应用程序的上下文将要从指定的来源加载Bean
public SpringApplication(ResourceLoader resourceLoader, Class<?>... primarySources) {
    // 资源初始化资源加载器，默认为null
	this.resourceLoader = resourceLoader;
    // 断言主要加载资源类不能为 null，否则报错
	Assert.notNull(primarySources, "PrimarySources must not be null");
    // 初始化主要加载资源类集合并去重
	this.primarySources = new LinkedHashSet<>(Arrays.asList(primarySources));
    // 推断当前 WEB 应用类型，一共有三种：NONE,SERVLET,REACTIVE
	this.webApplicationType = WebApplicationType.deduceFromClasspath();
    // 设置应用上线文初始化器
    // 从"META-INF/spring.factories"读取ApplicationContextInitializer类的实例名称集合并去重，并使用set去重（一共7个）
	setInitializers((Collection) getSpringFactoriesInstances(ApplicationContextInitializer.class));
    // 设置监听器
    // 从"META-INF/spring.factories"读取ApplicationListener类的实例名称集合并去重，并使用set去重（一共11个）
	setListeners((Collection) getSpringFactoriesInstances(ApplicationListener.class));
    // 推断主入口应用类，通过当前调用栈，获取Main方法所在类，并赋值给mainApplicationClass
	this.mainApplicationClass = deduceMainApplicationClass();
}
```

```java
public ConfigurableApplicationContext run(String... args) {
    // 创建并启动计时监控类
	StopWatch stopWatch = new StopWatch();
	stopWatch.start();
    // 初始化应用上下文和异常报告集合
	ConfigurableApplicationContext context = null;
	Collection<SpringBootExceptionReporter> exceptionReporters = new ArrayList<>();
    // 设置系统属性“java.awt.headless”的值，默认为true，用于运行headless服务器，进行简单的图像处理
    // 多用于在缺少显示屏、键盘或者鼠标时的系统配置，很多监控工具如jconsole 需要将该值设置为true
	configureHeadlessProperty();
    // 1.创建所有spring运行监听器并发布应用启动事件
    // 获取SpringApplicationRunListener类型的实例EventPublishingRunListener
    // 并封装进SpringApplicationRunListeners，然后返回SpringApplicationRunListeners
    // 说的简单点，getRunListeners就是准备好了运行时监听器EventPublishingRunListener。
	SpringApplicationRunListeners listeners = getRunListeners(args);
	listeners.starting();
	try {
        // 初始化默认应用参数类
		ApplicationArguments applicationArguments = new DefaultApplicationArguments(args);
        // 2.根据运行监听器和应用参数来准备spring环境
		ConfigurableEnvironment environment = prepareEnvironment(listeners, applicationArguments);
        // 将要忽略的bean的参数打开
		configureIgnoreBeanInfo(environment);
        // 创建banner打印类
		Banner printedBanner = printBanner(environment);
        // 3.创建应用上下文，可以理解为创建一个容器
		context = createApplicationContext();
        // 准备异常报告器，用来支持报告关于启动的错误
		exceptionReporters = getSpringFactoriesInstances(SpringBootExceptionReporter.class,
					new Class[] { ConfigurableApplicationContext.class }, context);
        // 4.准备应用上下文，将启动类注入容器，为后续开启自动化提供基础
		prepareContext(context, environment, listeners, applicationArguments, printedBanner);
        // 5.刷新应用上下文
		refreshContext(context);
        // 应用上下文刷新后置处理，做一些扩展功能
		afterRefresh(context, applicationArguments);
        // 停止计时监控类
		stopWatch.stop();
        // 输出日志记录执行主类名、时间信息
		if (this.logStartupInfo) {
				new StartupInfoLogger(this.mainApplicationClass).logStarted(getApplicationLog(), stopWatch);
		}
        // 发布应用上下文启动监听事件
		listeners.started(context);
        // 执行所有的Runner运行器
		callRunners(context, applicationArguments);
	}catch (Throwable ex) {
		handleRunFailure(context, ex, exceptionReporters, listeners);
		throw new IllegalStateException(ex);
	}
	try {
        // 发布应用上下文就绪事件
		listeners.running(context);
	}catch (Throwable ex) {
		handleRunFailure(context, ex, exceptionReporters, null);
		throw new IllegalStateException(ex);
	}
    // 返回应用上下文
	return context;
}
```

### 1.创建所有spring运行监听器并发布应用启动事件

```java
SpringApplicationRunListeners listeners = getRunListeners(args);
listeners.starting();
```

```java
/* --- SpringApplicationRunListeners listeners = getRunListeners(args) --- */
// 创建 Spring 监听器
private SpringApplicationRunListeners getRunListeners(String[] args) {
	Class<?>[] types = new Class<?>[] { SpringApplication.class, String[].class };
	return new SpringApplicationRunListeners(logger,
				getSpringFactoriesInstances(SpringApplicationRunListener.class, types, this, args));
}

// SpringApplicationRunListeners 构造方法，将日志和监听器们初始化
SpringApplicationRunListeners(Log log, Collection<? extends SpringApplicationRunListener> listeners) {
	this.log = log;
	this.listeners = new ArrayList<>(listeners);
}

/* --- listeners.starting() --- */
void starting() {
    //循环遍历获取监听器
	for (SpringApplicationRunListener listener : this.listeners) {
		listener.starting();
	}
}

// 此处的监听器可以看出是事件发布监听器，主要用来发布启动事件
@Override
public void starting() {
    //这里是创建application事件 'applicationStartingEvent'
	this.initialMulticaster.multicastEvent(new ApplicationStartingEvent(this.application, this.args));
}

// applicationStartingEvent是springboot框架最早执行的监听器，
// 在该监听器执行started方法时，会继续发布事件，主要是基于spring的事件机制
@Override
public void multicastEvent(final ApplicationEvent event, @Nullable ResolvableType eventType) {
    ResolvableType type = (eventType != null ? eventType : resolveDefaultEventType(event));
    //获取线程池，如果为空则同步处理。这里线程池为空，还未初始化
    Executor executor = getTaskExecutor();
    for (ApplicationListener<?> listener : getApplicationListeners(event, type)) {
        if (executor != null) {
            // 异步发送事件
            executor.execute(() -> invokeListener(listener, event));
        }
        else {
            // 同步发送事件
            invokeListener(listener, event);
        }
    }
}
```

### 2.根据运行监听器和应用参数来准备spring环境

```java
ConfigurableEnvironment environment = prepareEnvironment(listeners, applicationArguments);
```

```java
private ConfigurableEnvironment prepareEnvironment(SpringApplicationRunListeners listeners,
	ApplicationArguments applicationArguments) {
	// 获取或者创建应用环境
	ConfigurableEnvironment environment = getOrCreateEnvironment();
    // 配置应用环境，配置propertySource和activeProfiles
	configureEnvironment(environment, applicationArguments.getSourceArgs());
    // listeners环境准备，广播ApplicationEnvironmentPreparedEvent
	ConfigurationPropertySources.attach(environment);
	listeners.environmentPrepared(environment);
    // 将环境绑定给当前应用程序
	bindToSpringApplication(environment);
    // 对当前的环境类型进行判断，如果不一致进行转换
	if (!this.isCustomEnvironment) {
		environment = new EnvironmentConverter(getClassLoader()).convertEnvironmentIfNecessary(environment,
					deduceEnvironmentClass());
	}
    // 配置propertySource对它自己的递归依赖
	ConfigurationPropertySources.attach(environment);
	return environment;
}

// 获取或者创建应用环境，根据应用程序的类型可以分为servlet环境、标准环境(特殊的非web环境)和响应式环境
private ConfigurableEnvironment getOrCreateEnvironment() {
    //存在则直接返回
    if (this.environment != null) {
        return this.environment;
    }
    //根据webApplicationType创建对应的Environment
    switch (this.webApplicationType) {
        case SERVLET:
            return new StandardServletEnvironment();
        case REACTIVE:
            return new StandardReactiveWebEnvironment();
        default:
            return new StandardEnvironment();
    }
}

//配置应用环境
protected void configureEnvironment(ConfigurableEnvironment environment, String[] args) {
	if (this.addConversionService) {
		ConversionService conversionService = ApplicationConversionService.getSharedInstance();
		environment.setConversionService((ConfigurableConversionService) conversionService);
	}
    //配置property sources
	configurePropertySources(environment, args);
    //配置profiles
	configureProfiles(environment, args);
}
```

### 3.创建应用上下文，可以理解为创建一个容器

```java
context = createApplicationContext();
```

```java
protected ConfigurableApplicationContext createApplicationContext() {
    Class<?> contextClass = this.applicationContextClass;
    if (contextClass == null) {
        try {
            // 根据不同的应用类型初始化不同的上下文应用类
            switch (this.webApplicationType) {
                case SERVLET:
                    contextClass = Class.forName(DEFAULT_SERVLET_WEB_CONTEXT_CLASS);
                    break;
                case REACTIVE:
                    contextClass = Class.forName(DEFAULT_REACTIVE_WEB_CONTEXT_CLASS);
                    break;
                default:
                    contextClass = Class.forName(DEFAULT_CONTEXT_CLASS);
            }
        }
        catch (ClassNotFoundException ex) {
            throw new IllegalStateException(
                "Unable create a default ApplicationContext, please specify an ApplicationContextClass", ex);
        }
    }
    return (ConfigurableApplicationContext) BeanUtils.instantiateClass(contextClass);
}
```

### 4.准备应用上下文，将启动类注入容器，为后续开启自动化提供基础

```java
prepareContext(context, environment, listeners, applicationArguments, printedBanner);
```

```java
private void prepareContext(ConfigurableApplicationContext context, ConfigurableEnvironment environment,
			SpringApplicationRunListeners listeners, ApplicationArguments applicationArguments, Banner printedBanner) {
    // 应用上下文的environment
    context.setEnvironment(environment);
    // 应用上下文后处理
    postProcessApplicationContext(context);
    // 为上下文应用所有初始化器，执行容器中的applicationContextInitializer(spring.factories的实例)
    // 将所有的初始化对象放置到context对象中
    applyInitializers(context);
    // 触发所有SpringApplicationRunListener监听器的ContextPrepared事件方法。添加所有的事件监听器
    listeners.contextPrepared(context);
    // 记录启动日志
    if (this.logStartupInfo) {
        logStartupInfo(context.getParent() == null);
        logStartupProfileInfo(context);
    }
    // 注册启动参数bean，将容器指定的参数封装成bean，注入容器
    ConfigurableListableBeanFactory beanFactory = context.getBeanFactory();
    beanFactory.registerSingleton("springApplicationArguments", applicationArguments);
    // 设置banner
    if (printedBanner != null) {
        beanFactory.registerSingleton("springBootBanner", printedBanner);
    }
    if (beanFactory instanceof DefaultListableBeanFactory) {
        ((DefaultListableBeanFactory) beanFactory)
        .setAllowBeanDefinitionOverriding(this.allowBeanDefinitionOverriding);
    }
    if (this.lazyInitialization) {
        context.addBeanFactoryPostProcessor(new LazyInitializationBeanFactoryPostProcessor());
    }
    // 加载所有资源，指的是启动器指定的参数
    Set<Object> sources = getAllSources();
    Assert.notEmpty(sources, "Sources must not be empty");
    // 将bean加载到上下文中
    load(context, sources.toArray(new Object[0]));
    // 触发所有springapplicationRunListener监听器的contextLoaded事件方法，
    listeners.contextLoaded(context);
}

// 这里没有做任何的处理过程，因为beanNameGenerator和resourceLoader默认为空，可以方便后续做扩展处理
protected void postProcessApplicationContext(ConfigurableApplicationContext context) {
    if (this.beanNameGenerator != null) {
        context.getBeanFactory().registerSingleton(AnnotationConfigUtils.CONFIGURATION_BEAN_NAME_GENERATOR,
                                                   this.beanNameGenerator);
    }
    if (this.resourceLoader != null) {
        if (context instanceof GenericApplicationContext) {
            ((GenericApplicationContext) context).setResourceLoader(this.resourceLoader);
        }
        if (context instanceof DefaultResourceLoader) {
            ((DefaultResourceLoader) context).setClassLoader(this.resourceLoader.getClassLoader());
        }
    }
    if (this.addConversionService) {
        context.getBeanFactory().setConversionService(ApplicationConversionService.getSharedInstance());
    }
}

// 将启动器类加载到spring容器中，为后续的自动化配置奠定基础，之前看到的很多注解也与此相关
protected void load(ApplicationContext context, Object[] sources) {
    if (logger.isDebugEnabled()) {
        logger.debug("Loading source " + StringUtils.arrayToCommaDelimitedString(sources));
    }
    BeanDefinitionLoader loader = createBeanDefinitionLoader(getBeanDefinitionRegistry(context), sources);
    if (this.beanNameGenerator != null) {
        loader.setBeanNameGenerator(this.beanNameGenerator);
    }
    if (this.resourceLoader != null) {
        loader.setResourceLoader(this.resourceLoader);
    }
    if (this.environment != null) {
        loader.setEnvironment(this.environment);
    }
    loader.load();
}

// springboot会优先选择groovy加载方式，找不到在选择java方式
private int load(Class<?> source) {
    if (isGroovyPresent() && GroovyBeanDefinitionSource.class.isAssignableFrom(source)) {
        // Any GroovyLoaders added in beans{} DSL can contribute beans here
        GroovyBeanDefinitionSource loader = BeanUtils.instantiateClass(source, GroovyBeanDefinitionSource.class);
        load(loader);
    }
    if (isComponent(source)) {
        this.annotatedReader.register(source);
        return 1;
    }
    return 0;
}
```

### 5.刷新应用上下文

```java
refreshContext(context);
```

```java
private void refreshContext(ConfigurableApplicationContext context) {
    refresh(context);
    if (this.registerShutdownHook) {
        try {
            context.registerShutdownHook();
        }
        catch (AccessControlException ex) {
            // Not allowed in some environments.
        }
    }
}

public void refresh() throws BeansException, IllegalStateException {
    synchronized (this.startupShutdownMonitor) {
        // 刷新上下文环境，初始化上下文环境，对系统的环境变量或者系统属性进行准备和校验
        prepareRefresh();

        // 初始化beanfactory，解析xml，相当于之前的xmlBeanfactory操作
        ConfigurableListableBeanFactory beanFactory = obtainFreshBeanFactory();

        // 为上下文准备beanfactory，对beanFactory的各种功能进行填充，
        // 如@autowired，设置spel表达式解析器，设置编辑注册器，添加applicationContextAwareProcessor处理器等等
        prepareBeanFactory(beanFactory);

        try {
            // 提供子类覆盖的额外处理，即子类处理自定义的beanfactorypostProcess
            postProcessBeanFactory(beanFactory);

            // 激活各种beanfactory处理器
            invokeBeanFactoryPostProcessors(beanFactory);

            // 注册拦截bean创建的bean处理器，即注册beanPostProcessor
            registerBeanPostProcessors(beanFactory);

            // 初始化上下文中的资源文件如国际化文件的处理
            initMessageSource();

            // 初始化上下文事件广播器
            initApplicationEventMulticaster();

            // 给子类扩展初始化其他bean
            onRefresh();

            // 在所有的bean中查找listener bean,然后 注册到广播器中
            registerListeners();

            // 初始化剩余的非懒惰的bean，即初始化非延迟加载的bean
            finishBeanFactoryInitialization(beanFactory);

            // 发完成刷新过程，通知声明周期处理器刷新过程，同时发出ContextRefreshEvent通知别人
            finishRefresh();
        }

        catch (BeansException ex) {
            if (logger.isWarnEnabled()) {
                logger.warn("Exception encountered during context initialization - " +
                            "cancelling refresh attempt: " + ex);
            }

            // Destroy already created singletons to avoid dangling resources.
            destroyBeans();

            // Reset 'active' flag.
            cancelRefresh(ex);

            // Propagate exception to caller.
            throw ex;
        }

        finally {
            // Reset common introspection caches in Spring's core, since we
            // might not ever need metadata for singleton beans anymore...
            resetCommonCaches();
        }
    }
}
```

## Spring Boot 自动配置原理

> 以自动配置 Eureka Client 为例

spring boot项目引入eureka-client依赖，并注入spring 容器。

在spring-boot项目中pom文件里面添加的依赖中的bean。是如何注册到spring-boot项目的spring容器中的呢？spring.factories文件是帮助spring-boot项目包以外的bean（即在pom文件中添加依赖中的bean）注册到spring-boot项目的spring容器的。

由于@ComponentScan注解只能扫描spring-boot项目包内的bean并注册到spring容器中，因此需要@EnableAutoConfiguration（在SpringBootApplication下），注解来注册项目包外的bean。而spring.factories文件，则是用来记录项目包外需要注册的bean类名。

点进去@SpringBootApplication注解，发现@EnableAutoConfiguration，点@EnableAutoConfiguration进去。

```java
@Import(AutoConfigurationImportSelector.class)
public @interface EnableAutoConfiguration {
```

AutoConfigurationImportSelector

```java
/**
 * 向spring ioc容器注入bean。返回bean全名。import将bean全名注入。
 **/
@Override
public String[] selectImports(AnnotationMetadata annotationMetadata) {
    if (!isEnabled(annotationMetadata)) {
        return NO_IMPORTS;
    }
    AutoConfigurationMetadata autoConfigurationMetadata = AutoConfigurationMetadataLoader
        .loadMetadata(this.beanClassLoader);
    AutoConfigurationEntry autoConfigurationEntry = getAutoConfigurationEntry(autoConfigurationMetadata,
                                                                              annotationMetadata);
    return StringUtils.toStringArray(autoConfigurationEntry.getConfigurations());
}
```

进入 getAutoConfigurationEntry

```java
List<String> configurations = getCandidateConfigurations(annotationMetadata, attributes);
```

进入 getCandidateConfigurations

```java
List<String> configurations = SpringFactoriesLoader
    .loadFactoryNames(getSpringFactoriesLoaderFactoryClass(),getBeanClassLoader());
```

进入 SpringFactoriesLoader

```java
public static final String FACTORIES_RESOURCE_LOCATION = "META-INF/spring.factories";
```

