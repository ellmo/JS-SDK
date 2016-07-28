var webpack = require('webpack')
var webpackProConfig = require('./webpack.prod.conf')
var webpackBaseConfig = require('./webpack.base.conf')

var webpackConfig = webpackBaseConfig

if (process.argv[2] === 'compress') {
  webpackConfig = webpackProConfig
}

webpack(webpackConfig, function (err, stats) {
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: true,
    children: false,
    chunks: false,
    profile: true,
    chunkModules: false
  }) + '\n')
})
