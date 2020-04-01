const path = require("path");
const CWD = process.cwd();

module.exports = require(path.join(CWD, `conf/env/${global.confFile || 'test'}.js`));