const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const helper = require('./helper');

module.exports = {
    entry: {
        vendor: ['lodash'],
        //    polyfills: ['./src/polyfills.js'],
        // vendor: ['lodash', 'vue', 'axios', 'vue-router', 'echarts', 'xlsx'],
        // print: './src/print.js'
    },
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"production"'
        }),
        // 清除public目录
        new CleanWebpackPlugin(),
        // new webpack.DllPlugin({
        //     context: helper.resolve('./dist/dll'),
        //     path: helper.resolve('./dist/dll', '[name].manifest.json'),
        //     name: '_dll_[name]_[hash]'
        // })  
    ],
    output: {
        filename: '[name].dll.js',
        path: helper.resolve('./dist/dll'),
        // libraryTarget: 'var',
        library: '_dll_[name]_[hash]'
    }
};