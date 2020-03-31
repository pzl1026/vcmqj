const path = require("path");
const CWD = process.cwd();
console.log(global.confFile, 'global.confFile');
module.exports = require(path.join(CWD, `conf/env/${global.confFile || 'test'}.js`));