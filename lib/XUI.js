'use strict'

var _ = require('lodash');

function XUI () {}

function _on (event) {
  if (!(_.isString(event))) {
    throw new Error(event + ' must be String type')
  }

  switch (event) {
    case SDKEvent.UIBACK:
      break;
    default:
      console.warn('event: ' + event + 'is not support');
      break;
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

XUI.on = _on;
XUI.scanQCode = _scanQCode;
XUI.selectImage = _selectImage;
XUI.setTitleBar = _setTitleBar;
XUI.setNotify = _setNotify;
XUI.getSystemInfo = _getSystemInfo;

module.exports = XUI
