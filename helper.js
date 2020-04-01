const path = require("path");
const CWD = process.cwd();

function resolve (dir) {
    return path.join(process.cwd(), dir);
}

function getPublicPathAndBase (outPublicPath) {
    console.log(outPublicPath, 'outPublicPath');
    let publicPath = '/static', basePath = 'static';
    try{
        publicPath = outPublicPath;
    }catch(e){};
    console.log(publicPath, 'publicPath');
    publicPath.replace(/((?:(?:https|http?:)?\/\/[\w-]+(?:\.\w+)+)?\/?)?(.*)/, function(all, domain, base){
        publicPath = domain || '';
        basePath = base;
    });

    return {
        publicPath, 
        basePath
    }
}

// 显示进度
const progress = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(percentage, message, ...args);
};

module.exports = {
    getPublicPathAndBase,
    resolve,
    progress
};