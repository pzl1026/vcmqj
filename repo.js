const download = require('download-git-repo');
const chalk = require('chalk');  
const ora = require('ora');
const path = require("path")  
const fs = require('fs');   //引入node的path模块
const inquirer = require('inquirer');
const promptList = require('./promptList.config');
const pa = process.argv;
global.config = {};

inquirer.prompt(promptList.frameConf).then(answers => {
    global.config.frame = answers.frame;
    readyDownloadDir(answers.frame);
});

// 开始准备下载
function readyDownloadDir (frame) {
    fs.exists(path.resolve(`./${pa[pa.length - 1]}`), function(exists) {
        if (exists) {
            inquirer.prompt(promptList.projectCheckConf).then(answers => {
                if (answers.isProjectCreate) {
                    createProject(frame);
                } else {
                    process.exit();
                }
            });
        } else {
            createProject(frame);
        }
    });
}

// 创建项目
function createProject(frame) {
    const tempDir = frame === 'vue' ? 'github:pzl1026/temp-dir' : '';
    const spinner = ora(chalk.yellow('Create start')).start();

    spinner.color = 'blue';
    spinner.text = 'Creating project directory...';

    download(tempDir, pa[pa.length - 1], function (err) {
        spinner.text = chalk.blue('Project directory created successfully');
        spinner.succeed();
        spinner.stop();
        spinner.clear();
        process.exit();
    });
}

