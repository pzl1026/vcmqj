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
// vue: 'Vue',
// 'vue-router': 'vue-router',
const config2 = merge(vueConfigs, {
    devtool: 'cheap-eval-source-map',
    externals : {
        lodash: '_',
        vue: 'Vue',
        'vue-router': 'VueRouter',
        echarts: 'echarts'
    },
    
    mode: 'development',
    plugins: [
        // new ManifestPlugin(),
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
});

module.exports = config2;