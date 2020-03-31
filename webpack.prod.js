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
//  const WorkboxPlugin = require('workbox-webpack-plugin'); //实现PWA
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const conf = require('./bin/conf');
console.log(conf.plugins, 'ssss');
const CWD = process.cwd();
let publicPath = '/static', basePath = 'static';
    
try{
    publicPath = conf.output.publicPath;
}catch(e){};

publicPath.replace(/((?:(?:https|http?:)?\/\/[\w-]+(?:\.\w+)+)?\/?)?(.*)/, function(all, domain, base){
    publicPath = domain || '';
    basePath = base;
});

console.log(publicPath, basePath, 'publicPath');

function resolve (dir) {
    return path.join(process.cwd(), dir);
}

const handler = (percentage, message, ...args) => {
    // e.g. Output each progress message directly to the console:
    console.info(percentage, message, ...args);
};

let plugins = [
    // 清除dist目录和output目录
   
    new HtmlWebpackPlugin({
        hash: true,
        title: 'Output Management',
        template: path.join(CWD, './index.html'),
        // chunks: ['manifest', 'v~', 'vendor', 'app']
    }),
    new webpack.LoaderOptionsPlugin({
        // test: /\.xxx$/, // may apply this only for some modules
        options: {
          "max-new-space-size": 4096
        }
    }),
    // new webpack.ProgressPlugin(handler),
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
    // new BundleAnalyzerPlugin(),
    // new WorkboxPlugin.GenerateSW({
    //     // 这些选项帮助 ServiceWorkers 快速启用
    //     // 不允许遗留任何“旧的” ServiceWorkers
    //     clientsClaim: true,
    //     skipWaiting: true
    // })

    new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
    }),

    new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [resolve('output'), resolve('dist')],
    }),   
    ///////
    // new webpack.DefinePlugin({
    //     'SERVICE_URL': JSON.stringify(''),
    //     'process.env': {
    //         NODE_ENV: JSON.stringify(process.env.NODE_ENV),
    //         PRODUCT_ENV: true
    //     }
    // }),

    // new CopyWebpackPlugin([
    //     {
    //         from: path.join(CWD, './static'),
    //         to: path.join(CWD + 'dist/king/js', 'static'),
    //         ignore: ['.*']
    //     }
    // ]),

    // new CleanWebpackPlugin({
    //     cleanOnceBeforeBuildPatterns: [resolve('output'), resolve('dist')],
    // }),

    // // 用作部署使用，生成output/static和output/views，便于运维部署
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
    // ])
];

let o = {
    plugins
};

// plugins = merge(o, {plugins: conf.plugins});

const config = merge(vueConfigs, {
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
                exclude: /node_modules/,
                include: [resolve('src'), resolve('node_modules/webpack-dev-server/client')]
            },
        ],
    },

    optimization: {
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          maxSize: 5000000,
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
      plugins,
    // output: {
    //     path: path.join(CWD, './dist'),
    //     publicPath: '//static.hanwin.com/',
    //     filename: '[name].[chunkhash].js',
    //     chunkFilename: '[id].[chunkhash].js' 
    // },
    output: {
        path: path.join(CWD, './dist'),
        publicPath,
        filename: basePath + '/js/[name].[chunkhash].js',
        chunkFilename: basePath + '/js/[id].[chunkhash].js' 
    },
 }, conf, {
    output: {
        publicPath
    }
 });
console.log(config, 'config');
 module.exports = config;