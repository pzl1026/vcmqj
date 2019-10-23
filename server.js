// const express = require('express');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
// const inquirer = require('inquirer');
// const promptList = require('./promptList.config');
const fs = require("fs");
global.config = {};

// inquirer.prompt(promptList.frameConf).then(answers => {
//     console.log(answers); // 返回的结果
// });

// global.config.frame = answers.frame;
const config = require('./webpack.dev.js');
console.log(config.module.rules, 'config')
console.log( process.argv, 'process.env.NODE_ENV');
const compiler = webpack(config);

const options = {
    contentBase: './dist',
    hot: true,
    host: 'localhost'
};

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.
webpackDevServer.addDevServerEntrypoints(config, options);
// app.use(webpackDevMiddleware(compiler, {
//   publicPath: config.output.publicPath
// }));
const server = new webpackDevServer(compiler, options);

// Serve the files on port 3000.
server.listen(3000, function () {
  console.log('Example app listening on port 3000!\n');
});

// const webpackDevMiddleware = require('webpack-dev-middleware');

// const app = express();
