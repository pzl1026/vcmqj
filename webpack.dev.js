 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const vueConfigs = require('./webpack.vue.config');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const config = require('./bin/conf');

module.exports = merge(vueConfigs, {
    devtool: 'inline',
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
        historyApiFallback: {
            rewrites: [
                { from: /.*/, to: '/index.html' },
            ]
        },
        hot: true,
        compress: true,
        open: true,
        overlay: true,
        publicPath: '/',
        quiet: false
    },
});