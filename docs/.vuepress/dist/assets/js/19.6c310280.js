(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{377:function(e,t,o){"use strict";o.r(t);var c=o(42),_=Object(c.a)({},(function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"docker基本操作"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#docker基本操作"}},[e._v("#")]),e._v(" Docker基本操作")]),e._v(" "),o("h2",{attrs:{id:"_1-镜像操作"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-镜像操作"}},[e._v("#")]),e._v(" 1. 镜像操作")]),e._v(" "),o("ol",[o("li",[e._v("检查linux版本，必须是3.10以上\nuname -r")]),e._v(" "),o("li",[e._v("安装docker\nyum -y install docker")]),e._v(" "),o("li",[e._v("启动docker\nsystemctl start docker")]),e._v(" "),o("li",[e._v("停止docker\nsystemctl stop docker")]),e._v(" "),o("li",[e._v("设置开机启动\nsystemctl enable docker")]),e._v(" "),o("li",[e._v("帮助命令\ndocker --help")]),e._v(" "),o("li",[e._v("搜索镜像\ndocker search "),o("code",[e._v("mysql")])]),e._v(" "),o("li",[e._v("拉取镜像\ndocker pull "),o("code",[e._v("mysql")]),e._v("\n可以拉取指定版本\ndocker pull "),o("code",[e._v("mysql:5.5")])]),e._v(" "),o("li",[e._v("查询本地镜像\ndocker images")]),e._v(" "),o("li",[e._v("删除本地镜像（根据 IMAGE_ID）\ndocker rmi "),o("code",[e._v("0f3e07c0138f")])])]),e._v(" "),o("h2",{attrs:{id:"_2-容器操作"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-容器操作"}},[e._v("#")]),e._v(" 2. 容器操作")]),e._v(" "),o("ol",[o("li",[e._v("创建并启动容器 (-d 表示后台运行)\ndocker run --name "),o("code",[e._v("mytomcat")]),e._v(" -d "),o("code",[e._v("tomcat:latest")])]),e._v(" "),o("li",[e._v("查看创建了哪些容器\ndocker ps -a")]),e._v(" "),o("li",[e._v("查看哪些容器正在运行\ndocker ps")]),e._v(" "),o("li",[e._v("停止容器 （根据 容器名称 或 容器ID）\ndocker stop "),o("code",[e._v("mytomcat")])]),e._v(" "),o("li",[e._v("启动容器 （根据 容器名称 或 容器ID）\ndocker start "),o("code",[e._v("mytomcat")])]),e._v(" "),o("li",[e._v("删除容器（根据 容器名称 或 容器ID）\ndocker rm "),o("code",[e._v("mytomcat")])]),e._v(" "),o("li",[e._v("配置端口映射（-p）主机端口：容器端口\ndocker run --name "),o("code",[e._v("mytomcat")]),e._v(" -d -p "),o("code",[e._v("8888:8080")]),e._v(" tomcat:latest\n可以使用一个镜像启动多个容器 例如：启动3个Tomcat服务器，端口为8881,8882,8883\ndocker run --name "),o("code",[e._v("mytomcat1")]),e._v(" -d -p "),o("code",[e._v("8881:8080")]),e._v(" tomcat:latest\ndocker run --name "),o("code",[e._v("mytomcat2")]),e._v(" -d -p "),o("code",[e._v("8882:8080")]),e._v(" tomcat:latest\ndocker run --name "),o("code",[e._v("mytomcat3")]),e._v(" -d -p "),o("code",[e._v("8883:8080")]),e._v(" tomcat:latest")]),e._v(" "),o("li",[e._v("查看容器日志\ndocker logs "),o("code",[e._v("mytomcat")])]),e._v(" "),o("li",[e._v("进入容器（exit 命令退出）\ndocker exec -it "),o("code",[e._v("mytomcat")]),e._v(" bash")]),e._v(" "),o("li",[e._v('镜像提交\ndocker commit -m="提交的描述信息" -a="作者" 容器ID 要创建的目标镜像名:[标签名]')])]),e._v(" "),o("p",[e._v("更多命令："),o("a",{attrs:{href:"https://docs.docker.com/engine/reference/commandline/docker",target:"_blank",rel:"noopener noreferrer"}},[e._v("https://docs.docker.com/engine/reference/commandline/docker"),o("OutboundLink")],1)])])}),[],!1,null,null,null);t.default=_.exports}}]);