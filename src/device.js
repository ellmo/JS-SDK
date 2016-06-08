'use strict'

var SDKEvent = require('./SDKEvent.js')
var _ = require('lodash')

function _on (event, fn) {
  if (!(_.isString(event))) {
    throw new Error(event + ' must be String type')
  }

  if (!(_.isFunction(fn))) {
    throw new Error(fn + ' must be Function type')
  }

  switch (event) {
    case SDKEvent.CONNECT:
      break
    case SDKEvent.DISCONNECT:
      break
    case SDKEvent.DATA:
      break
    case SDKEvent.TIMEOUT:
      break
    case SDKEvent.ERROR:
      break
    default:
      console.warn('event: ' + event + 'is not support');
      break
  }
}

function _emit (event, data) {
  if (!(_.isString(event))) {
    throw new Error(event + ' must be String type')
  }

  switch (event) {
    case SDKEvent.CONNECT:
      break
    case SDKEvent.DISCONNECT:
      break
    case SDKEvent.SENDDATA:
      _sendData(data)
      break
    default:
      console.warn('event: ' + event + 'is not support');
      break
  }
}

function _sendData (data) {
  if (data === 'undefined') {
    throw new Error('can not send empty data')
  }

  if (!(_.isString(data))) {
    throw new Error(data + ' must be String type')
  }

  // send Data
}

function Device (option) {
  if (this instanceof Device) {
    if (!(_.isObject(option))) {
      throw new Error(option + ' must be Object type')
    }

    this.on = _on
    this.emit = _emit
    // code
  } else {
    return new Device(option)
  }
}

module.exports = Device
