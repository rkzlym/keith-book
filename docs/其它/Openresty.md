# Openresty

Nginx是一个主进程配合多个工作进程的工作模式，每个进程由单个线程来处理多个连接。

在生产环境中，我们往往会把cpu内核直接绑定到工作进程上，从而提升性能。

## 预编译安装

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

## Hello World

### 在nginx中使用lua语法

```json
location /lua {
    default_type text/html;
    content_by_lua '
    ngx.say("<h1>Hello World</h1>");
';
}
```

### 在nginx中使用lua配置文件

在nginx目录 `/usr/local/openresty/nginx`创建lua文件

```shell
mkdir lua_script
cd lua_script
vim test.lua
```

test.lua

```lua
ngx.say("<h1>Hello World</h1>")
```

nginx.conf

```json
location /lua {
    default_type text/html;
    content_by_lua_file lua_script/test.lua;
}
```

测试访问 http://127.0.0.1/lua

### 配置样例

#### 获取Nginx uri中的单一变量

 ```nginx
location /nginx_var {

    default_type text/html;

    content_by_lua_block {

        ngx.say(ngx.var.arg_a)

    }
}
 ```

#### 获取Nginx uri中的所有变量

```lua
local uri_args = ngx.req.get_uri_args()  

for k, v in pairs(uri_args) do  

    if type(v) == "table" then  

        ngx.say(k, " : ", table.concat(v, ", "), "<br/>")  

    else  

        ngx.say(k, ": ", v, "<br/>")  

    end  
end
```

#### 获取Nginx请求头信息

```lua
local headers = ngx.req.get_headers()                         

ngx.say("Host : ", headers["Host"], "<br/>")  

ngx.say("user-agent : ", headers["user-agent"], "<br/>")  

ngx.say("user-agent : ", headers.user_agent, "<br/>")

for k,v in pairs(headers) do  

    if type(v) == "table" then  

        ngx.say(k, " : ", table.concat(v, ","), "<br/>")  

    else  

        ngx.say(k, " : ", v, "<br/>")  

    end  

end  
```

#### 获取post请求参数

```lua
ngx.req.read_body()  

ngx.say("post args begin", "<br/>")  

local post_args = ngx.req.get_post_args()  

for k, v in pairs(post_args) do  

    if type(v) == "table" then  

        ngx.say(k, " : ", table.concat(v, ", "), "<br/>")  

    else  

        ngx.say(k, ": ", v, "<br/>")  

    end  
end
```

#### http协议版本

```lua
ngx.say("ngx.req.http_version : ", ngx.req.http_version(), "<br/>")
```

#### 请求方法

```lua
ngx.say("ngx.req.get_method : ", ngx.req.get_method(), "<br/>")  
```

#### 原始的请求头内容  

```lua
ngx.say("ngx.req.raw_header : ",  ngx.req.raw_header(), "<br/>")  
```

#### body内容体  

```lua
ngx.say("ngx.req.get_body_data() : ", ngx.req.get_body_data(), "<br/>")
```

