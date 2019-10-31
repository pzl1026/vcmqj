# wp-vue
vue构建

## 所遇到的坑：
1. css代码分离时，所安装的extract-text-webpack-plugin版本与webpack版本不兼容，可能会报错，只要安装@next就可以了；<br/>
2. tree-shaking: package里所设置的"sideEffects": false设置为"sideEffects": ["*.css"]，不然css不能实现代码分割打包；<br/>
3. CommonsChunkPlugin已移除，使用splitChunks，与entry同级，配置如下：<br/>
(```)
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                commons: {
                    minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0
                }
            }
        }
    },
(```)
4. output的filename被chunkFilename所覆盖，具体区别https://juejin.im/post/5cede821f265da1bbd4b5630#heading-2；<br/>
5. 编译报错：ERROR in app.bundle.js from UglifyJs，可能是babel版本不对，如果没有安装，js就尽量不用es2015去写，不然也会报这个错；<br/>



## 接下来要做的事
1. vue、react配置，静态资源的配置完善
2. 设置配置文件conf，如：proxy，port，mocker，output，是否开启eslint
3. 部署
4。是否可以发布到github网站
