# **Vue脚手架**

全局安装 3.x 的vue脚手架

npm install -g @vue/cli

查看vue版本

vue -V

## **创建Vue项目**

进入交互式面板

vue create vue-demo

Step1: 选择安装方式 - 自定义安装

\> Manually select features

Step2: 选择需要哪些功能（单击空格选择）

\> Choose Vue version

\> Babel

\> Router

\> Linter / Formatter

Step3: 选择Vue版本

\> 3.x (Preview)

Step4: 使用历史模式的路由？

\> No

Step5: ESLint 版本

\> ESLint + Standard config

\> Lint on Save

Step6: 配置文件是单独创建还是维护在package.json

\> In dedicated config files

Step7: 是否为此创建模板

\> N

## **Vue脚手架自定义配置**

在根目录下创建 vue.config.js 来配置自定义配置信息

```
module.exports = {
    devServer: {
        port: 8888
    }
}
```