# Docker安装RabbitMq

## 1. 拉取镜像

```powershell
docker pull rabbitmq
```

## 2. 创建RabbitMq镜像实例

```powershell
docker run -d --name rabbitmq \
--hostname myRabbit \
-p 5672:5672 -p 15672:15672 \
-v /docker/rabbitmq/data:/var/lib/rabbitmq \
-e RABBITMQ_DEFAULT_VHOST=my_vhost  \
-e RABBITMQ_DEFAULT_USER=admin -e RABBITMQ_DEFAULT_PASS=admin \
rabbitmq
```

## 3. 启动RabbitMq管理控制台

```powershell
docker exec -it rabbitmq rabbitmq-plugins enable rabbitmq_management
```

## 4. 测试

输入 ip:15672 访问

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210101223742953.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)