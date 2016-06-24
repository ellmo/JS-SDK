'use strict'

import {SDKEvent} from './enum'
import {isFunction, isString} from './util/lang'

function _on (event, calback) {
  if (!(isString(event) && isFunction(calback))) {
    throw new TypeError('error params')
  }

  switch (event) {
    case SDKEvent.CONNECT:
      this._callback[SDKEvent.CONNECT] = calback
      break
    case SDKEvent.DISCONNECT:
      this._callback[SDKEvent.DISCONNECT] = calback
      break
    case SDKEvent.STATUSCHANGE:
      this._callback[SDKEvent.STATUSCHANGE] = calback
      break
    case SDKEvent.DATA:
      this._callback[SDKEvent.DATA] = calback
      break
    case SDKEvent.ERROR:
      this._callback[SDKEvent.ERROR] = calback
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }

  return this
}

function _emit (event, data) {
  if (!isString(event)) {
    throw new TypeError('error params')
  }
  if (event === SDKEvent.SENDDATA) { // 发送数据时，数据项不能为空
    if (!isString(data)) {
      throw new TypeError('error params')
    }
  }

  switch (event) {
    case SDKEvent.CONNECT:
      if (this._connect) {
        this._connect()
      }
      break
    case SDKEvent.DISCONNECT:
      if (this._disconnect) {
        this._disconnect()
      }
      break
    case SDKEvent.SENDDATA:
      if (this._sendData) {
        this._sendData(data)
      }
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }
}

function _fire (event, data) {
  switch (event) {
    case SDKEvent.CONNECT:
      this._callback[SDKEvent.CONNECT]()
      break
    case SDKEvent.DISCONNECT:
      this._callback[SDKEvent.DISCONNECT]()
      break
    case SDKEvent.DATA:
      this._callback[SDKEvent.DATA](data)
      break
    case SDKEvent.STATUSCHANGE:
      this._callback[SDKEvent.STATUSCHANGE](data)
      break
    case SDKEvent.ERROR:
      this._callback[SDKEvent.ERROR](data)
      break
    default:
      console.warn(event + 'is not support')
      break
  }
}

function Device (option) {
  for (var prop in option) {
    this['_' + prop] = option[prop]
  }
  this._callback = {}
}

Device.prototype._sendData = null
Device.prototype._connect = null
Device.prototype._disconnect = null
Device.prototype._fire = _fire
Device.prototype.on = _on
Device.prototype.emit = _emit

export default Device
