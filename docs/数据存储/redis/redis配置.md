# redis配置文件

> redis.conf

查看redis最大占用内存，如不设置在64位操作系统不限制大小，32位操作系统最多使用3GB

推荐redis内存设置为最大物理内存的3/4

方式1：修改redis.conf

```powershell
maxmemory <bytes>
```

方式2：在redis-cli执行命令

```powershell
config set maxmemory <bytes>
```