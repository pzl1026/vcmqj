const webpack = require('webpack');
const path = require("path");
const webpackDevServer = require('webpack-dev-server');
const apiMocker = require('webpack-api-mocker');
const fs = require("fs");
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const conf = require('./bin/conf');
const CWD= process.cwd();
const mockFiles = fs.readdirSync(path.resolve(CWD, './mock'));

const options = {
    // contentBase: './dist',
    // hot: true,
    // host: 'localhost',
    // compress: true,
    // historyApiFallback: true,
    // open: true,
    // overlay: true,
    // progress: true,
    // watchOptions: {
    //   ignored: /node_modules/,
    //   aggregateTimeout: 300,
    //   poll: 1000
    // },
    // before(app){
    //   mockFiles && mockFiles.forEach((item) => {
    //     apiMocker(app, path.resolve(CWD, `./mock/${item}`))
    //   });
    // },
    // ...conf.devServer
    
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 300,
      poll: 1000
    },
    disableHostCheck: true,
    historyApiFallback: true,
    hot: true,
    compress: true,
    open: true,
    overlay: true,
    publicPath: '/',
    quiet: false,
    progress: true,
    // proxy: {
    //   '/api': {
    //       target: 'http://dev-manage-chenyinfei.mingqijia.com/',
    //       // pathRewrite: {'^/api' : ''}
    //       changeOrigin: true,
    //       // pathRewrite: { '^/api': '/api' }
    //       // secure: false,
    //       // // changeOrigin: true,
    //       // pathRewrite: {
    //       //  "^/api": "/api"
    //       // },
    //   }
    // },
    ...conf.devServer
};

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
webpackDevServer.addDevServerEntrypoints(config, options);
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));
const server = new webpackDevServer(compiler, options);

// Serve the files on port 3000.
server.listen(conf.port || 8080, function () {
  console.log('Example app listening on port 3000!\n');
});

// const webpackDevMiddleware = require('webpack-dev-middleware');

// const app = express();
