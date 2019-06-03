const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.js')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const path = require('path');


const isProduction = process.env.NODE_ENV === 'production'

let config = merge(baseConfig, {
    entry: ['./app/entry-client.js'],
    plugins: [
        new VueSSRClientPlugin(),
    ],
    output: {
        path: path.resolve('./dist/'),
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    isProduction
                        ? 'vue-style-loader'
                        : MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
        ]
    },
    devServer: {
        publicPath: 'http://localhost:3000/',
        hot: true,
        inline: true,
        historyApiFallback: true,
        port: 3000,
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
})

if (isProduction) {
    config = merge(config, {
        optimization: {
            minimize: true,
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'common.[chunkhash].css'
            }),
        ]
        // optimization: {
        //     splitChunks: {
        //         chunks: 'async',
        //         minSize: 30000,
        //         maxSize: 0,
        //         minChunks: 1,
        //         maxAsyncRequests: 5,
        //         maxInitialRequests: 3,
        //         automaticNameDelimiter: '~',
        //         name: true,
        //         cacheGroups: {
        //             vendors: {
        //                 test: /[\\/]node_modules[\\/]/,
        //                 priority: -10
        //             },
        //             default: {
        //                 minChunks: 2,
        //                 priority: -20,
        //                 reuseExistingChunk: true
        //             }
        //         },
        //     },
        // }
    });
}

module.exports = config;