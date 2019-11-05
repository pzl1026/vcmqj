const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(common, {
    module: {
        rules: [
            // { //匹配后缀名为css的文件,然后分别用css-loader，vue-style-loader去解析
            //     //解析器的执行顺序是从下往上(先css-loader再vue-style-loader)
            //       test: /\.css$/,
            //       use: [
            //           'vue-style-loader',
            //           'css-loader'
            //       ],
            // },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
});