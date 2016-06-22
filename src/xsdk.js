'use strict'

// import Device from './Device.js'
// import SDKEvent from './sdk-event'
import SDKType from './sdk-type'
import XUI from './xui'
import DataStorage from './data-storage'
import initWebsocket from './instance/websocket'
import {stringChect, objectChect} from './util/lang'

var sdkInstance = {} // 保存sdk实例，每种类型只保留一个实例

function _login (userId, authorize) {
  stringChect(userId)
  stringChect(authorize)

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

function XSDK (type, option) {
  stringChect(type)

  type === SDKType.WEBSOCKET ? objectChect(option) : null

  if (this instanceof XSDK) {
    if (sdkInstance[type] === undefined) {
      switch (type) {
        case SDKType.WIFI:
          break
        case SDKType.BLUETOOTH:
          break
        case SDKType.WEBSOCKET:
          initWebsocket(this, option)
          break
        default:
          throw new Error(type + ' is not support')
      }
      this.type = type
      sdkInstance[type] = this
    } else {
      return sdkInstance[type]
    }
  } else {
    return new XSDK(type, option)
  }
}

XSDK.login = _login
XSDK.getXUI = _getXUI
XSDK.getDataStorage = _getDataStorage

window.XSDK = XSDK

export default XSDK
