#!/usr/bin/env node
const pa = process.argv;
const argv = pa[pa.length - 1];
const { spawn } = require('child_process');
const path = require('path');

switch(argv) {
    case 'dev':
        const c1 = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'start:dll'],
            {
                stdio: 'inherit',
                cwd: path.resolve(__dirname, '..')
            }
        );
        break;
    case 'build':
        const c2 = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'prod'],
            {
                stdio: 'inherit',
                cwd: path.resolve(__dirname, '..')
            }
        );
    case 'build:dll':
        break;
    default: 
        require('../repo');
};
