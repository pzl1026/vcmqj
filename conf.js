const path = require("path");

const CWD = process.cwd();
const confFile = process.argv[process.argv.length - 1];

module.exports = !['dev', 'build'].includes(confFile) ? require(path.join(CWD, `conf/${confFile}.js`)) : {};