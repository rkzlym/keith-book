# Openresty Nginx

Nginx是一个主进程配合多个工作进程的工作模式，每个进程由单个线程来处理多个连接。

在生产环境中，我们往往会把cpu内核直接绑定到工作进程上，从而提升性能。

## 安装

### 预编译安装

你可以在你的 CentOS 系统中添加 openresty 仓库，这样就可以便于未来安装或更新我们的软件包（通过 yum update 命令）。运行下面的命令就可以添加我们的仓库：

```shell
yum install yum-utils
yum-config-manager --add-repo https://openresty.org/package/centos/openresty.repo
```

然后就可以像下面这样安装软件包，比如 openresty：

```shell
yum install -y openresty
```

如果你想安装命令行工具 resty，那么可以像下面这样安装 openresty-resty 包：

```shell
yum install -y openresty-resty
```

#### 源码编译安装

./configure

然后在进入 openresty-VERSION/目录, 然后输入以下命令配置:

 ./configure

默认, --prefix=/usr/local/openresty 程序会被安装到/usr/local/openresty目录。

依赖 gcc openssl-devel pcre-devel zlib-devel

安装：yum install -y gcc openssl-devel pcre-devel zlib-devel postgresql-devel

 

您可以指定各种选项，比如

 ```
./configure \
--prefix=/opt/openresty \
--with-luajit \
--without-http_redis2_module \
--with-http_iconv_module \
--with-http_postgres_module
 ```



试着使用 ./configure --help 查看更多的选项。

make && make install