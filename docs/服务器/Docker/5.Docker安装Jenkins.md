# Docker安装Jenkins
## 1. 拉取Jenkins镜像
官方推荐使用的镜像是jenkinsci/blueocean，该镜像包含当前的长期支持 (LTS) 的 Jenkins 版本 (可以生产使用) ，并捆绑了所有 Blue Ocean 插件和功能。
```
docker pull jenkinsci/blueocean
```
## 2.安装Jenkins镜像
需要修改下目录权限, 因为当映射本地数据卷时，/docker/jenkins目录的拥有者为root用户，而容器中jenkins user的uid为1000
执行如下命令即可：
```
chown -R 1000:1000 /docker/jenkins
```
修改完权限后执行下面命令
```
docker run \
  --name jenkins \
  -d \
  -p 8000:8080 \
  -p 50000:50000 \
  -v /docker/jenkins:/var/jenkins_home \
  jenkinsci/blueocean
```
## 3. 配置Jenkins
输入地址+端口即可访问Jenkins页面，第一次进入需等待一段时间。
1. 输入jenkins配置文件中的密码解锁jenkins
2. 安装插件
3. 配置用户
4. 登录

最终来到如下页面
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207161502504.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
#### 4. 配置maven、jdk、git
1. 在插件管理中安装 Maven Integration
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207163740787.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
2. 进入容器查询jdk和git的路径
```
# 进入容器
docker exec -it jenkins /bin/bash
# 获取jdk的路径
echo $JAVA_HOME
# 获取git的路径
which git
```
3. 配置路径

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207164556405.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
4. 配置maven为自动安装
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207172617230.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
#### 5. 构建项目
1. 选择构建一个maven项目
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207172653866.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
2. 在源码管理中输入自己的git项目地址，并选择分支
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207172803890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
3. 点击构建
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207173051339.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70)
4. 完成
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201207173113825.png)

