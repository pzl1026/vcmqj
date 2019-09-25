 const path = require('path');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");

 module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                // use: ['style-loader', 'css-loader'],
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Output Management',
            template: './src/index.html' 
        }),
        new ExtractTextPlugin("styles.css"),
    ],
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist')
    }
 };