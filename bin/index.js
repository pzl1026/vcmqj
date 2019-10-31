#!/usr/bin/env node
const pa = process.argv;
const argv = pa[pa.length - 1];
const frame = pa[pa.length - 2];
const { spawn, fork } = require('child_process');
const path = require('path');
// global.CURRENT_PATH = process.cwd();
const CWD= process.cwd();
// process.argv.push('--config', path.join(__dirname, '../index.js'));

switch(argv) {
    case 'dev':
        const c1 = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'start:dll', CWD],
            {
                stdio: 'inherit',
                cwd: path.resolve(__dirname)
            }
        );
        break;
    case 'build':
        const c2 = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'prod:dll'],
            {
                stdio: 'inherit',
                cwd: path.resolve(__dirname)
            }
        );
        break;
    case 'build:dll':
        break;
    default: 
        require('../repo');
};
