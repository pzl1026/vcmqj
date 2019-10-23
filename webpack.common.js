 const path = require('path');
 const {CleanWebpackPlugin} = require('clean-webpack-plugin');
 const HtmlWebpackPlugin = require('html-webpack-plugin');
 const ExtractTextPlugin = require("extract-text-webpack-plugin");
 const MiniCssExtractPlugin = require('mini-css-extract-plugin');
 const TerserJSPlugin = require('terser-webpack-plugin');
 const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
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
                // use: ExtractTextPlugin.extract({
                //     fallback: "style-loader",
                //     use: "css-loader"
                // }),
                use: [
                    {
                      loader: MiniCssExtractPlugin.loader,
                      options: {
                        publicPath: (resourcePath, context) => {
                          // publicPath is the relative path of the resource to the context
                          // e.g. for ./css/admin/main.css the publicPath will be ../../
                          // while for ./css/main.css the publicPath will be ../
                          return path.relative(path.dirname(resourcePath), context) + '/';
                        },
                      },
                    },
                    'css-loader',
                  ],
            }
        ]
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
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
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            // chunkFilename: '[id].css',
          }),
    ],
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public/dist'),
    }
 };