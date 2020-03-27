const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = merge(common, {
    module: {
        rules: [
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
                        ],
                    }
                }
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
});