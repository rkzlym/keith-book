# Spring

## 1. Spring IOC

### 小知识点

**@Resource @Autowired @Qualifier 的区别**

@Autowired 根据类型注入

@Qualifier 根据名称注入

@Resource 根据名称注入，找不到再根据类型注入

**Filter和Interceptor的区别**

- Filter是基于函数回调的，而Interceptor则是基于Java反射的。
- Filter依赖于Servlet容器，而Interceptor不依赖于Servlet容器。
- Filter对几乎所有的请求起作用，而Interceptor只能对action请求起作用。
- Interceptor可以访问Action的上下文，值栈里的对象，而Filter不能。
- 在action的生命周期里，Interceptor可以被多次调用，而Filter只能在容器初始化时调用一次，

**Filter生命周期方法**

1. init : 服务器启动后创建Filter对象，然后调用init方法，只执行一次
2. doFilter : 每一次请求被拦截资源时，会执行，执行多次
3. destroy : 在服务器关闭后，Filter对象被销毁，若服务器正常关闭会执行destroy方法用于释放资源

配置拦截路径 `@WebFilter("/*")`

**声明式事务和编程式事务**

编程式事务：通过硬编码的形式手动控制事务的提交和回滚。

声明式事务：只需告诉Spring哪个方法是事务方法即可。

**Spring事务异常**

运行时异常：可以不用处理，默认都回滚。

编译时异常：要么try-catch，要么thows，默认不回滚。

**事务传播行为**

REQUIRED: 如当前事务存在，方法将在该事务中运行，否则开一个新事务。

REQUIRED_NEW: 开一个新事务。

SUPPORTS: 如当前事务存在，方法将在该事务中运行，否则不开事务。

NOT_SUPPORTED: 运行在事务中将被挂起。

MANDATORY: 不在事务中运行则抛异常。

NEVER: 在事务中运行则抛异常。

NESTED: 嵌套在事务中运行

### Spring IOC 容器 Bean的创建流程

```
refresh();
finishBeanFactoryInitialization(beanFactory);
beanFactory.preInstantiateSingletons();
getBean(beanName);
doGetBean(name, null, null, false);
```

```java
// 从缓存中检查是否有这个Bean
Object sharedInstance = getSingleton(beanName);
// 如果没有，就实例化一个Bean
if (sharedInstance != null && args == null) {
    bean = getObjectForBeanInstance(sharedInstance, name, beanName, null);
}
else {
    final RootBeanDefinition mbd = getMergedLocalBeanDefinition(beanName);
    // 取得依赖的Bean，即创建当前Bean之前需要提前创建的Bean
    String[] dependsOn = mbd.getDependsOn();
    if (dependsOn != null) {
        for (String dep : dependsOn) {
            registerDependentBean(dep, beanName);
            getBean(dep);
        }
    }
    // 创建Bean实例
    if (mbd.isSingleton()) {
        sharedInstance = getSingleton(beanName, () -> createBean(beanName, mbd, args));
        bean = getObjectForBeanInstance(sharedInstance, name, beanName, mbd);
    }
}
return (T) bean;
```

```java
getSingleton(beanName, () -> createBean(beanName, mbd, args));
```

```java
// 先从Map中拿
Object singletonObject = this.singletonObjects.get(beanName);
// 没有的话再创建
singletonObject = singletonFactory.getObject();
// 加到Map中
addSingleton(beanName, singletonObject);
```

 IOC容器之一：保存单实例Bean

```java
private final Map<String, Object> singletonObjects = new ConcurrentHashMap<>(256);
```

BeanFactory：负责创建bean实例，容器里保存的所有单例Bean其实是一个map

ApplicationContext：BeanFactory的子接口，基于BeanFactory创建的对象之上完成容器的功能实现

### Spring 一个Bean的装配过程

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020121916571615.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### 1.1 概念

Spring 通过一个配置文件描述 Bean 及 Bean 之间的依赖关系，利用 Java 语言的反射功能实例化Bean 并建立 Bean 之间的依赖关系。 Spring 的 IoC 容器在完成这些底层工作的基础上，还提供了 Bean 实例缓存、生命周期管理、 Bean 实例代理、事件发布、资源装载等高级服务。

### 1.2 依赖注入

1. 依赖注入的三种方式：构造函数注入、setter注入、接口注入

### 1.3 Spring有多少种IOC容器

1. BeanFactory: 一个包含bean集合的工厂类，在客户端要求时实例化Bean
2. ApplicationContext：拓展了BeanFactory提供了一些额外的功能
   1. FileSystemXmlApplicationContext：从Xml文件中加载beans定义，Xml Bean配置文件的全路径名必须提供它的构造函数
   2. ClassPathXmlApplicationContext：从Xml文件中加载beans定义，这个容器将在classpath中找bean配置
   3. WebXmlApplicationContext：加载一个Xml文件，此文件定义了一个Web应用的所有Bean

