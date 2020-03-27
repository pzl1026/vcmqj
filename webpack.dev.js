 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const vueConfigs = require('./webpack.vue.config');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./bin/conf');
const apiMocker = require('webpack-api-mocker');
const path = require('path');
const CWD = process.cwd();
// var proxy = require(path.join(CWD, './conf/env/pzl.js'));

// console.log(proxy, 'proxy');
// console.log(path.join(CWD, './conf/mocker.js'), 'kkk')
const config2 = merge(vueConfigs, {
    devtool: 'cheap-eval-source-map',
    // devServer: {
    //     contentBase: './dist',
    //     hot: true,
    //     compress: true,
    //     historyApiFallback: true,
    //     open: true,
    //     overlay: true,
    //     progress: true
    // },
    
    mode: 'development',
    plugins: [
        new ManifestPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            MOCK: config.mock || true
        }),
        // new webpack.SourceMapDevToolPlugin({
        //     filename: '[name].[hash].js.map',
        //     exclude: ['vendor.js']
        // })
    ],
    devServer: {
        disableHostCheck: true,
        historyApiFallback: true,
        hot: true,
        compress: true,
        open: true,
        overlay: true,
        publicPath: '/',
        quiet: false,
        // allowedHosts: [
        //     'http://dev-manage-chenyinfei.mingqijia.com'
        // ],
        // before: function(app){
        //     console.log(73737737373)
        //     apiMocker(app, path.resolve(CWD, 'conf/mocker.js'), {
        //         proxy: {
        //             '/api': {
        //                 target: 'http://dev-manage-chenyinfei.mingqijia.com/',
        //                 // pathRewrite: {'^/api' : ''}
        //                 changeOrigin: true,
        //                 // pathRewrite: { '^/api': '/api' }
        //                 secure: false,
        //                 // // changeOrigin: true,
        //                 // pathRewrite: {
        //                 // "^/api": "/api"
        //                 // },
        //             }
        //         },
        //         changeHost: true
        //     })
        // },
        proxy: {
            '/api': {
                target: 'http://dev-manage-chenyinfei.mingqijia.com/',
                // pathRewrite: {'^/api' : ''}
                changeOrigin: true,
                // pathRewrite: { '^/api': '/api' }
                // secure: false,
                // // changeOrigin: true,
                // pathRewrite: {
                //  "^/api": "/api"
                // },
            }
        }
    },
});

module.exports = config2;