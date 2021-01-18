## Spring Cloud

## Spring Cloud 的三套组件

Spring Cloud Netflix

Spring Cloud Alibaba

Spring Cloud Apache

## Eureka

### Eureka概念

Eureka注册中心各个节点是平等的，节点挂掉不会影响剩余节点的正常工作，只要有一台Eureka还在，就能保证注册服务可用，只不过查询到的数据可能不会最新的。Eureka还有自我保护机制，如果在15分钟内超过85%的节点都没有正常心跳，那么Eureka就认为客户端与注册中心出现了故障，此时会出现以下几种情况：

1. Eureka不再从注册列表移除因为长时间没收到心跳而应该过期的服务
2. Eureka仍然能够接受新服务的注册和查询请求，但是不会被同步到其它节点上（保证当前节点依然可用）
3. 当网络稳定时，当前实例新的注册信息会被同步到其它节点中

### Eureka自我保护机制

某时刻某一个微服务不可用了，eureka不会立即清理，依旧会对该微服务的信息进行保存

默认EurekaServer在一定时间内没有接收到某个微服务实例的心跳，EurekaServer将会注销该实例（默认90秒）

当网络分区故障发生时，微服务与EurekaServer之间无法正常通信，但微服务本身其实是健康的。当EurekaServer节点在短时间内丢失过多客户端时，那么这个节点就会进入自我保护模式，EurekaServer会保护服务注册表中的信息，不再注销任何微服务。当它收到的心跳数重新恢复到阈值以上时，该Eureka Server节点就会自动退出自我保护模式。

在Spring Cloud中，可以使用eureka.server.enable-self-preservation = false 禁用自我保护模式。

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

## 草稿

**Zuul网关作用**：Nginx的网址重定向、服务的跨域配置、JWT鉴权

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

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201228100709357.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)