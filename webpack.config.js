var webpack = require('webpack');
var path = require('path');

module.exports = function (name) {
    var webpackConfig = {
        entry: {
            main: ['./src/' + name + '/' + name + '.js']
        },
        output: {
            path: './release/' + name + '/',
            filename: name + '.release.js',
            publicPath: 'public'
        },
        devtool: 'source-map',
        plugins: [],
        module: {
            loaders: [
                {
                    test: /\.hbs$/, loader: "handlebars-loader",
                    query: {
                        helperDirs: [
                            path.resolve('./src/helpers/')
                        ]
                    }
                },
                {
                    test: require.resolve('./src/' + name + '/' + name), loader: "expose?" + name
                }
            ]
        }
    };
    return webpackConfig;
}
