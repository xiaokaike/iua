// https://github.com/shelljs/shelljs
require('shelljs/global')
env.NODE_ENV = 'production'

var ora = require('ora')
var webpack = require('webpack')
var conf = require('./webpack.prod.conf')

var spinner = ora('building for production...')
spinner.start()

rm('-rf', 'public')
mkdir('public')
cp('-R', 'static', conf.output.path)


var compiler = webpack(conf)

compiler.watch({ // watch options:
    aggregateTimeout: 300, // wait so long for more changes
    poll: true // use polling instead of native watchers
    // pass a number to set the polling interval
}, function(err, stats) {
    // ...
});