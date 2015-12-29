var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

var port = process.env.HOT_LOAD_PORT || 8888;

new WebpackDevServer(webpack(config), {
    contentBase: 'http://localhost:' + port,
    publicPath: config.output.publicPath,
    noInfo: true,
    hot: true
}).listen(port, 'localhost', function (err, result) {
    if (err) {
        console.log(err);
    }
    console.log('Hot load server listening at localhost:' + port);
});
