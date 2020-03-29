 const path = require('path');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 const TerserJSPlugin = require('terser-webpack-plugin');
 const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 const CopyWebpackPlugin = require('copy-webpack-plugin');
 const webpack = require('webpack');
 const HappyPack = require('happypack');
 const os = require('os');
 const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })
 const CWD = process.cwd();

 function resolve(dir){
    return path.join(CWD, dir || '');
}   
 module.exports = {
    entry: {
        app: [
            path.join(CWD, './src/index.js')
        ],
    },
    cache: true,
    resolve: {
        extensions: [".js", ".jsx", '.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'vue-router$': 'vue-router/dist/vue-router.js',
            '@':  path.join(CWD, './src')
        }
	},
    module: {
        rules: [
            {
                test: /\.less$/,
                // use: 'HappyPack/loader?id=less',
                // loader: 'less-loader', // compiles Less to CSS
                use: [
                    {
                      loader: 'style-loader',
                    },
                    {
                      loader: 'css-loader',
                    },
                    {
                      loader: 'less-loader',
                      options: {
                        lessOptions: {
                          strictMath: true,
                          noIeCompat: true,
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
                test: /\.js$/,
                // loader: 'babel-loader',
                use: 'HappyPack/loader?id=babel',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|ico)$/,
                loader: 'url-loader',
                query: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    esModule: false,
                    // limit: 1000000,
                    // 路径要与当前配置文件下的publicPath相结合
                    // name:'[name].[ext]?[hash:7]'
                    name: '/img/[name].[hash:7].[ext]'
                }
            },
            // 加载图标
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'file-loader',
                query: {               
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里    
                    limit: 10000,
                    name:'../fonts/[name].[ext]?[hash:7]',
                    prefix:'font'
                }
            }, 
        ]
    },
    optimization: {
        minimize: false,
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
            }),
            new OptimizeCSSAssetsPlugin({})
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
        new CopyWebpackPlugin([
            {
                from: path.join(CWD, './static'),
                to:  'static',
                ignore: ['.*']
            }
        ]),
        new HappyPack({
            id: 'babel',
            threadPool: happyThreadPool,
            loaders: [{
                loader: 'babel-loader?cacheDirectory=true',
            }]
        })
    ],
    output: {
        path: resolve('_debug'),
        publicPath: '/',
        filename: 'static/js/[name].[hash].js'
    }
 };