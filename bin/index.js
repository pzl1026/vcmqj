#!/usr/bin/env node
const pa = process.argv;
const argv = pa[pa.length - 1];
const { spawn, fork } = require('child_process');
const path = require('path');
const webpack = require('webpack');
const chalk = require('chalk');
// global.CURRENT_PATH = process.cwd();
const CWD= process.cwd();
// process.argv.push('--config', path.join(__dirname, '../index.js'));

switch(argv) {
    case 'dev':
        // const c1 = spawn(
        //     process.platform === "win32" ? "npm.cmd" : "npm", 
        //     ['run', 'start:dll', CWD],
        //     {
        //         stdio: 'inherit',
        //         cwd: path.resolve(__dirname)
        //     }
        // );
        webpack(require('../webpack.dll.config'),  (err, stats) => {
            if (err) throw err;

            if (stats.hasErrors()) {
                console.log(chalk.red('Build failed with errors.\n'));
                process.exit(1);
            }
            require('../server');
        });
        break;
    case 'prod':
        const c2 = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'prod:dll'],
            {
                stdio: 'inherit',
                cwd: path.resolve(__dirname)
            }
        );
        // webpack(require('../webpack.dll.config'));
        // const configs = require('../webpack.prod');
        // console.log(configs, 'config2')
        // const compiler = webpack(configs, (err, stats) => {
        //     console.log(stats.hasErrors(), 'err')
        //     console.log(stats.hasWarnings(), 'eee')
        // });
        // const watching = compiler.watch({
        //     // watchOptions 示例
        //     aggregateTimeout: 300,
        //     poll: undefined
        //   }, (err, stats) => {
        //     // 在这里打印 watch/build 结果...
        //     console.log(stats, 'statts');
        //   });
        break;
    default: 
        require('../repo');
};
