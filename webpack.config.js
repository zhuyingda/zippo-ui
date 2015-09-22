var webpack = require('webpack');
var path = require('path');

module.exports = function () {
    var webpackConfig = {
        entry: {
            main: [jsDest + '/.tmp/static/main/main.js']
        },
        output: {
            path: jsDest,
            filename: env === 'production' ? 'js/[name]_' + configEnv + '_[hash].js' : 'js/[name]_' + configEnv + '.js',
            publicPath: publicPath
        },

        plugins: [
        ],
        module: {
            loaders: [{
                test: /\.handlebars$/,
                loader: "handlebars-loader",
                query: {
                    helperDirs: [
                        path.resolve(__dirname, '../../' + configEnv + '/helpers/')
                    ]
                }
            }]
        }
    };
    return webpackConfig;
}
