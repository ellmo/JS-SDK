// Karma configuration
// Generated on Mon Jun 06 2016 14:35:23 GMT+0800 (中国标准时间)
module.exports = function(config) {
  config.set({
    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'spec/xsdkspec.js'
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
       'spec/xsdkspec.js': ['webpack']
	  },

    webpack: {
      entry: './spec/xsdkspec.js',
      module: {
        loaders: [
          {
            test: /\.js$/,
    		    loader: "babel",
            exclude: "node_modules",
        		query: {
        			presets: ['es2015']
        		}
          }
        ]
      }
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true
  })
}
