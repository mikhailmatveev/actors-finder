'use strict';

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
                    ]
                },
                test: /\.js$/
            }]
        },
        plugins: [
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.optimize.UglifyJsPlugin()
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
            filename: 'app.bundle.js'
        }
    })
];
