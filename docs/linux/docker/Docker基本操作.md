# Docker基本操作
## 1. 镜像操作
1. 检查linux版本，必须是3.10以上
uname -r
2. 安装docker
yum -y install docker 
3. 启动docker
systemctl start docker
4. 停止docker
systemctl stop docker
5. 设置开机启动
systemctl enable docker
6. 帮助命令
docker --help
7. 搜索镜像
docker search <code>mysql</code>
8. 拉取镜像
docker pull <code>mysql</code>
可以拉取指定版本
docker pull <code>mysql:5.5</code>
9. 查询本地镜像
docker images
10. 删除本地镜像（根据 IMAGE_ID）
 docker rmi <code>0f3e07c0138f</code>
 
## 2. 容器操作
1. 创建并启动容器 (-d 表示后台运行)
docker run --name <code>mytomcat</code> -d <code>tomcat:latest</code>
2. 查看创建了哪些容器
docker ps -a
3. 查看哪些容器正在运行
docker ps
4. 停止容器 （根据 容器名称 或 容器ID）
docker stop <code>mytomcat</code>
5. 启动容器 （根据 容器名称 或 容器ID）
docker start <code>mytomcat</code>
6. 删除容器（根据 容器名称 或 容器ID）
docker rm <code>mytomcat</code>
7. 配置端口映射（-p）主机端口：容器端口
docker run --name <code>mytomcat</code> -d -p <code>8888:8080</code> tomcat:latest
可以使用一个镜像启动多个容器 例如：启动3个Tomcat服务器，端口为8881,8882,8883
docker run --name <code>mytomcat1</code> -d -p <code>8881:8080</code> tomcat:latest
docker run --name <code>mytomcat2</code> -d -p <code>8882:8080</code> tomcat:latest
docker run --name <code>mytomcat3</code> -d -p <code>8883:8080</code> tomcat:latest
8. 查看容器日志
docker logs <code>mytomcat</code>
9. 进入容器（exit 命令退出）
docker exec -it <code>mytomcat</code> bash 
10. 镜像提交
docker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]

更多命令：[https://docs.docker.com/engine/reference/commandline/docker](https://docs.docker.com/engine/reference/commandline/docker)