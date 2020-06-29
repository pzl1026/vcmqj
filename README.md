# vcmqj

名气家前端构建脚手架,webpack4，由于项目仅使用了 vue 框架，所以仅对 vue 进行了处理

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
|  ├─conf.js  //不分环境的公共配置,启动必会运行的配置
|  ├─proxy.js  //mocker数据请求代理
|  ├─mocker //mocker数据
|  ├─env   //每个人可根据各个环境进行不同配置
```

### conf

可自定义使用 webpack 配置，domains 与 nomocker 不是 webpack 配置

```js
// 开发环境
const webpack = require('webpack');

module.exports = {
  domains: {
    test1: 'http://test1.xxx.com/', //根据命令:test1所执行的文件
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://xxxx.api.com', //没有加:指定代理时，默认代理
        changeOrigin: true,
      },
    },
  },
  nomocker: true, //是否启用模拟数据
  output: {
    publicPath: '/static',
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};

// 生产环境
// 生产环境的静态资源跟运维配置有关，pablicpath需要跟服务器域名对应起来，
var webpack = require('webpack');
const CopyPlugin = require('mqj/plugins/copy');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

function resolve(dir) {
  return path.join(process.cwd(), dir);
}

module.exports = {
  output: {
    publicPath: '//xxx.com/目录',
  },
  plugins: [
    // 清除dist目录和output目录
    new CleanWebpackPlugin([resolve('output'), resolve('dist')], {
      allowExternal: true,
    }),

    // 用作部署使用，生成output/static和output/views，便于运维部署
    new CopyPlugin([
      {
        from: 'dist',
        to: 'output/static',
        include: 'dist/目录',
      },
      {
        from: 'dist',
        to: 'output/views',
        exclude: 'dist/目录',
      },
    ]),

    new CopyWebpackPlugin([
      //---这里将static文件输出到特定的文件夹
      {
        from: path.resolve(__dirname, '../../static'),
        to: path.resolve('dist/目录', 'assets'),
        ignore: ['.*'],
      },
    ]),
  ],
};
```

### 使用方式

```js
// 创建基本项目
vcmqj -p [文件名]

// 开发环境
vcmqj -d [conf/env文件夹js文件名] :[运行文件名下的指定的domain]
vcmqj -d dev :test1  //即执行的是conf/env/dev.js下的test1代理

// 生产环境
vcmqj -b [conf/env文件夹js文件名]
vcmqj -b production //即执行的是conf/env/production.js
```

### 注意

1.7 版本之前不支持多个代理，即 1.6 的 domains，每个属性为字符串，只能代理一个域名，1.7 之后字符串改为了相对应的代理，可多个代理
