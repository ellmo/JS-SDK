'use strict'

import {SDKEvent} from '../enum'

var _xui = {
  on: _on,
  scanQCode: _scanQCode,
  selectImage: _selectImage,
  setTitleBar: _setTitleBar,
  setNotify: _setNotify,
  getSystemInfo: _getSystemInfo
}

function getXUI () {
  return _xui
}

function _on (event) {
  switch (event) {
    case SDKEvent.UIBACK:
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }
}

function _scanQCode () {

}

function _selectImage () {

}

function _setTitleBar () {

}

function _setNotify () {

}

function _getSystemInfo () {

}

export default getXUI
