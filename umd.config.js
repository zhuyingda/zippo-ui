var path = require('path');

module.exports = function (name) {
    var index = name=='global'? './src/index.js': './src/' + name + '/' + name + '.js',
        pathDir = name=='global'? './release/': './release/' + name + '/',
        fileName = name=='global'? 'zippo.release.js': name+".release.js",
        libName = name=='global'? 'zippo': name;

    var config = {
        entry: {
            main: [index]
        },
        output: {
            path: pathDir,
            filename: fileName,
            library: libName,
            libraryTarget: "umd"
        },
        devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.hbs$/, loader: "handlebars-loader",
                    query: {
                        helperDirs: [
                            path.resolve('./src/helpers/')
                        ]
                    }
                }
            ]
        }
    };
    return config;
}
