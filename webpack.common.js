 const path = require('path');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const TerserJSPlugin = require('terser-webpack-plugin');
 const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
 const webpack = require('webpack');
 const CWD = process.cwd();

 function resolve(dir){
     console.log(path.join(CWD, dir || ''), 'lll')
    return path.join(CWD, dir || '');
}   
 module.exports = {
    entry: {
        // polyfills: [
        //     path.join(CWD, './src/polyfills.js')
        // ],
        app: [
            path.join(CWD, './src/index.js')
        ],
    },
    // stats: {
    //     chunkModules: true
    // },
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
                // use: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                }),
                // use: [
                //     {
                //       loader: MiniCssExtractPlugin.loader,
                //       options: {
                //         publicPath: (resourcePath, context) => {
                //           // publicPath is the relative path of the resource to the context
                //           // e.g. for ./css/admin/main.css the publicPath will be ../../
                //           // while for ./css/main.css the publicPath will be ../
                //           return path.relative(path.dirname(resourcePath), context) + '/';
                //         },
                //       },
                //     },
                //     'css-loader',
                // ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/  
            },
            {
                test: /\.(png|jpg|gif)$/,
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
        minimizer: [
            new TerserJSPlugin({}),
            new OptimizeCSSAssetsPlugin({})
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Output Management',
            template: path.join(CWD, './index.html')
        }),
        new ExtractTextPlugin("styles.css"),
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dll/lodash.manifest.json'),
            name: './public/dll/lodash.dll.js',
            scope: "xyz",
            sourceType: "commonjs2"
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                }
            }
        }
    },
    output: {
        filename: 'dist/js/[name].[hash].js',
        path: path.join(CWD, './public2/dist'), //这边目录不对
        // path:  'e:\\public2\\dist'
        publicPath: '/',
    }
 };