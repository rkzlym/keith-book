# Spring AOP 

开启Aop 使用 `@Aspect` 标注其为切面类，并把该类加入容器

```java
@Aspect
@Component
public class SpringAspect {
    
}
```

在配置类中开启Aop模式 `@EnableAspectJAutoProxy`

```java
@Configuration
@EnableAspectJAutoProxy
public class SpringConfig {

}
```

## Spring AOP常用注解

@Before：前置通知，目标方法之前执行

@After：后置通知，目标方法之后执行（必然执行）

@AfterReturning：返回后通知，执行方法结束前执行（异常不执行）

@AfterThrowing：异常通知，出现异常时执行

@Around：环绕通知，环绕目标方法执行

## Spring Aop执行顺序

**Spring4**

正常：@Around @Before @Around @After @AfterReturning

异常：@Around @Before @After @AfterThrowing

**Spring5**

正常：@Around @Before @AfterReturning @After @Around

异常：@Around @Before @AfterThrowing @After

## Spring Aop 原理

> 使用动态代理执行目标方法

### 执行流程

```
1. @EnableAspectJAutoProxy 为容器中增加一个 AspectJAutoProxyRegistrar 类
2. 容器创建
	2.1 registerBeanPostProcessors() 注册后置处理器
	2.2 finishBeanFactoryInitialization() 初始化剩下的单实例Bean
		2.2.1 创建业务逻辑和切面组件
		2.2.2 AnnotationAwareAspectJAutoProxyCreator拦截组件创建过程
		2.2.3 组件创建完之后，判断组件若需要增强，切面通知方法包装成Advisor，给目标对象创建一个代理对象（默认使用cglib创建）
3. 代理对象执行目标方法 CglibAopProxy.intercept()
	3.1 得到目标方法的拦截器链，包装成拦截器MethodInterceptor
	3.2 利用拦截器的链式机制依次进入每一个拦截器进行执行
```

### 动态代理

Spring 提供了两种方式来生成代理对象: JDKProxy 和 Cglib，具体使用哪种方式生成由AopProxyFactory 根据 AdvisedSupport 对象的配置来决定。默认的策略是如果目标类是接口，则使用 JDK 动态代理技术，否则使用 Cglib 来生成代理。

**JDK动态接口代理**

JDK 动态代理主要涉及到 java.lang.reflect 包中的两个类：Proxy 和 InvocationHandler。InvocationHandler是一个接口，通过实现该接口定义横切逻辑，并通过反射机制调用目标类的代码，动态将横切逻辑和业务逻辑编制在一起。Proxy 利用 InvocationHandler 动态创建一个符合某一接口的实例，生成目标类的代理对象。

**CGLib 动态代理**

CGLib 全称为 Code Generation Library，是一个强大的高性能，高质量的代码生成类库，可以在运行期扩展 Java 类与实现 Java 接口，CGLib 封装了 asm，可以再运行期动态生成新的 class。和 JDK 动态代理相比较：JDK 创建代理有一个限制，就是只能为接口创建代理实例，而对于没有通过接口定义业务方法的类，则可以通过 CGLib 创建动态代理。

### Spring 创建代理对象

如果该Bean有Advice则返回代理对象，否则返回普通对象

```java
	protected Object wrapIfNecessary(Object bean, String beanName, Object cacheKey) {
		if (StringUtils.hasLength(beanName) && this.targetSourcedBeans.contains(beanName)) {
			return bean;
		}
		if (Boolean.FALSE.equals(this.advisedBeans.get(cacheKey))) {
			return bean;
		}
		if (isInfrastructureClass(bean.getClass()) || shouldSkip(bean.getClass(), beanName)) {
			this.advisedBeans.put(cacheKey, Boolean.FALSE);
			return bean;
		}

		// Create proxy if we have advice.
		Object[] specificInterceptors = getAdvicesAndAdvisorsForBean(bean.getClass(), beanName, null);
		if (specificInterceptors != DO_NOT_PROXY) {
			this.advisedBeans.put(cacheKey, Boolean.TRUE);
			Object proxy = createProxy(
					bean.getClass(), beanName, specificInterceptors, new SingletonTargetSource(bean));
			this.proxyTypes.put(cacheKey, proxy.getClass());
			return proxy;
		}

		this.advisedBeans.put(cacheKey, Boolean.FALSE);
		return bean;
	}
```

如果是接口，创建JDK代理对象，否则创建Cglib代理对象

```java
public AopProxy createAopProxy(AdvisedSupport config) throws AopConfigException {
        if (config.isOptimize() || config.isProxyTargetClass() || hasNoUserSuppliedProxyInterfaces(config)) {
            Class<?> targetClass = config.getTargetClass();
            if (targetClass == null) {
                throw new AopConfigException("TargetSource cannot determine target class: " +
                        "Either an interface or a target is required for proxy creation.");
            }
            if (targetClass.isInterface() || Proxy.isProxyClass(targetClass)) {
                return new JdkDynamicAopProxy(config);
            }
            return new ObjenesisCglibAopProxy(config);
        }
        else {
            return new JdkDynamicAopProxy(config);
        }
    }
```

## Spring 事务

### 配置事务步骤

1. 配置数据源

2. 配置事务管理器 `PlatformTransactionManager`

3. 开启事务 `@EnableTransactionManagement`

```
@Configuration
@EnableTransactionManagement
public class JdbcConfig {

    @Bean
    public DataSource dataSource() {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setUsername("root");
        dataSource.setPassword("root");
        dataSource.setDriverClassName("com.mysql.jdbc.Driver");
        dataSource.setJdbcUrl("jdbc:mysql//localhost:3306/test");
        return dataSource;
    }

    @Bean
    public PlatformTransactionManager transactionManager(){
        return new DataSourceTransactionManager(dataSource());
    }
}
```

### 声明式事务和编程式事务

编程式事务：通过硬编码的形式手动控制事务的提交和回滚。

声明式事务：只需告诉Spring哪个方法是事务方法即可。

### Spring事务异常

运行时异常：可以不用处理，默认都回滚。

编译时异常：要么try-catch，要么thows，默认不回滚。

### Spring事务传播行为

REQUIRED: 如当前事务存在，方法将在该事务中运行，否则开一个新事务。

REQUIRED_NEW: 开一个新事务。

SUPPORTS: 如当前事务存在，方法将在该事务中运行，否则不开事务。

NOT_SUPPORTED: 运行在事务中将被挂起。

MANDATORY: 不在事务中运行则抛异常。

NEVER: 在事务中运行则抛异常。

NESTED: 嵌套在事务中运行