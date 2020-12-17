# Spring

## 1. Spring IOC

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

## 2. Spring AOP 

### 2.1 概念

"横切"的技术，剖解开封装的对象内部，并将那些影响了多个类的公共行为封装到一个可重用模块，并将其命名为"Aspect"，即切面。所谓"切面"，简单说就是那些与业务无关，却为业务模块所共同调用的逻辑或责任封装起来，便于减少系统的重复代码，降低模块之间的耦合度，并有利于未来的可操作性和可维护性。使用"横切"技术，AOP 把软件系统分为两个部分：核心关注点和横切关注点。业务处理的主要流程是核心关注点，与之关系不大的部分是横切关注点。横切关注点的一个特点是，他们经常发生在核心关注点的多处，而各处基本相似，比如权限认证、日志、事物。AOP 的作用在于分离系统中的各种关注点，将核心关注点和横切关注点分离开来。

AOP 主要应用场景有：

1. Authentication 权限

2. Caching 缓存

3. Context passing 内容传递

4. Error handling 错误处理

5. Lazy loading 懒加载

6. Debugging 调试

7. logging, tracing, profiling and monitoring 记录跟踪 优化 校准

8. Performance optimization 性能优化

9. Persistence 持久化

10. Resource pooling 资源池

11. Synchronization 同步

12. Transactions 事务

### 2.2 关键词

1. 切面（aspect）：类是对物体特征的抽象，切面就是对横切关注点的抽象

2. 横切关注点：对哪些方法进行拦截，拦截后怎么处理，这些关注点称之为横切关注点。 

3. 连接点（joinpoint）：被拦截到的点，因为 Spring 只支持方法类型的连接点，所以在 Spring中连接点指的就是被拦截到的方法，实际上连接点还可以是字段或者构造器。 

4. 切入点（pointcut）：对连接点进行拦截的定义

5. 通知（advice）：所谓通知指的就是指拦截到连接点之后要执行的代码，通知分为前置、后置、异常、最终、环绕通知五类。 

6. 目标对象：代理的目标对象

7. 织入（weave）：将切面应用到目标对象并导致代理对象创建的过程

8. 引入（introduction）：在不修改代码的前提下，引入可以在运行期为类动态地添加一些方法或字段。

### 2.3 两种代理方式

Spring 提供了两种方式来生成代理对象: JDKProxy 和 Cglib，具体使用哪种方式生成由AopProxyFactory 根据 AdvisedSupport 对象的配置来决定。默认的策略是如果目标类是接口，则使用 JDK 动态代理技术，否则使用 Cglib 来生成代理。

**JDK动态接口代理**

JDK 动态代理主要涉及到 java.lang.reflect 包中的两个类：Proxy 和 InvocationHandler。InvocationHandler是一个接口，通过实现该接口定义横切逻辑，并通过反射机制调用目标类的代码，动态将横切逻辑和业务逻辑编制在一起。Proxy 利用 InvocationHandler 动态创建一个符合某一接口的实例，生成目标类的代理对象。

**CGLib 动态代理**

CGLib 全称为 Code Generation Library，是一个强大的高性能，高质量的代码生成类库，可以在运行期扩展 Java 类与实现 Java 接口，CGLib 封装了 asm，可以再运行期动态生成新的 class。和 JDK 动态代理相比较：JDK 创建代理有一个限制，就是只能为接口创建代理实例，而对于没有通过接口定义业务方法的类，则可以通过 CGLib 创建动态代理。

## 3. Spring MVC

### 3.1 概念

将Web层进行职责解耦，将Web应用分为 模型 - 视图 - 控制器。

### 3.2 主要组件

1. DispatcherServlet：接收结果，响应结果，转发器
2. HandlerMapping：根据请求Url查找Handler
3. HandlerAdapter：处理适配器
4. Handler：处理器
5. ViewResolver：视图解析器
6. View：支持不同的视图类型（jsp, freemarker, pdf）

### 3.3 MVC流程

1. 客户端请求提交到 DispatcherServlet.
2. DispatcherServlet 收到请求后，查询 HandlerMapping，获取Handle.
3. HandlerMapping 根据Url找到具体处理器，生成处理器的对象及处理器拦截器，并返回给DispatcherServlet.
4. DispatcherServlet 经过 HandlerAdapter 调用具体 Handler, 执行完成后返回ModelAndView给HandlerAdapter.
5. DispatcherServlet 将ModelAndView传给ViewResolver解析后返回view.
6. DispatcherServlet对View进行渲染并响应用户.

