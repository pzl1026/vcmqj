 const merge = require('webpack-merge');
 const path = require("path");
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 const vueConfigs = require('./webpack.vue.config');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 const webpack = require('webpack');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//  const WorkboxPlugin = require('workbox-webpack-plugin'); //实现PWA
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CWD = process.cwd();

function resolve (dir) {
    return path.join(process.cwd(), dir);
}

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(percentage, message, ...args);
  };

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
    // output: {
    //     filename: '[name].[hash].js',
    //     chunkFilename: '[name].bundle.js',
    // },

    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 10000000,
          minChunks: Infinity,
          maxAsyncRequests: 5,
          maxInitialRequests: 3,
          automaticNameDelimiter: '~',
          name: 'manifest',
          cacheGroups: {
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10
            },
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            }
          }
        }
      },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Output Management',
            template: path.join(CWD, './index.html'),
            chunks: ['manifest', 'v~', 'vendor', 'app']
        }),
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
            options: {
              "max-new-space-size": 4096
            }
        }),
        // new webpack.ProgressPlugin(handler),
        new ExtractTextPlugin({
            filename: 'king/css/src/[name].[chunkhash].css',
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
        // new BundleAnalyzerPlugin(),
        // new WorkboxPlugin.GenerateSW({
        //     // 这些选项帮助 ServiceWorkers 快速启用
        //     // 不允许遗留任何“旧的” ServiceWorkers
        //     clientsClaim: true,
        //     skipWaiting: true
        // })
       
        ///////
        // new webpack.DefinePlugin({
        //     'SERVICE_URL': JSON.stringify(''),
        //     'process.env': {
        //         NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        //         PRODUCT_ENV: true
        //     }
        // }),
        // 清除dist目录和output目录
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [resolve('output'), resolve('dist')],
        }),

        // 用作部署使用，生成output/static和output/views，便于运维部署
        // new CopyPlugin([{
        //     from: 'dist',
        //     to: 'output/static',
        //     include: 'dist/king'
        // },
        // {
        //     from: 'dist',
        //     to: 'output/views',
        //     exclude: 'dist/king'
        // }
        // ]),

        new CopyWebpackPlugin([
            {
                from: path.join(CWD, './static'),
                to: path.join(CWD + 'dist/king/js', 'static'),
                ignore: ['.*']
            }
        ]),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),

    ],
    // output: {
    //     path: path.join(CWD, './dist'),
    //     publicPath: '//static.hanwin.com/',
    //     filename: '[name].[chunkhash].js',
    //     chunkFilename: '[id].[chunkhash].js' 
    // },
    output: {
        path: path.join(CWD, './dist'),
        publicPath: '//static.hanwin.com/',
        filename: 'king/js/[name].[chunkhash].js',
        chunkFilename: 'king/js/[id].[chunkhash].js' 
    },
 });