(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{412:function(a,s,t){"use strict";t.r(s);var r=t(42),e=Object(r.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"redis主从复制"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#redis主从复制"}},[a._v("#")]),a._v(" redis主从复制")]),a._v(" "),t("h2",{attrs:{id:"_1-redis主从架构示意图"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-redis主从架构示意图"}},[a._v("#")]),a._v(" 1. redis主从架构示意图")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200203094442305.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),a._v(" "),t("h2",{attrs:{id:"_2-主从复制简介"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-主从复制简介"}},[a._v("#")]),a._v(" 2. 主从复制简介")]),a._v(" "),t("p",[a._v("简介：主从复制即将master中的数据及时有效地复制到slave中。\n特征：一个master可以有多个slave，一个slave只对应一个master。\n职责：")]),a._v(" "),t("ul",[t("li",[a._v("master：写数据，同步数据到salve")]),a._v(" "),t("li",[a._v("slave：读数据")])]),a._v(" "),t("h2",{attrs:{id:"_3-主从工作流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-主从工作流程"}},[a._v("#")]),a._v(" 3. 主从工作流程")]),a._v(" "),t("h3",{attrs:{id:"_3-1-建立连接"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-1-建立连接"}},[a._v("#")]),a._v(" 3.1 建立连接")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200203131319126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),a._v(" "),t("h3",{attrs:{id:"_3-2-同步数据"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-2-同步数据"}},[a._v("#")]),a._v(" 3.2 同步数据")]),a._v(" "),t("p",[t("img",{attrs:{src:"https://img-blog.csdnimg.cn/20200203131306330.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MjEwMzAyNg==,size_16,color_FFFFFF,t_70",alt:"在这里插入图片描述"}})]),a._v(" "),t("h2",{attrs:{id:"_4-主从复制配置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-主从复制配置"}},[a._v("#")]),a._v(" 4. 主从复制配置")]),a._v(" "),t("h3",{attrs:{id:"_4-1-操作方式"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-1-操作方式"}},[a._v("#")]),a._v(" 4.1 操作方式")]),a._v(" "),t("p",[a._v("方式1：客户端发送命令")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("slaveof "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("master"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("ip"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("master"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("port"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("p",[a._v("方式2：启动服务器参数")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("server "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("slaveof "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("master"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("ip"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("master"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("port"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("p",[a._v("方式3：服务器配置")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("slaveof "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("master"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("ip"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),a._v("master"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("port"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v("\n")])])]),t("h3",{attrs:{id:"_4-2-操作实例-进入命令行开启主从"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-2-操作实例-进入命令行开启主从"}},[a._v("#")]),a._v(" 4.2 操作实例：进入命令行开启主从")]),a._v(" "),t("blockquote",[t("p",[a._v("master：192.168.25.103:6379\nslave：192.168.25.104:6379")])]),a._v(" "),t("p",[a._v("salve")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("6379")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" slaveof "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("192.168")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".25")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".103")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("6379")]),a._v("\nOK\n")])])]),t("p",[a._v("master：设置name")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("6379")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" set name test\nOK\n")])])]),t("p",[a._v("slave：读取name")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("6379")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(">")]),a._v(" get name\n"),t("span",{pre:!0,attrs:{class:"token string"}},[a._v('"test"')]),a._v("\n")])])]),t("h3",{attrs:{id:"_4-3-操作实例-修改配置文件指定master"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-3-操作实例-修改配置文件指定master"}},[a._v("#")]),a._v(" 4.3 操作实例：修改配置文件指定master")]),a._v(" "),t("p",[a._v("在salve配置文件末尾加入"),t("code",[a._v("salveof master的Ip和端口")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("salveof "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("192.168")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".25")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".103")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("6379")]),a._v("\n")])])]),t("p",[a._v("这时slave一启动就直接变成了从机，不再测试")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("S")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("03")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Feb")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2020")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("04")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("53")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("13.558")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" MASTER "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("->")]),a._v(" REPLICA sync"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" receiving "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("196")]),a._v(" bytes from master\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("S")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("03")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Feb")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2020")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("04")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("53")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("13.559")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" MASTER "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("->")]),a._v(" REPLICA sync"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Flushing")]),a._v(" old data\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("S")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("03")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Feb")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2020")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("04")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("53")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("13.559")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" MASTER "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("->")]),a._v(" REPLICA sync"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Loading")]),a._v(" DB in memory\n"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("S")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("03")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Feb")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("2020")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("04")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("53")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("13.559")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" MASTER "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("<")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("->")]),a._v(" REPLICA sync"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Finished")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("with")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token namespace"}},[a._v("success")]),a._v("\n")])])]),t("h3",{attrs:{id:"_4-4-相关命令"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_4-4-相关命令"}},[a._v("#")]),a._v(" 4.4 相关命令")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("# 查看所有信息\ninfo\n\n# 查看主从信息\ninfo replication \n\n# 断开连接\nslaveof no one\n")])])]),t("h2",{attrs:{id:"_5-注意事项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_5-注意事项"}},[a._v("#")]),a._v(" 5. 注意事项")]),a._v(" "),t("ol",[t("li",[a._v("复制缓冲区大小设置不合理会导致数据溢出使主从数据不一致，主从数据不一致会导致全量复制，所以必须将复制缓冲区设置一个合理的大小。")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("# 复制缓冲区默认为"),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("mb\nrepl"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("blocking"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("size "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("1")]),a._v("mb\n")])])]),t("ol",{attrs:{start:"2"}},[t("li",[a._v("master单机内存占用建议使用50%-70%，留下30%-50%用于执行bgsave命令和创建缓冲区。")]),a._v(" "),t("li",[a._v("slave最好只对外开放读功能，不开放写功能")])]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("slave"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("serve"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("stale"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("data yes"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v("no\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);