### 1.4 Spring Bean Scope

1. Singleton：每个IOC容器仅有一个单实例
2. Prototype：每次请求产生一个新实例
3. Request：每次Http请求产生一个新实例
4. Session：每次Http请求产生一个新的Bean，仅在当前Http Session内有效
5. Global Session：类似标准HttpSession作用域

### 1.5 Spring Bean 生命周期

1. Spring容器根据配置中的bean定义实例化Bean
2. Spring使用依赖注入填充所有属性
3. 如果Bean实现BeanNameAware接口，工厂通过传递Bean ID来调用setBeanName()
4. 如果Bean实现BeanFactoryAware接口，工厂通过传递自身实例调用setBeanFactory()
5. 如果存在与Bean关联的任何BeanPostProcessers，则调用preProcessBeforeInitialization()
6. 如果Bean指定了init方法，那么将调用它
7. 如果存在与Bean关联的任何BeanPostProcessers，则调用postProcessAfterInitialization()
8. 如果Bean实现了DisposableBean接口，当Spring容器关闭时，会调用destory()
9. 如果Bean指定了destory方法，那么将调用它

### 1.6 Spring Bean 生命周期方法

1. setup() 容器加载bean的时候调用，重载方法 init-method，注解 @PostConstruct
2. teardown() 在容器卸载bean的时候调用，重载方法 destroy-method，注解 @PreDestroy

### 1.7 Spring 事务

Spring事务类型

1. 编程式事务管理
2. 声明式事务

### 1.8 Spring容器高层视图

Spring 启动时读取应用程序提供的 Bean 配置信息，并在 Spring 容器中生成一份相应的 Bean 配置注册表，然后根据这张注册表实例化 Bean，装配好 Bean 之间的依赖关系，为上层应用提供准备就绪的运行环境。其中 Bean 缓存池为 HashMap 实现。

![image-20201214191154399](/assets/img/Spring容器高层视图.png)

### 1.9 Spring 循环依赖

循环依赖异常：BeanCurrentlyInCreationException

循环依赖指的是 默认的单例Bean中，属性互相引用的场景。在Spring中如果使用构造方法注入，或是实例化Bean的时候指定Scope为prototype等情况，就会可能出现循环依赖的问题。

Spring容器内部是通过3级缓存来解决循环依赖 -- DefaultSingletonBeanRegistry

一级缓存（singletonObjects）：存放已经经历了完整生命周期的Bean对象

二级缓存（earlySingtonObjects）：存放早期暴露出来的Bean对象（Bean的生命周期未结束）

三级缓存（singletonFacoties）：存放可以生成Bean的工厂

只有单例的Bean会通过三级缓存提前暴露来解决循环依赖的问题，而非单例的Bean，每次从容器中获取的都是一个新的对象，都会重新创建，所有非单例的Bean是没有缓存的，不会将其放到三级缓存中。

过程：

1. A创建的过程中需要B，于是A将自己放到三级缓存里面，去实例化B
2. B实例化的时候发现需要A，于是B先查一级缓存，没有再查二级缓存，还是没有再查三级缓存，找到A然后把三级缓存里面的A放到二级缓存里面，并删除三级缓存里的A
3. B顺利初始化完毕，将自己放到一级缓存里面（此时B里面的A依然是创建中状态），然后回来接着创建A，此时B已经创建结束，直接从一级缓存里面拿到B，然后完成创建，并将A自己放到一级缓存里面。

总结：Spring解决循环依赖依靠的是Bean的"中间态"的概念，"中间态"指的是已经实例化但还没初始化的状态。

### 使用函数式风格创建Bean

```java
GenericApplicationContext context = new GenericApplicationContext();
context.refresh();
context.registerBean("user", User.class, User::new);
User user = (User) context.getBean("user");
```

## 2. Spring AOP 

### 常用注解

@Before：前置通知，目标方法之前执行

@After：后置通知，目标方法之后执行（必然执行）

@AfterReturning：返回后通知，执行方法结束前执行（异常不执行）

@AfterThrowing：异常通知，出现异常时执行

@Around：环绕通知，环绕目标方法执行

### Aop执行顺序

**Spring4**

正常：@Around @Before @Around @After @AfterReturning

异常：@Around @Before @After @AfterThrowing

**Spring5**

正常：@Around @Before @AfterReturning @After @Around

异常：@Around @Before @AfterThrowing @After

### 关键词

1. 切面（aspect）：类是对物体特征的抽象，切面就是对横切关注点的抽象

2. 横切关注点：对哪些方法进行拦截，拦截后怎么处理，这些关注点称之为横切关注点。 

