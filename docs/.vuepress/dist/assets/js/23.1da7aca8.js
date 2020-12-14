(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{373:function(a,s,t){"use strict";t.r(s);var r=t(42),e=Object(r.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"docker安装redis"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker安装redis"}},[a._v("#")]),a._v(" Docker安装Redis")]),a._v(" "),t("h2",{attrs:{id:"_1-创建配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-创建配置文件"}},[a._v("#")]),a._v(" 1. 创建配置文件")]),a._v(" "),t("h4",{attrs:{id:"_1-1-创建目录"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-1-创建目录"}},[a._v("#")]),a._v(" 1.1 创建目录")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("mkdir "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("p "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("conf\n")])])]),t("h4",{attrs:{id:"_1-2-将配置文件复制进去"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-2-将配置文件复制进去"}},[a._v("#")]),a._v(" 1.2 将配置文件复制进去")]),a._v(" "),t("p",[a._v("找一份配置文件将其复制进去\n修改以下参数")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("# 将其注释\n# bind "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("127.0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".0")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v(".1")]),a._v("\n\n# 将其注释，因为与docker的"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d冲突\n# daemonize yes\n")])])]),t("h2",{attrs:{id:"_2-创建容器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建容器"}},[a._v("#")]),a._v(" 2. 创建容器")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("d "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("p "),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("6379")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token number"}},[a._v("6379")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("name redis "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("privileged"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),t("span",{pre:!0,attrs:{class:"token boolean"}},[a._v("true")]),a._v(" \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("data \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("v "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("conf"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("conf"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("conf \\\nredis redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("server "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("/")]),a._v("redis"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(".")]),a._v("conf \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("--")]),a._v("appendonly yes\n")])])]),t("h2",{attrs:{id:"_3-运行容器中的redis客户端"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_3-运行容器中的redis客户端"}},[a._v("#")]),a._v(" 3. 运行容器中的redis客户端")]),a._v(" "),t("div",{staticClass:"language-java extra-class"},[t("pre",{pre:!0,attrs:{class:"language-java"}},[t("code",[a._v("docker exec "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("it redis redis"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("-")]),a._v("cli\n")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);