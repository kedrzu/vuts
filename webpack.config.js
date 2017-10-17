const webpack = require('webpack');
const path = require('path');
const yargs = require('yargs');

var libraryName = 'vuts',
    plugins = [],
    outputFile;

if (yargs.argv.p) {
    outputFile = libraryName + '.min.js';
} else {
    outputFile = libraryName + '.js';
}

module.exports = {
    entry: [__dirname + '/src/index.ts'],
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: outputFile,
        library: libraryName,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    module: {
        loaders: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    externals: {
        vue: {
            commonjs: 'vue',
            commonjs2: 'vue',
            amd: 'vue',
            root: 'Vue'
        }
    },
    resolve: {
        extensions: ['.ts']
    },
    plugins: plugins
};
