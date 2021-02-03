const path = require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const copyWebpackPlugin=require('copy-webpack-plugin');
const {CleanWebpackPlugin}=require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { renameManifestFileName } = require('./helpers');


module.exports = ( env, options ) => {
    return {
        mode: 'production',
        entry: path.resolve(__dirname, 'src/main.js'),
        output: {
            filename: 'bundle.js',
            chunkFilename: '[id].js',
            path: path.resolve(__dirname, 'build'),
            publicPath: ''
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: '/node_modules'
                }
            ]
        },
        plugins: [
            new htmlWebpackPlugin({
                template: path.resolve(__dirname, 'src/index.html'),
                filename: "index.html"
            }),
            new copyWebpackPlugin({
                patterns: [
                    {
                        context: "src",
                        from: 'resources',
                        to: 'resources/[path][name].[hash].[ext]'
                    }
                ],
            }),
            new CleanWebpackPlugin(),
            new WebpackManifestPlugin({map: renameManifestFileName})
        ]
    }
};