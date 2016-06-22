var path = require('path')

var projectRoot = path.resolve(__dirname, '')
module.exports = {
  entry: ['babel-polyfill', './src/xsdk.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'xsdk.js',
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
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  }
}
