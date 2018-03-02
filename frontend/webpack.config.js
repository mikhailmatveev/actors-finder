'use strict';

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

let webpack = require('webpack'),
    config = {
        context: `${__dirname}/src/js/`,
        module: {
            loaders: [{
                loader: 'babel-loader',
                exclude: `${__dirname}/node_modules`,
                query: {
                    presets: [
                        'env'
                    ],
                    comments: false,
                },
                test: /\.js$/
            }, {
                test: /\.vue$/,
                loader: 'vue-loader'
            }]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new UglifyJSPlugin()
        ],
        devtool: 'source-map'
    };

module.exports = [
    Object.assign({}, config, {
        entry: [
            './app.js'
        ],
        output: {
            path: `${__dirname}/build/js`,
            publicPath: '/build/js/',
            filename: 'app.bundle.js'
        },
        resolve: {
            extensions: ['.js', '.vue'],
            alias: {
                vue: 'vue/dist/vue.common.js'
            }
        }
    })
];
