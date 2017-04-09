let path = require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
// let ExtractTextPlugin = require("extract-text-webpack-plugin");
let webpackMerge = require('webpack-merge');


let webpackConfig = {
    entry: {
        polyfills: path.resolve(__dirname, '../client/polyfills.ts'),
        vendor: path.resolve(__dirname, '../client/vendor.ts'),
        app: path.resolve(__dirname, '../client/main.ts')
    },
    output: {
        publicPath: '',
        path: path.resolve(__dirname, '../dist')
    },
    plugins: [
        // new ExtractTextPlugin("./style.css"),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './templ/jit-tpl.html'),
            inject: true
        })
    ],

    module: {
        rules: [{
            test: /\.ts$/,
            loaders: [
                {
                 loader: 'awesome-typescript-loader',
                 options: { configFileName:  path.resolve(__dirname, '../client/tsconfig.json') }
                } , 
                'angular2-router-loader',
                'angular2-template-loader'
            ]
        }, {
            test: /\.css$/,
            // include: path.resolve(__dirname, '../client'),
            loader: ['style-loader','css-loader']
        //         use: ExtractTextPlugin.extract({
        //             fallbackLoader: "style-loader",
        //             loader: 'css-loader'
        //         })
           }, {
            test: /\.styl$/,
            use: [
                'stylus-loader',
                'css-loader'
            ],
        }, {
            test: /\.html$/,
            loader: 'raw-loader'
        }]
    }

};

let defaultConfig = {
    output: {
        filename: '[name].bundle.js',
        sourceMapFilename: '[name].map',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        contentBase: './',
        port: 4001,
        inline: true,
        stats: 'errors-only',
        historyApiFallback: true,
        watchOptions: {
            aggregateTimeout: 100,
            poll: 500
        },
        proxy: {
            '/server/*': {
                target: 'http://localhost:3000',
                secure: false
            }
        }
    },
   devtool: 'eval-source-map',
    node: {
        global: true,
        crypto: 'empty',
        __dirname: true,
        __filename: true,
        Buffer: false,
        clearImmediate: false,
        setImmediate: false
    }
};

module.exports = webpackMerge(defaultConfig, webpackConfig);