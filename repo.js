const download = require('download-git-repo');
const chalk = require('chalk');  
const ora = require('ora');
const path = require("path")  
const fs = require('fs');   //引入node的path模块
const inquirer = require('inquirer');
const promptList = require('./promptList.config');

fs.exists(path.resolve('./test'), function(exists) {
    if (exists) {
        inquirer.prompt(promptList.projectCheckConf).then(answers => {
            if (answers.isProjectCreate) {
                createProject();
            } else {
                process.exit();
            }
        });
    } else {
        createProject();
    }
});

function createProject() {
    const spinner = ora('开始创建新的目录').start();
    spinner.color = 'blue';
    spinner.text = 'Creating project directory...';
    download('github:pzl1026/temp-dir', 'test/tmp', function (err) {
        spinner.text = chalk.blue('Project directory created successfully');
        spinner.succeed();
        spinner.stop();
        spinner.clear();
        process.exit();
    });
}

