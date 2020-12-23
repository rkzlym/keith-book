# Spring AOP 

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