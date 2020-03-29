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

const config2 = merge(vueConfigs, {
    devtool: 'cheap-eval-source-map',
    mode: 'development',
    plugins: [
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            MOCK: config.mock || true
        })
    ],
});

module.exports = config2;