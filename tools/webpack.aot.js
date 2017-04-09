let webpack = require('webpack');
let path = require('path');
let webpackMerge = require('webpack-merge');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let CompressionPlugin = require("compression-webpack-plugin");
let ngtools = require('@ngtools/webpack');
console.log("....",__dirname);
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
        new ngtools.AotPlugin({
            tsConfigPath: path.resolve(__dirname, '../client/tsconfig.json'),
            skipMetadataEmit: true,
            entryModule: path.resolve(__dirname, '../client/app/app.module#AppModule')
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.3
        }),
        new webpack.optimize.UglifyJsPlugin(),
        // new HtmlWebpackPlugin({
        //     template: path.resolve(__dirname, './templ/aot-tpl.html'),
        //     inject: true
        // })
    ],

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    '@ngtools/webpack'
                ]
            },
            {
                test: /\.css$/,
                loaders: ['to-string-loader', 'css-loader']
            },
            {
                test: /\.html$/,
                loader: 'raw-loader'
            }
        ]
    }

};

let defaultConfig = {
    devtool: 'inline-source-map',
    output: {
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    resolve: {
        extensions: ['.ts', '.js'],
        modules: [path.resolve(__dirname, 'node_modules')]
    },
    devServer: {
        contentBase: './',
        port: 4001,
        inline: true,
        stats: 'errors-only',
        historyApiFallback: true,
        watchOptions: { aggregateTimeout: 100, poll: 500 }
    },

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