var path = require('path');
var webpack = require('webpack');

var port = process.env.HOT_LOAD_PORT || 8888;

var config = {
    resolve: {
        extensions: ['', '.js']
    },
    entry: [
        'webpack-dev-server/client?http://localhost:' + port,
        'webpack/hot/dev-server',
        './out/app/client.js'
    ],
    output: {
        path: path.join(__dirname, '/build/'),
        filename: 'client.js',
        publicPath: 'http://localhost:' + port + '/build/'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loaders: ['babel'] }
        ]
    }
};

if (process.env.NODE_ENV === "development") {
    devtool: 'cheap-module-eval-source-map'
}

module.exports = config;
