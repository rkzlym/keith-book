(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{374:function(a,s,t){"use strict";t.r(s);var r=t(42),e=Object(r.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"docker安装mysql"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker安装mysql"}},[a._v("#")]),a._v(" Docker安装Mysql")]),a._v(" "),t("h2",{attrs:{id:"_1-创建容器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-创建容器"}},[a._v("#")]),a._v(" 1. 创建容器")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("name mysql "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("e MYSQL_ROOT_PASSWORD"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("root "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("net"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v("host \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("logs"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("errlog"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("discard"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("errlog \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("logs"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("binlog"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("discard"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("logdir"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("binlog \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("logs"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redolog"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("discard"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("logdir"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redolog \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("tmpdir"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("discard"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("tmpdir \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("logs"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("slowlog"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("discard"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("slowlog \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("discard"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("other \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("conf"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("conf"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("d \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("privileged"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v(" mysql\n")])])]),t("h2",{attrs:{id:"_2-进入容器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-进入容器"}},[a._v("#")]),a._v(" 2. 进入容器")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("docker exec "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("it mysql "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("bin"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("bash\n")])])]),t("h2",{attrs:{id:"_3-找到容器内配置文件位置"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-找到容器内配置文件位置"}},[a._v("#")]),a._v(" 3. 找到容器内配置文件位置")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("mysql "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("help "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("|")]),a._v(" grep my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("cnf\n\n# 按照路径优先排序，可能出现在以下路径，本人路径为 "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("cnf\norder of preference"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("cnf"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" $MYSQL_TCP_PORT"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("cnf "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("mysql"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("cnf "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("~")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("my"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("cnf \n")])])]),t("p",[a._v("将配置文件内容复制一份到"),t("code",[a._v("/docker/mysql/conf")]),a._v("，然后就可以根据自己的需求修改配置了。")])])}),[],!1,null,null,null);s.default=e.exports}}]);