const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: {
        //    polyfills: ['./src/polyfills.js'],
        lodash: ['lodash'],
        // print: './src/print.js'
    },
    plugins: [
        new webpack.DllPlugin({
            path: path.join(__dirname, 'public/dll', '[name].manifest.json'),
            name: '_dll_[name]_[hash]'
        })  
    ],
    output: {
        filename: '[name].dll.js',
        path: path.join(__dirname, 'public/dll'),
        // libraryTarget: 'var',
        library: '_dll_[name]_[hash]'
    }
};