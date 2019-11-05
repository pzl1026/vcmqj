 const merge = require('webpack-merge');
 const path = require("path");
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 const vueConfigs = require('./webpack.vue.config');
 const webpack = require('webpack');
 const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//  const WorkboxPlugin = require('workbox-webpack-plugin'); //实现PWA

module.exports = merge(vueConfigs, {
    // devtool: 'source-map',
    mode: "production",
    // output: {
    //     filename: '[name].[hash].js',
    //     chunkFilename: '[name].bundle.js',
    // },
    // optimization: {
    //     splitChunks: {
    //        chunks: "async", // 必须三选一： "initial" | "all"(推荐) | "async" (默认就是async)
    //        minSize: 30000, // 最小尺寸，30000
    //        minChunks: 1, // 最小 chunk ，默认1
    //        maxAsyncRequests: 5, // 最大异步请求数， 默认5
    //        maxInitialRequests : 3, // 最大初始化请求书，默认3
    //        automaticNameDelimiter: '~',// 打包分隔符
    //        name: function(){}, // 打包后的名称，此选项可接收 function
    //        cacheGroups:{ // 这里开始设置缓存的 chunks
    //            priority: 0, // 缓存组优先级
    //            vendor: { // key 为entry中定义的 入口名称
    //                chunks: "initial", // 必须三选一： "initial" | "all" | "async"(默认就是async) 
    //                test: /react|lodash/, // 正则规则验证，如果符合就提取 chunk
    //                name: "vendor", // 要缓存的 分隔出来的 chunk 名称 
    //                minSize: 30000,
    //                minChunks: 1,
    //                enforce: true,
    //                maxAsyncRequests: 5, // 最大异步请求数， 默认1
    //                maxInitialRequests : 3, // 最大初始化请求书，默认1
    //                reuseExistingChunk: true // 可设置是否重用该chunk
    //            }
    //        }
    //     }
    // },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "initial",
            automaticNameDelimiter: '.',
            // name: 'common',
            cacheGroups: {
                commons: {
                    minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
                    minSize: 0,
                },

                // vendor: {
                //     name: "common",
                // }
    
            }
        }
    },
    plugins: [
        new UglifyJSPlugin({
            sourceMap: true
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        // new BundleAnalyzerPlugin(),
        // new WorkboxPlugin.GenerateSW({
        //     // 这些选项帮助 ServiceWorkers 快速启用
        //     // 不允许遗留任何“旧的” ServiceWorkers
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
    ]
 });