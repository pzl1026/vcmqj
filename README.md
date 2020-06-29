# vcmqj

名气家前端构建脚手架

### 安装

```js
npm i vcmqj -g
npm i vcmqj -D
```

### 目录配置

```js
├─.babelrc //babel配置
├─.eslintrc.js //eslint配置
├─.gitignore
├─README.md
├─index.html  //通用模板
├─package.json
├─static  // 不需要变异的静态资源
├─src
|  ├─index.css
|  ├─index.js  //入口
|  ├─widgets  //业务组建
|  ├─views    //page组件
|  ├─router   //路由
|  ├─components  //通用组件
├─conf
|  ├─conf.js  //不分环境的公共配置
|  ├─proxy.js  //mocker数据请求代理
|  ├─mocker //mocker数据
|  ├─env   //每个人可根据各个环境进行不同配置
```

### v1.6