3. 连接点（joinpoint）：被拦截到的点，因为 Spring 只支持方法类型的连接点，所以在 Spring中连接点指的就是被拦截到的方法，实际上连接点还可以是字段或者构造器。 

4. 切入点（pointcut）：对连接点进行拦截的定义

5. 通知（advice）：所谓通知指的就是指拦截到连接点之后要执行的代码，通知分为前置、后置、异常、最终、环绕通知五类。 

6. 目标对象：代理的目标对象

7. 织入（weave）：将切面应用到目标对象并导致代理对象创建的过程

8. 引入（introduction）：在不修改代码的前提下，引入可以在运行期为类动态地添加一些方法或字段。

### 两种代理方式

Spring 提供了两种方式来生成代理对象: JDKProxy 和 Cglib，具体使用哪种方式生成由AopProxyFactory 根据 AdvisedSupport 对象的配置来决定。默认的策略是如果目标类是接口，则使用 JDK 动态代理技术，否则使用 Cglib 来生成代理。

**JDK动态接口代理**

JDK 动态代理主要涉及到 java.lang.reflect 包中的两个类：Proxy 和 InvocationHandler。InvocationHandler是一个接口，通过实现该接口定义横切逻辑，并通过反射机制调用目标类的代码，动态将横切逻辑和业务逻辑编制在一起。Proxy 利用 InvocationHandler 动态创建一个符合某一接口的实例，生成目标类的代理对象。

**CGLib 动态代理**

CGLib 全称为 Code Generation Library，是一个强大的高性能，高质量的代码生成类库，可以在运行期扩展 Java 类与实现 Java 接口，CGLib 封装了 asm，可以再运行期动态生成新的 class。和 JDK 动态代理相比较：JDK 创建代理有一个限制，就是只能为接口创建代理实例，而对于没有通过接口定义业务方法的类，则可以通过 CGLib 创建动态代理。

## 3. Spring MVC

### 3.1 概念

将Web层进行职责解耦，将Web应用分为 模型 - 视图 - 控制器。

### 3.2 九大组件

```java
/* 文件上传解析器 */
MultipartResolver multipartResolver;
/* 区域信息解析器 */
LocaleResolver localeResolver;
/* 主题解析器 */
ThemeResolver themeResolver;
/* Handler映射信息 */
List<HandlerMapping> handlerMappings;
/* Handler适配器 */
List<HandlerAdapter> handlerAdapters;
/* 异常解析器 */
List<HandlerExceptionResolver> handlerExceptionResolvers;
/* 请求到视图转换器 */
RequestToViewNameTranslator viewNameTranslator;
/* SpringMVC中运行重定向携带数据的功能 */
FlashMapManager flashMapManager;
/* 视图解析器 */
List<ViewResolver> viewResolvers;
```

### 3.3 MVC流程

1. 客户端请求提交到 DispatcherServlet.
2. DispatcherServlet 收到请求后，遍历HandlerMapping集合得到HandlerExecutionChain，HandlerExecutionChain中包含Handler和Intercepetor (处理器和拦截器)
3. HandlerMapping 根据Url找到具体处理器，生成处理器的对象及处理器拦截器，并返回给DispatcherServlet.
4. DispatcherServlet 经过 HandlerAdapter 调用具体 Handler, 执行前置拦截器 applyPreHandle，执行目标方法返回 ModelAndView，执行后置拦截器 applyPostHandle，执行完成后返回ModelAndView给HandlerAdapter.
5. DispatcherServlet 将ModelAndView传给ViewResolver解析后返回view.
6. DispatcherServlet对View进行渲染并响应用户.

## 4. Spring Boot

JavaConfig：提供了配置Spring IOC的纯Java方法，有利于避免使用Xml配置。

Spring Boot Actuator：公开了一组可直接作为Http Url访问的REST端点来检查状态。

Spring Profiles：允许用户根据配置文件（dev, test, prod等）来注册Bean，因此在应用程序在不同环境运行的时候可以加载不同的bean

Spring Boot Batch：提供可重用函数，包括日志跟踪，事务管理，作业处理统计信息。

## 5. Spring Cloud

**Zuul网关作用**：Nginx的网址重定向、服务的跨域配置、JWT鉴权

**Eureka**： Eureka各个节点是平等的，节点挂掉不会影响剩余节点的正常工作，只要有一台Eureka还在，就能保证注册服务可用，只不过查询到的数据可能不会最新的。Eureka还有自我保护机制，如果在15分钟内超过85%的节点都没有正常心跳，那么Eureka就认为客户端与注册中心出现了故障，此时会出现以下几种情况：

1. Eureka不再从注册列表移除因为长时间没收到心跳而应该过期的服务
2. Eureka仍然能够接受新服务的注册和查询请求，但是不会被同步到其它节点上（保证当前节点依然可用）
3. 当网络稳定时，当前实例新的注册信息会被同步到其它节点中

