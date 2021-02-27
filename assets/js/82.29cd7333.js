(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{436:function(s,a,t){"use strict";t.r(a);var r=t(42),e=Object(r.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"docker安装nginx"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#docker安装nginx"}},[s._v("#")]),s._v(" Docker安装Nginx")]),s._v(" "),t("h2",{attrs:{id:"_1-复制容器内的配置文件"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_1-复制容器内的配置文件"}},[s._v("#")]),s._v(" 1. 复制容器内的配置文件")]),s._v(" "),t("p",[s._v("1.创建一个nginx容器")]),s._v(" "),t("div",{staticClass:"language-powershell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-powershell"}},[t("code",[s._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p 80:80 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("name nginx nginx:1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("16"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("1\n")])])]),t("p",[s._v("2.复制容器内的配置文件到当前目录")]),s._v(" "),t("div",{staticClass:"language-powershell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-powershell"}},[t("code",[s._v("docker container "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("cp")]),s._v(" nginx:"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("\n")])])]),t("p",[s._v("3.改名并移动到"),t("code",[s._v("~/docker/nginx/conf")]),s._v("目录")]),s._v(" "),t("div",{staticClass:"language-powershell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-powershell"}},[t("code",[s._v("mkdir "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p ~"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("mv")]),s._v(" nginx ~"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("conf\n")])])]),t("p",[s._v("4.删除容器")]),s._v(" "),t("div",{staticClass:"language-powershell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-powershell"}},[t("code",[s._v("docker stop nginx\ndocker "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("rm")]),s._v(" nginx\n")])])]),t("h2",{attrs:{id:"_2-创建nginx容器"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_2-创建nginx容器"}},[s._v("#")]),s._v(" 2. 创建nginx容器")]),s._v(" "),t("div",{staticClass:"language-powershell extra-class"},[t("pre",{pre:!0,attrs:{class:"language-powershell"}},[t("code",[s._v("docker run "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("d "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("p 80:80 "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("name nginx "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("--")]),s._v("privileged=true \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("v ~"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("html:"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("usr"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("share"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("html \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("v ~"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("logs:"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("log"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx \\\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v("v ~"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("docker"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("conf:"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("etc"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("/")]),s._v("nginx \\\nnginx:1"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("16"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),s._v("1\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);