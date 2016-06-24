'use strict'

import {SDKType} from './enum'
import getXUI from './plugins/xui'
import getDataStorage from './plugins/data-storage'
import initWebsocket from './instance/websocket'
import {isString, isPlainObject} from './util/lang'

var sdkInstance = {} // 保存sdk实例，每种类型只保留一个实例

function XSDK (type, option) {
  if (!isString(type)) {
    throw new TypeError('error params')
  }
  if (type === SDKType.WEBSOCKET) { // 发送数据时，数据项不能为空
    if (!isPlainObject(option)) {
      throw new TypeError('error params')
    }
  }

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

XSDK.getXUI = getXUI
XSDK.getDataStorage = getDataStorage

window.XSDK = XSDK

export default XSDK
