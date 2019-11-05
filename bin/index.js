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
        // const c2 = spawn(
        //     process.platform === "win32" ? "npm.cmd" : "npm", 
        //     ['run', 'prod:dll'],
        //     {
        //         stdio: 'inherit',
        //         cwd: path.resolve(__dirname)
        //     }
        // );
        // webpack(require('../webpack.dll.config'));
        const configs = require('../webpack.prod');
        console.log(configs.module.rules, 'config.module.rules')
        const compiler = webpack(configs, (err, stats) => {

            if (err) {
                console.error(err.stack || err);
                if (err.details) {
                  console.error(err.details);
                }
                process.exit(1);
                return;
              }
            
              const info = stats.toJson();
            
              if (stats.hasErrors()) {
                console.error(info.errors);
                process.exit(1);
              }
            
              if (stats.hasWarnings()) {
                console.warn(info.warnings);
                process.exit(1);
              }
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false
            }) + '\n\n')
            console.log(chalk.cyan('  Build complete.\n'));
        });
        break;
    default: 
        require('../repo');
};
