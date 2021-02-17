# Spring Cloud

## Spring Cloud 组件

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210208092332722.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

1. 注册中心：Eureka（Restful），Zookeeper，Consul，Nacos
2. 服务调用组件：Hystrix（熔断降级），Ribbon（客户端负载均衡），OpenFeign（声明式RESTful网络请求客户端）
3. 网关：Zuul，Gateway。
4. 配置中心：提供了配置集中管理，动态刷新配置的功，配置通过Git或者其他方式来存储。
5. 消息组件：Spring Cloud Stream（对分布式消息进行抽象，包括发布订阅、分组消费等功能，实现了微服务之间的异步通信），Spring Cloud Bus（主要提供服务间的事件通信，如刷新配置）
6. 安全控制组件：Spring Cloud Security 基于OAuth2.0开放网络的安全标准，提供了单点登录、资源授权和令牌管理等功能。
7. 链路追踪组件：Spring Cloud Sleuth（收集调用链路上的数据），Zipkin（对Sleuth收集的信息，进行存储，统计，展示）

## Spring Cloud 总体架构视图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206100054838.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## Spring Cloud基石

1. Spring Cloud Context为Spring Cloud应用上下文提供了实用工具和特性服务。
2. Spring Cloud Common针对不同的Spring Cloud实现（比如注册中心：eureka，consul）提供上层抽象和公共类。

### Spring Cloud Context

1. 我们原来在Spring Boot中学过 应用上下文通过application.yml配置。

2. Bootstrap上下文（Spring Cloud提供，也叫引导程序上下文）

   Spring Cloud启动的时候会创建一个bootstrap的上下文，它是应用的父级上下文(请注意这里所说的bootstrap指的是启动最开始时加载的配置项，与bootstrap.yml或者说bootstrap.properties是两码事)；它负责从一些外部环境中加载配置项，如配置中心；这部分配置项的优先级是最高的，因此它不会被其它的配置文件中加载的配置项给覆盖。

   它是主程序的父级上下文，负责从外部资源中（Git仓库）加载配置属性 和 解密本地外部配置文件中的属性。是所有Spring程序的外部属性来源。通过Bootstrap加载进来的属性的优先级较高，不能被本地配置覆盖。

   bootstrap.yml

   ```yaml
   spring:
       application:
           name: my-application
       cloud:
           config:
             # 远程仓库地址
             uri: ${CONFIG_SERVER:http://localhost:8080}
   
   # 如果想要禁止Bootstrap引导过程，可以在bootstrap.yml中设置，如下所示：
   spring:
       cloud:
           bootstrap:
               enabled: false
   ```

3. 加载顺序

   Spring Cloud应用加载的配置项可以来自于以下几个位置（优先级从上往下递减，上面位置加载的配置项会覆盖下面位置加载的配置项）：

   1. 启动命令中指定的配置项

   2. 配置中心中的配置文件

   3. 本地的application.properties(yml)

   4. 本地boostrap.properties（yml）

4. application上下文

   Bootstrap上下文是application上下文的父级，子级从父级继承配置文件和属性。

   bootstrap.yml中的属性会添加到子级的上下文。它们的优先级低于application.yml和其他添加到子级中作为创建Spring Boot应用的属性源，boostrap.yml中的属性具备非常低的优先级，因此可以作为默认值。

   Bootstrap中上下文的属性优先，但是注意这些属性并不包括任何来自于bootstrap.yml中的属性。

### Spring Cloud Commons

将服务发现，负载均衡，断路器等封装在Commons中，供Cloud客户端使用，不依赖于具体的实现（Eureka，Consul），类似于jdbc提供了一套规范，数据库厂商来实现它。

例如：

```
org.springframework.cloud.client.discovery.DiscoveryClient
是Spring Cloud中用来进行服务发现的顶级接口，在Netflix Eureka或者Consul中都有相应的具体实现类。
    
DiscoveryClient 目前的实现有：
- Spring Cloud Netflix Eureka
- Spring Cloud Consul Discovery
- Spring Cloud Zookeeper Discovery

org.springframework.cloud.client.serviceregistry.ServiceRegistry 接口实现了服务注册和服务下线
```
