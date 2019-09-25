 const merge = require('webpack-merge');
 const common = require('./webpack.common.js');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

 module.exports = merge(common, {
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        hot: true
    },
    mode: 'development',
    plugins: [
        new ManifestPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
});