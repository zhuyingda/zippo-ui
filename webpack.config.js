var webpack = require('webpack');
var path = require('path');

module.exports = function (page) {
    var webpackConfig = {
        entry: {
            main: ['./src/'+ process.env.PAGE + '/' + process.env.PAGE +'.js']
        },
        output: {
            path: './release/' + process.env.PAGE + '/',
            filename: 'js/[name]_' + process.env.PAGE + '_[hash].js',
            publicPath: 'public'
        },

        plugins: [
        ],
        module: {
            loaders: [{
                test: /\.hbs$/,
                loader: "handlebars-loader",
                query: {
                    helperDirs: [
                        path.resolve('./src/helpers/')
                    ]
                }
            }]
        }
    };
    return webpackConfig;
}
