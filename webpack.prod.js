const merge = require('webpack-merge');
const path = require("path");
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const common = require('./webpack.common.js');
const vueConfigs = require('./webpack.vue.config');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack');
const CopyPlugin = require('./plugins/copy');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//  const WorkboxPlugin = require('workbox-webpack-plugin'); //实现PWA
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HappyPack = require('happypack');
const conf = require('./bin/conf');
const helper = require('./helper');
const CWD = process.cwd();
let path2 = helper.getPublicPathAndBase(conf.output.publicPath);
let publicPath = path2.publicPath, basePath = path2.basePath;
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

delete conf.nomocker;

let plugins = [   
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Output Management',
        template: path.join(CWD, './index.html'),
    }),
    new webpack.LoaderOptionsPlugin({
        // test: /\.xxx$/, // may apply this only for some modules
        options: {
          "max-new-space-size": 4096
        }
    }),
    new webpack.ProgressPlugin(helper.handler),
    new ExtractTextPlugin({
        filename: basePath + '/css/src/[name].[chunkhash].css',
        allChunks: true
    }),

    // new CleanWebpackPlugin(),
    // new UglifyJSPlugin({
    //     sourceMap: true
    // }),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),
    // new HappyPack({
    //     id: 'babel',
    //     threadPool: happyThreadPool,
    //     loaders: [{
    //         loader: 'babel-loader?cacheDirectory=true',
    //     }, {
    //         loader: 'cache-loader'
    //     }]
    // }),

    // new webpack.ProvidePlugin({
    //     _:'lodash',
    //     'vue$': 'vue/dist/vue.esm.js',
    //     'vue-router$': 'vue-router/dist/vue-router.js',
    // })
    // new BundleAnalyzerPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //     // 这些选项帮助 ServiceWorkers 快速启用
    //     // 不允许遗留任何“旧的” ServiceWorkers
    //     clientsClaim: true,
    //     skipWaiting: true
    // })
    
];

module.exports = merge(vueConfigs, {
    devtool: 'source-map',
    mode: "production",
    performance: {
        hints:'warning',
        //入口起点的最大体积
        maxEntrypointSize: 50000000,
        //生成文件的最大体积
        maxAssetSize: 30000000,
        //只给出 js 文件的性能提示
        assetFilter: function(assetFilename) {
            return assetFilename.endsWith('.js');
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                // use: 'HappyPack/loader?id=babel',
                exclude: /node_modules/,
                include: [helper.resolve('src'), helper.resolve('node_modules/webpack-dev-server/client')]
            },
        ],
    },

    optimization: {
        minimizer: [
            new TerserJSPlugin({
                cache: true,
                parallel: true,
                sourceMap:true
            }),
            new OptimizeCSSAssetsPlugin({})
        ],
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 3000000,
          minChunks: Infinity,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: 'manifest',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: 10,
              name: 'vendor',
              chunks: 'initial'
            },
            default: {
                chunks: 'initial',
                minChunks: 4,
                priority: -20,
                reuseExistingChunk: true
            }
          }
        }
    },
    plugins,
    // output: {
    //     path: path.join(CWD, './dist'),
    //     publicPath: '//static.hanwin.com/',
    //     filename: '[name].[chunkhash].js',
    //     chunkFilename: '[id].[chunkhash].js' 
    // },
 }, conf, {
    output: {
        path: path.join(CWD, './dist'),
        publicPath,
        filename: basePath + '/js/[name].[chunkhash].js',
        chunkFilename: basePath + '/js/[id].[chunkhash].js' 
    },
 });