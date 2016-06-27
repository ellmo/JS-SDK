'use strict'

import {SDKType} from './enum'
import getXUI from './plugins/xui'
import getDataStorage from './plugins/data-storage'
import initWebsocket from './instance/websocket'
import {isString, isPlainObject} from './util/lang'

var _instance = {} // 保存sdk实例，每种类型只保留一个实例

function XSDK (type, option) {
  if (!isString(type)) {
    throw new TypeError('error params')
  }
  if (type === SDKType.WEBSOCKET) { // 发送数据时，数据项不能为空
    if (!isPlainObject(option) || !isString(option.type) || !isString(option.host) || !isString(option.userid)) {
      throw new TypeError('error params')
    }
  }

  var alias = option ? type + '_' + option.host : type

  if (this instanceof XSDK) {
    if (_instance[alias] === undefined) {
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
      _instance[alias] = this
    } else {
      return _instance[alias]
    }
  } else {
    return new XSDK(type, option)
  }
}

XSDK.getXUI = getXUI
XSDK.getDataStorage = getDataStorage

window.XSDK = XSDK

export default XSDK
