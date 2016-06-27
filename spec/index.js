if (global) {
  global.localStorage.debug = 'xsdk*'
} else {
  document.localStorage.debug = 'xsdk*'
}

var xsdkBase = require('./xsdkBaseSpec')
