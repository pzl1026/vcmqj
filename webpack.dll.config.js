const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const helper = require('./helper');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
console.log(77)
module.exports = {
    entry: {
        vendor: ['lodash'],
        //    polyfills: ['./src/polyfills.js'],
        // lodash: ['lodash', 'vue', 'axios', 'vue-router', 'echarts', 'xlsx'],
        // print: './src/print.js'
        vendor1: ['lodash','vue', 'vue-router'],
        vendor2: ['axios', 'xlsx'],
        vendor2: ['echarts']
    },
    performance: {
        maxAssetSize: 1000000,
        maxEntrypointSize: 4000000
    },
    // resolve: {
	// 	extensions: [".js", ".jsx"]
	// },
    mode: 'production',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': '"production"'
        }),
        // 清除public目录
        new CleanWebpackPlugin(),
        // new webpack.DllPlugin({
        //     // context: helper.resolve('./dist/dll'),
        //     path: helper.resolve('./dist/dll', '[name].manifest.json'),
        //     name: '_dll_[name]_[hash]'
        // })  
        new webpack.DllPlugin({
            context: helper.resolve(),
            name: '_dll_[name]_[hash]',
            path: path.join(helper.resolve(), 'manifest.json'),
        })
    ],
    output: {
        filename: '[name].dll.js',
        path: helper.resolve('./dist/dll'),
        // libraryTarget: 'var',
        library: '_dll_[name]_[hash]'
    }
};