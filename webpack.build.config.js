const path = require('path');
const htmlWebpackPlugin=require('html-webpack-plugin');
const copyWebpackPlugin=require('copy-webpack-plugin');
const { CleanWebpackPlugin }=require('clean-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const { renameManifestFileName, getGamesNames, getEntries, getAssets } = require('./helpers');
const glob = require("glob")

const gamesPaths = glob.sync(path.resolve(__dirname, 'src/games/*'));
const gamesNames = getGamesNames(gamesPaths);
console.log(getEntries(gamesPaths, gamesNames))

module.exports = ( env, options ) => {
    return {
        mode: 'production',
        entry: getEntries(gamesPaths, gamesNames),
        output: {
            filename: '[name]/main.js',
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
                patterns: getAssets(gamesNames),
            }),
            new CleanWebpackPlugin(),
            new WebpackManifestPlugin({
                map: renameManifestFileName,
                generate:(a,b,c)=>{console.log('-----');console.log(a);console.log('-----');console.log(b);
                console.log('-----');console.log(c);console.log('-----'); return a}
            })
        ]
    }
};