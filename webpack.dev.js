const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const vueConfigs = require('./webpack.vue.config');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const config = require('./bin/conf');
const apiMocker = require('webpack-api-mocker');
const path = require('path');
const CWD = process.cwd();
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

function resolve (dir) {
    return path.join(process.cwd(), dir);
}

const config2 = merge(vueConfigs, {
    devtool: 'cheap-eval-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                use: 'HappyPack/loader?id=babel',
                exclude: /node_modules/
            },
        ],
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({}),      
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 4
                }
            }
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Output Management',
            template: path.join(CWD, './index.html')
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            MOCK: config.mock || true
        }),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }]
        }),
        new CopyWebpackPlugin([
            {
                from: path.join(CWD, './static'),
                to:  'static',
                ignore: ['.*']
            }
        ]),
    ],
    output: {
        path: resolve('_debug'),
        publicPath: '/',
        filename: 'static/js/[name].[hash].js'
    }
});

module.exports = config2;