'use strict'

// import Device from './Device.js'
import SDKEvent from './sdk-event'
import SDKType from './sdk-type'
import XUI from './xui'
import DataStorage from './data-storage'
import _ from 'lodash'

var sdkInstance = {} // 保存sdk实例，每种类型只保留一个实例

function _login (userId, authorize) {
  if (userId === undefined || authorize === undefined) {
    throw new Error('missing params')
  }

  if (!(_.isString(userId))) {
    throw new Error(userId + ' must be String type')
  }

  if (!(_.isString(authorize))) {
    throw new Error(authorize + ' must be String type')
  }

  return new Promise(function (resolve, reject) {
    // 调用容器登陆接口
  })
}

function _getXUI () {
  return XUI
}

function _getDataStorage () {
  return DataStorage
}

function _on (event, fn) {
  if (event === undefined || fn === undefined) {
    throw new Error('missing params')
  }

  if (!(_.isString(event))) {
    throw new Error(event + ' must be String type')
  }

  if (!(_.isFunction(fn))) {
    throw new Error(fn + ' must be Function type')
  }

  switch (event) {
    case SDKEvent.READY:
      break
    case SDKEvent.SCAN:
      break
    case SDKEvent.STATUSCHANGE:
      break
    case SDKEvent.ERROR:
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }
}

function _emit (event) {
  if (event === undefined) {
    throw new Error('missing params')
  }

  if (!(_.isString(event))) {
    throw new Error(event + ' must be String type')
  }

  switch (event) {
    case SDKEvent.STARTSCAN:
      break
    case SDKEvent.CANCELSCAN:
      break
    case SDKEvent.DESTORY:
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }
}

function XSDK (type) {
  if (type === undefined) {
    throw new Error('missing sdk type')
  }

  if (!(_.isString(type))) {
    throw new Error(type + ' must be String type')
  }

  switch (type) {
    case SDKType.WIFI:
      break
    case SDKType.BLUETOOTH:
      break
    default:
      throw new Error(type + ' is not support')
  }

  if (this instanceof XSDK) {
    if (sdkInstance[type] === undefined) {
      this.type = type
      this.on = _on
      this.emit = _emit
      this.devices = []

      sdkInstance[type] = this
    } else {
      return sdkInstance[type]
    }
  }
}

XSDK.login = _login
XSDK.getXUI = _getXUI
XSDK.getDataStorage = _getDataStorage

export default XSDK