## 4. Spring Boot

JavaConfig：提供了配置Spring IOC的纯Java方法，有利于避免使用Xml配置。

Spring Boot Actuator：公开了一组可直接作为Http Url访问的REST端点来检查状态。

Spring Profiles：允许用户根据配置文件（dev, test, prod等）来注册Bean，因此在应用程序在不同环境运行的时候可以加载不同的bean

Spring Boot Batch：提供可重用函数，包括日志跟踪，事务管理，作业处理统计信息。

## 5. Spring Cloud

### 5.1 Api网关

API Gateway 负责请求转发、合成和协议转换。所有来自客户端的请求都要先经过 API Gateway，然后路由这些请求到对应的微服务。API Gateway 将经常通过调用多个微服务来处理一个请求以及聚合多个服务的结果。它可以在 web 协议与内部使用的非 Web 友好型协议间进行转换，如HTTP 协议、WebSocket 协议。

### 5.2 配置中心

配置中心一般用作系统的参数配置，它需要满足如下几个要求：高效获取、实时感知、分布式访问。

### 5.3 服务跟踪（starter-sleuth）

随着微服务数量不断增长，需要跟踪一个请求从一个微服务到下一个微服务的传播过程， Spring Cloud Sleuth 正是解决这个问题，它在日志中引入唯一 ID，以保证微服务调用之间的一致性，这样你就能跟踪某个请求是如何从一个微服务传递到下一个。

1. 为了实现请求跟踪，当请求发送到分布式系统的入口端点时，只需要服务跟踪框架为该请求创建一个唯一的跟踪标识，同时在分布式系统内部流转的时候，框架始终保持传递该唯一标识，直到返回给请求方为止，这个唯一标识就是前文中提到的 Trace ID。通过 Trace ID 的记录，我们就能将所有请求过程日志关联起来。

2. 为了统计各处理单元的时间延迟，当请求达到各个服务组件时，或是处理逻辑到达某个状态时，也通过一个唯一标识来标记它的开始、具体过程以及结束，该标识就是我们前文中提到的 Span ID，对于每个 Span 来说，它必须有开始和结束两个节点，通过记录开始 Span 和结束 Span 的时间戳，就能统计出该 Span 的时间延迟，除了时间戳记录之外，它还可以包含一些其他元数据，比如：事件名称、请求信息等。

3. 在快速入门示例中，我们轻松实现了日志级别的跟踪信息接入，这完全归功于spring-cloudstarter-sleuth 组件的实现。在 Spring Boot 应用中，通过在工程中引入 spring-cloudstarter-sleuth 依赖之后， 它会自动的为当前应用构建起各通信通道的跟踪机制，比如：通过诸如 RabbitMQ、Kafka（或者其他任何 Spring Cloud Stream 绑定器实现的消息中间件）传递的请求。 通过 Zuul 代理传递的请求。 通过 RestTemplate 发起的请求。

### 5.4 服务熔断（Hystrix）

在微服务架构中通常会有多个服务层调用，基础服务的故障可能会导致级联故障，进而造成整个系统不可用的情况，这种现象被称为服务雪崩效应。服务雪崩效应是一种因“服务提供者”的不可用导致“服务消费者”的不可用,并将不可用逐渐放大的过程。熔断器的原理很简单，如同电力过载保护器。它可以实现快速失败，如果它在一段时间内侦测到许多类似的错误，会强迫其以后的多个调用快速失败，不再访问远程服务器，从而防止应用程序不断地尝试执行可能会失败的操作，使得应用程序继续执行而不用等待修正错误，或者浪费 CPU时间去等到长时间的超时产生。熔断器也可以使应用程序能够诊断错误是否已经修正，如果已经修正，应用程序会再次尝试调用操作。

### 5.5 断路器 （Hystrix）

断路器很好理解, 当 Hystrix Command 请求后端服务失败数量超过一定比例(默认 50%), 断路器会切换到开路状态(Open). 这时所有请求会直接失败而不会发送到后端服务. 断路器保持在开路状态一段时间后(默认 5 秒), 自动切换到半开路状态(HALF-OPEN). 这时会判断下一次请求的返回情况, 如果请求成功, 断路器切回闭路状态(CLOSED), 否则重新切换到开路状态(OPEN). Hystrix 的断路器就像我们家庭电路中的保险丝, 一旦后端服务不可用, 断路器会直接切断请求链, 避免发送大量无效请求影响系统吞吐量, 并且断路器有自我检测并恢复的能力。

