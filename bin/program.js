const program = require('commander');
const path = require('path');
const packageData = require(path.resolve(__dirname, '../package.json'));

program
    .option('-p, --project-name <projectName>', 'create project')
    .option('-d, --dev-conf <confFile>', 'server starting')
    .option('-b, --build-conf <confFile>', 'project compiling')
    .version(packageData.version)

program.parse(process.argv);

// if (program.debug) console.log(program.opts());
// console.log('pizza details:');
// if (program.small) console.log('- small pizza size');
// if (program.pizzaType) console.log(`- ${program.pizzaType}`);
module.exports = program;