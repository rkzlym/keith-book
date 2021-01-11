![在这里插入图片描述](https://img-blog.csdnimg.cn/20210109180903698.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)

```shell
yum install -y wget
wget http://download.redis.io/releases/redis-5.0.5.tar.gz
tar xf redis-5.0.5.tar.gz
cd redis-5.0.5
make
yum install -y gcc
make distclean
make
cd src
cd ..
make install PREFIX=/opt/my/redis5
vi /etc/profile
export REDIS_HOME=/opt/my/redis5
export PATH=$PATH:$REDIS_HOME/bin
source /etc/profile

cd utils
./install_server.sh

```

