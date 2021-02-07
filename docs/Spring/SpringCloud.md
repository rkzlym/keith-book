## Spring Cloud

## Spring Cloud 组件

服务注册发现：Eureka，Consul，Nacos

服务调用：Feign，Ribbon

服务熔断降级：Hystrix

网关路由：Zuul，Gateway

配置中心：Config，Apolle

服务链路追踪：Sleuth，Zipkin

服务健康管理：Admin

消息组件：Stream，Bus

安全：Security

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

## Spring Cloud Eureka

### 注册中心和微服务的关系

1. 注册：每个微服务启动时，将自己的网络地址等信息注册到注册中心，注册中心会存储（内存中）这些信息。
2. 获取服务注册表：服务消费者从注册中心，查询服务提供者的网络地址，并使用该地址调用服务提供者，为了避免每次都查注册表信息，所以client会定时去server拉取注册表信息到缓存到client本地。
3. 心跳：各个微服务与注册中心通过某种机制（心跳）通信，若注册中心长时间和服务间没有通信，就会注销该实例。
4. 调用：实际的服务调用，通过注册表，解析服务名和具体地址的对应关系，找到具体服务的地址，进行实际调用。

![在这里插入图片描述](https://img-blog.csdnimg.cn/2021020610401060.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

### Eureka概念

Eureka注册中心各个节点是平等的，节点挂掉不会影响剩余节点的正常工作，只要有一台Eureka还在，就能保证注册服务可用，只不过查询到的数据可能不会最新的。Eureka还有自我保护机制，如果在15分钟内超过85%的节点都没有正常心跳，那么Eureka就认为客户端与注册中心出现了故障，此时会出现以下几种情况：

1. Eureka不再从注册列表移除因为长时间没收到心跳而应该过期的服务
2. Eureka仍然能够接受新服务的注册和查询请求，但是不会被同步到其它节点上（保证当前节点依然可用）
3. 当网络稳定时，当前实例新的注册信息会被同步到其它节点中

**注册中心功能**

1. 服务注册表：记录各个微服务信息，例如服务名称，ip，端口等。

   注册表提供 查询API（查询可用的微服务实例）和管理API（用于服务的注册和注销）。

2. 服务注册与发现：注册：将微服务信息注册到注册中心。发现：查询可用微服务列表及其网络地址。

3. 服务检查：定时检测已注册的服务，如发现某实例长时间无法访问，就从注册表中移除。

### Eureka自我保护机制

某时刻某一个微服务不可用了，eureka不会立即清理，依旧会对该微服务的信息进行保存

默认EurekaServer在一定时间内没有接收到某个微服务实例的心跳，EurekaServer将会注销该实例（默认90秒）

当网络分区故障发生时，微服务与EurekaServer之间无法正常通信，但微服务本身其实是健康的。当EurekaServer节点在短时间内丢失过多客户端时，那么这个节点就会进入自我保护模式，EurekaServer会保护服务注册表中的信息，不再注销任何微服务。当它收到的心跳数重新恢复到阈值以上时，该Eureka Server节点就会自动退出自我保护模式。

在Spring Cloud中，可以使用eureka.server.enable-self-preservation = false 禁用自我保护模式。

### 单节点 Eureka 服务端配置说明

```yaml
eureka: 
  client:
    # 是否将自己注册到Eureka Server,默认为true，由于当前就是server，故而设置成false，表明该服务不会向eureka注册自己的信息
    register-with-eureka: false
    # 是否从eureka server获取注册信息，由于单节点，不需要同步其他节点数据，用false
    fetch-registry: false
    # 设置服务注册中心的URL，用于client和server端交流
    service-url:                      
      defaultZone: http://root:root@eureka-7901:7901/eureka/
```

### 客户端注册

pom.xml

```xml
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>
```

application.yml

```yaml
#注册中心
eureka: 
  client:
    #设置服务注册中心的URL
    service-url:                      
      defaultZone: http://root:root@localhost:7900/eureka/
```

不想注册，设置成false即可

```yaml
spring: 
  cloud:
    service-registry:
      auto-registration:
        enabled: false
```

注册成功：

```
DiscoveryClient_API-LISTEN-ORDER/api-listen-order:30.136.133.9:port - registration status: 204
```

### 在本地搭建Eureka集群

引入依赖 eureka server

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.cloud</groupId>
        <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
    </dependency>
</dependencies>
```

修改本地hosts文件

```
127.0.0.1 eureka1.com
127.0.0.1 eureka2.com
```

application.yml

```yaml
spring:
  profiles:
    active: 01
---
server:
  port: 5001
spring:
  application:
    name: eureka-demo
  profiles: 01
eureka:
  instance:
    hostname: eureka1.com
  client:
    service-url:
      defaultZone: http://eureka2.com:5002/eureka
---
server:
  port: 5002
spring:
  application:
    name: eureka-demo
  profiles: 02
eureka:
  instance:
    hostname: eureka2.com
  client:
    service-url:
      defaultZone: http://eureka1.com:5001/eureka
```

启动类

```java
@SpringBootApplication
@EnableEurekaServer
public class RegistryApplication {
    public static void main(String[] args) {
        SpringApplication.run(RegistryApplication.class, args);
    }
}
```

**多节点 Eureka 注意事项**

> peer：A 同步信息给 B，A 是 B 的peer

举例说明：

```yaml
eureka:
  instance:
    hostname: eureka2.com
  client:
    service-url:
      defaultZone: http://eureka1.com:5001/eureka # 这个地址就是该服务的 peer
```

有3个服务 A B C，注册方式 A -> B，B->C，C->A，结果注册信息并不同步

启动流程：

1. 拉取 peer 的注册表，A 启动会拉取 B 的注册表
2. 把自己注册到 peer 上，A 会把自己注册到 B 的注册表上
3. peer 会把自己的注册表同步给 peer 的 peer，B 会把 A 同步给 C

### Eureka 原理

1. 本质：存储了每个客户端的注册信息。EurekaClient从EurekaServer同步获取服务注册列表。通过一定的规则选择一个服务进行调用。
2. Eureka架构图

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206111125938.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

3. 详解

- 服务提供者：是一个eureka client，向Eureka Server注册和更新自己的信息，同时能从Eureka Server注册表中获取到其他服务的信息。
- 服务注册中心：提供服务注册和发现的功能。每个Eureka Cient向Eureka Server注册自己的信息，也可以通过Eureka Server获取到其他服务的信息达到发现和调用其他服务的目的。
- 服务消费者：是一个eureka client，通过Eureka Server获取注册到其上其他服务的信息，从而根据信息找到所需的服务发起远程调用。
- 同步复制：Eureka Server之间注册表信息的同步复制，使Eureka Server集群中不同注册表中服务实例信息保持一致。
- 远程调用：服务客户端之间的远程调用。
- 注册：Client端向Server端注册自身的元数据以供服务发现。
- 续约：通过发送心跳到Server以维持和更新注册表中服务实例元数据的有效性。当在一定时长内，Server没有收到Client的心跳信息，将默认服务下线，会把服务实例的信息从注册表中删除。
- 下线：Client在关闭时主动向Server注销服务实例元数据，这时Client的服务实例数据将从Server的注册表中删除。
- 获取注册表：Client向Server请求注册表信息，用于服务发现，从而发起服务间远程调用。

```sh
让我们自己做：如何做？

客户端：
拉取注册表
从注册表选一个
调用

服务端：
写个web server。
功能：
1、定义注册表：
Map<name,Map<id,InstanceInfo>>。
2、别人可以向我注册自己的信息。
3、别人可以从我这里拉取他人的注册信息。
4、我和我的同类可以共享注册表。

eureka是用：jersey实现，也是个mvc框架。
我们可以自己写个spring boot web实现。
```

### Eureka 客户端工作流程

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210206141833488.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

## Spring Cloud 配置中心

### Spring Cloud Config Center

### 1. 新建一个Git配置仓库

配置文件命名规则

```
/{application}/{profile}[/{label}]
/{application}-{profile}.yml
/{label}/{application}-{profile}.yml
/{application}-{profile}.properties
/{label}/{application}-{profile}.properties
```

### 2. 基本依赖和配置

引入依赖

```xml
<!-- Spring Cloud Eureka -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
</dependency>

<!-- Spring Cloud Config Server -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-server</artifactId>
</dependency>

<!-- Spring Boot Actuator -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-actuator</artifactId>
</dependency>
```

配置文件 `application.properties`

```properties
server.port=5100
spring.application.name=config-center
spring.cloud.config.server.git.uri=https://<your-repository>.git
spring.cloud.config.label=master
eureka.client.service-url.defaultZone=http://eureka1.com:5000/eureka
```

### 3. 启动类增加注解

```java
@EnableConfigServer
```

### 4. 访问测试

访问以下地址可以得到具体配置

```
{ 配置中心服务地址 }/master/file-dev.yml 
```

### 5. 客户端配置

引入依赖

```xml
<!-- Spring Cloud Config Client -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-config-client</artifactId>
</dependency>
```

配置文件 `bootstrap.properties`

读取配置中心的master分支的配置文件 `sardine-file-dev.yml`

```properties
spring.application.name=sardine-file
spring.cloud.config.uri=http://127.0.0.1:5100/
spring.cloud.config.profile=dev
spring.cloud.config.label=master
```

### 6. 热更新

#### 6.1 手动配置热更新

1. 开启 actuator 中的 refresh 端点
2. Controller 中添加 @RefreshScope 注解
3. 向客户端 `http://localhost:5005/actuator/refresh` 发送 Post 请求

#### 6.2 自动热更新

在配置中心引入依赖

```xml
<!-- Spring Cloud Bus Amqp -->
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
```

配置文件加入rabbitmq

```properties
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=admin
spring.rabbitmq.password=admin
```

向配置中心发送 Post 请求

`http://localhost:5100/actuator/bus-refresh` 

<<<<<<< HEAD
## Spring Cloud Ribbon

> 客户端负载均衡

配置文件中列出 Load Balancer 后面所有的机器，Ribbon 会自动的帮助你基于某种规则去连接这些机器。

- RoundRobinRule：轮询

- RandomRule：随机
- AvailabilityFilteringRule：会先过滤由于多次访问故障而处于断路器跳闸状态的服务，还有并发的连接数超过阈值的服务，然后对剩余的服务列表按照轮询的方式进行访问
- WeightedResponseTimeRule：根据平均响应时间计算所有服务的权重，响应时间越快服务权重越大被选中的概率越高。刚启动如果统计信息不足，则使用RoundRobinRule策略，等统计信息足够，会切换到WeightedResponseTimeRule。
- RetryRule：先按照RoundRobinRule获取服务，如果获取服务失败则在指定时间内重试，获取可用的服务。
- BestAvailableRule：会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量小的服务。
- ZoneAvoidanceRule：复合判断Server所在区域的性能和Server的可用性选择服务器
=======
## Spring Cloud 服务调用

### RestTemplate

> springframework:spring-web 包下

使用 RestTemplate 需要将其加入到容器

```java
@Configuration
public class RestTemplateConfigurer {
    @Bean
    public RestTemplate restTemplate(){
        return new restTemplate();
    }
}
```

#### 1. 直接调用

实体类

服务端和客户端的实体类可以不是同一个，如果客户端实体类使用@Builder接收会失败

```java
@Data
public class Cookbook {
    private Long id;

    private String bookName;
}
```

消费端

```java
@RestController
@RequestMapping("consumer")
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;

    @GetMapping("get")
    public void hello(String name){
        String url = "http://127.0.0.1:8001/provider/hello?name={1}";
        ResponseEntity<String> helloResponse = restTemplate.getForEntity(url, String.class, name);
        System.out.println("Hello: " + helloResponse.getBody());

        String url2 = "http://127.0.0.1:8001/provider/cookbook?name={1}";
        ResponseEntity<Cookbook> cookBookResponse = restTemplate.getForEntity(url2, Cookbook.class, name);
        System.out.println("CookBook: " + cookBookResponse.getBody());

        String url3 = "http://127.0.0.1:8001/provider/list/cookbook";
        List<Cookbook> list = restTemplate.getForObject(url3, List.class);
        System.out.println("CookBook List: " + list);

        String url4 = "http://127.0.0.1:8001/provider/cookbook";
        Student student = new Student();
        student.setName("张三");
        ResponseEntity<Cookbook> postCookbook = restTemplate.postForEntity(url4, student, Cookbook.class);
        System.out.println("Post CookBook: " + postCookbook.getBody());
    }
}
```

服务端

```java
@RestController
@RequestMapping("provider")
public class ProviderController {

    @GetMapping("hello")
    public String hello(String name){
        return "Hello " + name;
    }

    @GetMapping("cookbook")
    public Cookbook cookbook(String name){
        return Cookbook.builder().id(1L).bookName(name).build();
    }

    @GetMapping("list/cookbook")
    public List<Cookbook> listCookbook(){
        List<Cookbook> list = new ArrayList<>();
        list.add(Cookbook.builder().id(1L).bookName("盐酥鸡").build());
        list.add(Cookbook.builder().id(2L).bookName("酱鸭").build());
        return list;
    }

    @PostMapping("cookbook")
    public Cookbook postCookbook(@RequestBody Student student){
        return Cookbook.builder().bookName(student.getName()).build();
    }
}
```

#### 2. 注册到同一个 eureka 

消费端

```java
@RestController
@RequestMapping("consumer")
public class ConsumerController {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    private DiscoveryClient discoveryClient;

    @GetMapping("hello")
    public void hello(String name){
        //拿到服务提供商
        List<ServiceInstance> list = discoveryClient.getInstances("sardine-cookbook");
        //拿到第一个实例
        ServiceInstance instance = list.get(0);
        //得到主机号
        String host = instance.getHost();
        //得到端口号
        int port = instance.getPort();
        //拼接完整的请求url
        String url = "http://" + host + ":" + port + "/test/hello?name={1}";
        //restTemple 实际返回的是一个ResponseEntity 的实例
        ResponseEntity<String> responseEntity = restTemplate.getForEntity(url, String.class, name);
        System.out.println(responseEntity.getBody());
    }
}
```

服务端

```java
@RestController
@RequestMapping("provider")
public class ProviderController {

    @GetMapping("hello")
    public String hello(String name){
        return "Hello " + name;
    }
}
```

#### 3. 客户端拦截器

```java
public class LoggingClientHttpRequestInterceptor implements ClientHttpRequestInterceptor {
    @Override
    public ClientHttpResponse intercept(HttpRequest request, byte[] body, ClientHttpRequestExecution execution) throws IOException {
        System.out.println("执行了拦截器");
        System.out.println(request.getURI());
        ClientHttpResponse response = execution.execute(request, body);
        return response;
    }
}
```

在 restTemplate 配置中增加拦截器

```java
@Configuration
public class RestTemplateConfigurer {
    @Bean
    public RestTemplate restTemplate(){
        RestTemplate restTemplate = new RestTemplate();
        restTemplate.getInterceptors().add(new LoggingClientHttpRequestInterceptor());
        return restTemplate;
    }
}
```

### Ribbon

> 客户端的负载均衡

Ribbon是Netflix开发的客户端负载均衡器，为Ribbon配置**服务提供者地址列表**后，Ribbon就可以基于某种**负载均衡策略算法**，自动地帮助服务消费者去请求提供者。Ribbon默认为我们提供了很多负载均衡算法，例如轮询、随机等。我们也可以实现自定义负载均衡算法。

#### 负载均衡算法

- **ZoneAvoidanceRule（默认）：区域权衡策略**

  复合判断Server所在区域的性能和Server的可用性，轮询选择服务器。

- **BestAvailableRule：最低并发策略**

  会先过滤掉由于多次访问故障而处于断路器跳闸状态的服务，然后选择一个并发量最小的服务。逐个找服务，如果断路器打开，则忽略。

- **RoundRobinRule：轮询策略**

  以简单轮询选择一个服务器，按顺序循环选择一个server。

- **RandomRule：随机策略**

  随机选择一个服务器。

- **AvailabilityFilteringRule：可用过滤策略**

  会先过滤掉多次访问故障而处于断路器跳闸状态的服务和过滤并发的连接数量超过阀值得服务，然后对剩余的服务列表安装轮询策略进行访问

- **WeightedResponseTimeRule：响应时间加权策略**

  据平均响应时间计算所有的服务的权重，响应时间越快服务权重越大，容易被选中的概率就越高。刚启动时，如果统计信息不中，则使用RoundRobinRule(轮询)策略，等统计的信息足够了会自动的切换到WeightedResponseTimeRule。响应时间长，权重低，被选择的概率低。反之，同样道理。此策略综合了各种因素（网络，磁盘，IO等），这些因素直接影响响应时间。

- **RetryRule：重试策略**

  先按照RoundRobinRule(轮询)的策略获取服务，如果获取的服务失败则在指定的时间会进行重试，进行获取可用的服务。如多次获取某个服务失败，就不会再次获取该服务。主要是在一个时间段内，如果选择一个服务不成功，就继续找可用的服务，直到超时。

开启负载均衡

```java
@Bean
@LoadBalanced
RestTemplate restTemplate() {
	return new RestTemplate();
}
```
切换策略

```java
@Bean
public IRule myRule() {
    //return new RoundRobinRule();
    //return new RandomRule();
    return new RetryRule();
}
```

消费端：注意要使用应用名替代域名，且要在同一个注册中心，否则会报错

```java
@GetMapping("balance")
public void balance(){
    String url = "http://sardine-cookbook/provider/balance";
    ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
    System.out.println(response.getBody());
}
```

服务端

```java
@GetMapping("balance")
public String balance(){
    return "Hello World";
}
```

#### 配置

```properties
# 请求连接的超时时间
ribbon.ConnectTimeout=2000
# 请求处理的超时时间
ribbon.ReadTimeout=5000
# 也可以为每个Ribbon客户端设置不同的超时时间, 通过服务名称进行指定：
ribbon-config-demo.ribbon.ConnectTimeout=2000
ribbon-config-demo.ribbon.ReadTimeout=5000
# 最大连接数
ribbon.MaxTotalConnections=500
# 每个host最大连接数
ribbon.MaxConnectionsPerHost=500
```

**ribbon脱离eurekap配置**

可以在配置文件中使用listOfServers字段来设置服务端地址，只要客户端拥有服务器列表，就可以使用ribbon做负载均衡。

```properties
ribbon.eureka.enabled=false
ribbon.listOfServers=localhost:8001,localhost:8002
```

#### Feign

> 声明式、模板化的HTTP请求客户端

主要构建微服务消费端。只要使用OpenFeign提供的注解修饰定义网络请求的接口类，就可以使用该接口的实例发送 Restful 的网络请求。还可以集成Ribbon和Hystrix，提供负载均衡和断路器。

**实现**

服务端暴露接口到 `sardine-user-api`

```java
@FeignClient("sardine-user")
public interface UserClient {
    @PostMapping("identify")
    CommonResult<UserDto> identify(@RequestParam String token);
}
```

```java
@PostMapping("identify")
public CommonResult<UserDto> identify(@RequestParam(value = "token", required = false) String token) {
    UserDto userInfo = new UserInfo("1", "张三");
    return CommonResult.success(userInfo);
}
```

客户端引入 api 依赖

```xml
<!-- user api -->
<dependency>
    <groupId>com.sardine</groupId>
    <artifactId>sardine-user-api</artifactId>
    <version>1.0.0</version>
</dependency>
```

客户端使用 UserClient

```java
@Autowired
private UserClient userClient;

@GetMapping("call")
public CommonResult<UserDto> call(){
    return userClient.identify(token).getData();
}
```
>>>>>>> 46e4d0750a1890710978f5358252b5fd8618a659

## Spring Cloud Hystrix

> 容错组件 实现了超时机制和断路器模式

### 1. 主要功能

1. 为系统提供保护机制。在依赖的服务出现高延迟或失败时，为系统提供保护和控制。
2. 防止雪崩。
3. 包裹请求：使用HystrixCommand（或HystrixObservableCommand）包裹对依赖的调用逻辑，每个命令在独立线程中运行。
4. 跳闸机制：当某服务失败率达到一定的阈值时，Hystrix可以自动跳闸，停止请求该服务一段时间。
5. 资源隔离：Hystrix为每个请求都的依赖都维护了一个小型线程池，如果该线程池已满，发往该依赖的请求就被立即拒绝，而不是排队等候，从而加速失败判定。防止级联失败。
6. 快速失败：Fail Fast。同时能快速恢复。侧重点是：（不去真正的请求服务，发生异常再返回），而是直接失败。
7. 监控：Hystrix可以实时监控运行指标和配置的变化，提供近实时的监控、报警、运维控制。
8. 回退机制：fallback，当请求失败、超时、被拒绝，或当断路器被打开时，执行回退逻辑。回退逻辑我们自定义，提供优雅的服务降级。
9. 自我修复：断路器打开一段时间后，会自动进入“半开”状态，可以进行打开，关闭，半开状态的转换。前面有介绍。

### 2. 独立使用

```java
public class HystrixTestService extends HystrixCommand<String> {

    protected HystrixTestService(HystrixCommandGroupKey group) {
        super(group);
    }

    @Override
    protected String run() throws Exception {
        System.out.println("执行逻辑");
        // 当执行 1/0 后抛出异常会执行 Fallback 逻辑，否则执行正常逻辑
        int i = 1 / 0;
        return "ok";
    }

    @Override
    protected String getFallback() {
        return "Fallback Function";
    }

    public static void main(String[] args) {
        Future<String> futureResult = new HystrixTestService(HystrixCommandGroupKey.Factory.asKey("ext")).queue();
        try {
            String result = futureResult.get();
            System.out.println("程序结果："+result);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }
}
```

### 3. 整合 RestTemplate

```java
// 启动类增加注解 @EnableCircuitBreaker
@EnableCircuitBreaker
public class UserApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserApplication.class, args);
    }
}
```

```java
@HystrixCommand(fallbackMethod = "fallback")
public String alive() {
	// 自动处理URL
	RestTemplate restTemplate = new RestTemplate();
	String url ="http://user-provider/User/alive";
	String result = restTemplate.getForObject(url, String.class);
	return result;
}

public String fallback() {	
	return "Fallback Function";
}
```

### 4. 整合 Fegin

```properties
# 配置开启 Hystrix
feign.hystrix.enabled=true
```

```java
@FeignClient(name = "user-provider",fallback = AliveBack.class)
public interface ConsumerApi {

	@GetMapping(value = "/user/alive")
	public String alive();
	
	@GetMapping(value = "/user/getById")
	public String getById(Integer id);
}
```

```java
@Component
public class AliveBack implements ConsumerApi{

	@Override
	public String alive() {
		return "call exception";
	}

	@Override
	public String getById(Integer id) {
		return null;
	}
}
```