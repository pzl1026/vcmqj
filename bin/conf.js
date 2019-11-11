const path = require("path");
const CWD = process.cwd();

module.exports = require(path.join(CWD, `conf/${global.confFile || 'test'}.js`));