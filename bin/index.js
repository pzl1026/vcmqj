#!/usr/bin/env node
const pa = process.argv;
const argv = pa[pa.length - 1];
const { spawn } = require('child_process');
const path = require('path');

switch(argv) {
    case 'dev':
        require('../server');
        break;
    case "build":
        const compile = spawn(
            process.platform === "win32" ? "npm.cmd" : "npm", 
            ['run', 'prod'],
            {
                stdio: 'inherit',cwd: path.resolve(__dirname, '..')
            }
        );
        break;
    default: 
        require('../repo');
};
