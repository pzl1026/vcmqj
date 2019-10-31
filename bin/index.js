#!/usr/bin/env node
const pa = process.argv;
const argv = pa[pa.length - 1];
const frame = pa[pa.length - 2];
const { spawn } = require('child_process');
const path = require('path');
// global.CURRENT_PATH = process.cwd();
process.current_path = process.cwd();
// process.argv.push('--config', path.join(__dirname, '../index.js'));
console.log(process.current_path, 'process.argv')

switch(argv) {
    case 'dev':
        const c1 = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'start:dll', process.cwd()],
            {
                stdio: 'inherit',
                cwd: path.resolve(__dirname)
            }
        );
        break;
    case 'build':
        const c2 = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'prod', process.cwd()],
            {
                stdio: 'inherit',
                cwd: path.resolve(__dirname)
            }
        );
    case 'build:dll':
        break;
    default: 
        require('../repo');
};
