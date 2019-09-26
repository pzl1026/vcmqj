 const path = require('path');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 const webpack = require('webpack');

 module.exports = {
    entry: {
        polyfills: ['./src/polyfills.js'],
        app: ['./src/index.js'],
        // print: './src/print.js'
    },
    resolve: {
		extensions: [".js", ".jsx"]
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
        new webpack.ProvidePlugin({
            _: 'lodash'
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./public/dll/lodash.manifest.json'),
            name: './public/dll/lodash.dll.js',
            scope: "xyz",
            sourceType: "commonjs2"
        })
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
    }
 };