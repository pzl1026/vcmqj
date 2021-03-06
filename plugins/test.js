function TestPlugin() {}

TestPlugin.prototype.apply = function(compiler) {
  // 设置回调来访问 compilation 对象：
  compiler.plugin('compilation', function(compilation) {
    // 现在，设置回调来访问 compilation 中的步骤：
    compilation.plugin('optimize', function(a) {
      console.log('Assets are being optimized.');
    });
  });
  compiler.plugin('emit', function(compilation) {
    console.log(compilation.assets, 'jjj');
    console.log('编译完成');
  });
};

module.exports = TestPlugin;
