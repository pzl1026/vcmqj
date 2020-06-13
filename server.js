const webpack = require('webpack');
const path = require("path");
const webpackDevServer = require('webpack-dev-server');
const apiMocker = require('webpack-api-mocker');
const fs = require("fs");
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const conf = require('./bin/conf');
const CWD= process.cwd();
// const mockFiles = fs.readdirSync(path.resolve(CWD, './mock'));
console.log(2223344)
const options = {
    watchOptions: {
      ignored: /node_modules/,
      aggregateTimeout: 100,
      poll: 100
    },
    disableHostCheck: true,
    historyApiFallback: {
        rewrites: [
            { from: /.*/, to: '/index.html' },
        ]
    },
    hot: true,
    compress: true,
    open: true,
    overlay: true,
    // progress: true,
    publicPath: '/',
    quiet: false,
    ...conf.devServer
};

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
webpackDevServer.addDevServerEntrypoints(config, options);
const server = new webpackDevServer(compiler, options);
// Serve the files on port 3000.
require('./port').then(port => {
  let p = conf.port || port;
  server.listen(p, '', function (res) {
    console.log(`listening on port ${p}!\n`);
  });
})
