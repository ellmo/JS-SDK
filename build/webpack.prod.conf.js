var path = require('path')
var webpack = require('webpack')

var projectRoot = path.resolve(__dirname, '')
module.exports = {
  entry: './lib/xsdk.js',
  output: {
    path: path.resolve(__dirname, '../'),
    filename: 'xsdk.min.js',
    library: 'xsdk',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['', '.js']
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        loader: 'eslint',
        include: projectRoot,
        exclude: /node_modules/
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel?presets[]=es2015'] // 'babel-loader' is also a legal name to reference
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
  ]
}