**Eureka自我保护机制**

某时刻某一个微服务不可用了，eureka不会立即清理，依旧会对该微服务的信息进行保存

默认EurekaServer在一定时间内没有接收到某个微服务实例的心跳，EurekaServer将会注销该实例（默认90秒）

当网络分区故障发生时，微服务与EurekaServer之间无法正常通信，但微服务本身其实是健康的。当EurekaServer节点在短时间内丢失过多客户端时，那么这个节点就会进入自我保护模式，EurekaServer会保护服务注册表中的信息，不再注销任何微服务。当它收到的心跳数重新恢复到阈值以上时，该Eureka Server节点就会自动退出自我保护模式。

在Spring Cloud中，可以使用eureka.server.enable-self-preservation = false 禁用自我保护模式。

**Ribbon**

Spring Cloud Ribbon是基于Netflix Ribbon实现的一套<font color=red>客户端 负载均衡</font>的工具。

配置文件中列出Load Balancer后面所有的机器，Ribbon会自动的帮助你基于某种规则去连接这些机器。

- RoundRobinRule：轮询

- RandomRule：随机
- AvailabilityFilteringRule：会先过滤由于多次访问故障而处于断路器跳闸状态的服务，还有并发的连接数超过阈值的服务，然后对剩余的服务列表按照轮询的方式进行访问
- WeightedResponseTimeRule：根据平均响应时间计算所有服务的权重，响应时间越快服务权重越大被选中的概率越高。刚启动如果统计信息不足，则使用RoundRobinRule策略，等统计信息足够，会切换到WeightedResponseTimeRule。
- RetryRule：先按照RoundRobinRule获取服务，如果获取服务失败则在指定时间内重试，获取可用的服务。
- BestAvailableRule：会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量小的服务。
- ZoneAvoidanceRule：复合判断Server所在区域的性能和Server的可用性选择服务器

**Hystrix**

当某个服务单元发生故障之后，通过断路器的故障监控（类似熔断保险丝），向调用方返回一个符合预期的、可处理的备选响应（FallBack），而不是长时间的等待或者抛出调用方无法处理的异常。

**服务熔断**

一般由某个服务故障或异常引起的，当某个异常条件被触发，直接熔断整个服务，而不是一直等到此服务超时。

**服务降级**

当某个服务熔断后，服务器将不再被调用。此时客户端可以自己准备一个本地的fallback回调，返回一个缺省值。

## Spring WebFlux

响应式编程 (Reactor实现)

1. 响应式编程操作中，Reactor是满足Reactive规范框架
2. Reactor有两个核心类，Mono和Flux，这两个类实现接口Publisher，提供丰富操作符
   1. Flux返回N个元素
   2. Mono返回0或1个元素
3. Flux和Mono都是数据流的发布者，使用Flux和Mono都可以发出3种数据信号：元素值，错误信号，完成信号。错误信号和完成信号都代表终止信号，终止信号用于告诉订阅者数据流结束了，错误信号终止数据流同时把错误信息传递给订阅者。

**具体实现**

```xml
<dependency>
    <groupId>io.projectreactor</groupId>
    <artifactId>reactor-core</artifactId>
    <version>3.1.5.RELEASE</version>
</dependency>
```

```
@RestController
@RequestMapping("user")
public class UserController {

    @Resource
    UserService userService;

    @GetMapping("{id}")
    public Mono<User> getUser(@PathVariable Integer id){
        return userService.selectOne(id);
    }

    @GetMapping("list")
    public Flux<User> getUsers(){
        return userService.selectAll();
    }

    @PostMapping("save")
    public Mono<Void> saveUser(@RequestBody User user){
        Mono<User> userMono = Mono.just(user);
        return userService.save(userMono);
    }
}
```

```java
@Service
public class UserServiceImpl implements UserService {

    private final Map<Integer, User> userMap = new HashMap<>();

    public UserServiceImpl(){
        this.userMap.put(1, new User(1, "Tom"));
        this.userMap.put(2, new User(2, "Jerry"));
    }

    @Override
    public Mono<User> selectOne(Integer id) {
        return Mono.justOrEmpty(this.userMap.get(id));
    }

    @Override
    public Flux<User> selectAll() {
        return Flux.fromIterable(this.userMap.values());
    }

    @Override
    public Mono<Void> save(Mono<User> user) {
        return user.doOnNext(person -> {
           int id = userMap.size() + 1;
           userMap.put(id, person);
        }).thenEmpty(Mono.empty());
    }
}
```

## Mybatis

### Mybatis缓存

一级缓存：在同一个SqlSession中，执行相同的查询sql会从缓存中取，执行增删改后失效。

二级缓存：在同一个Namespace中，查询sql会先从二级缓存中找，没找到再去查询数据库。

