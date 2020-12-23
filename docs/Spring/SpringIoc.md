# Spring IOC

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