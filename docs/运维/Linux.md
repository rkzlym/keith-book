# Linux常用命令

**从指定url下载资源**

```shell
yum install -y wget
wget http://download.redis.io/releases/redis-5.0.5.tar.gz
```

**解压tar.gz**

```shell
tar xf xxx.tar.gz
```

**Linux开机启动项目录**

```powershell
/etc/init.d
```

**根据进程名查看运行进程**

```shell
ps -fe | grep redis
```

**nc命令**

```powershell
# 安装包
yum install -y nmap-ncat
# 监听TCP/UDP端口
nc localhost 6379
```

**全局搜索文件**

```shell
find / -name "*.err"
```

**netstat**

```shell
netstat -anp|grep 5000
# 查看Tcp连接
netstat -natp
```

**根据PID终止进程**

```shell
kill -9 {pid}
```

**查看机器负载**

```shell
df -h
```

**SpringBoot 后台启动**

```shell
nohup java -jar myproject.jar >myproject.log 2>&1 &

命令详解：
nohup：不挂断地运行命令，退出帐户之后继续运行相应的进程。
>myproject.log：控制台输出到myproject.log日志文件中。
2>&1：标准错误重定向到标准输出。
最后的&：让改作业在后台运行。
```