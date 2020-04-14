const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const utils = require('./utils');
const CWD = process.cwd();
const conf = require('./bin/conf');
const helper = require('./helper');    
const basePath = helper.getPublicPathAndBase(conf.output.publicPath).basePath;
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
    entry: {
        app: [
            path.join(CWD, './src/index.js')
        ],
    },
    cache: true,
    resolve: {
        modules: ['node_modules'],
        extensions: [".js", ".jsx", '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.js',
            '@':  path.join(CWD, './src')
        }
	},
    module: {
        noParse:/^(vue|vue-router|vuex|lodash|echarts)$/, // 忽略模块编译
        rules: [
            {
                test: /\.js$/,
                // loader: 'babel-loader',
                use: 'happypack/loader?id=babel',
                exclude: /node_modules/,
                include: [helper.resolve('src'), helper.resolve('node_modules/webpack-dev-server/client')]
            },
            {
                test: /\.less$/,
                // use: 'happypack/loader?id=less',
                // loader: 'less-loader', // compiles Less to CSS
                use: [
                    {
                        loader: 'style-loader',
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'cache-loader',
                    },
                    {
                      loader: 'less-loader',
                      options: {
                        lessOptions: {
                          strictMath: true,
                          noIeCompat: true,
                            javascriptEnable: true
                        },
                      },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 100,
                    name: basePath + '/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: basePath + '/media/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: basePath + '/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Output Management',
            template: path.join(CWD, './index.html')
        }),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }, {
                loader: 'cache-loader'
            }]
        }),
    ]
 };