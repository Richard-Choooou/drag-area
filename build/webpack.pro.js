const path = require('path')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const config = require('./config')
const ENV = process.argv.NODE_ENV

module.exports = merge(webpackBaseConfig, {
    output: {
        filename: 'drag.min.js',
        path: path.resolve(config.basePath, './dist'),
        publicPath: '/dist',
        libraryTarget: 'umd'
    },

    module: {
        rules: [
            {
                test: /\.(sc|c)ss$/,
                use: [miniCssExtractPlugin.loader, 
                {loader: 'css-loader'}, 
                {loader: 'sass-loader'}]
            }
        ]
    },

    plugins: [
        new miniCssExtractPlugin({
            filename: "drag.min.css"
        })
    ]
})

    
