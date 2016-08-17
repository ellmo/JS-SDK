'use strict'

import {deviceEvent} from './enum'
import {isFunction, isString, isPlainObject} from './util/lang'

function _on (event, calback) {
  if (!(isString(event) && isFunction(calback))) {
    throw new TypeError('error params')
  }

  switch (event) {
    case deviceEvent.CONNECT:
      this._callback[deviceEvent.CONNECT] = calback
      break
    case deviceEvent.DISCONNECT:
      this._callback[deviceEvent.DISCONNECT] = calback
      break
    case deviceEvent.STATUSCHANGE:
      this._callback[deviceEvent.STATUSCHANGE] = calback
      break
    case deviceEvent.DATA:
      this._callback[deviceEvent.DATA] = calback
      break
    case deviceEvent.ERROR:
      this._callback[deviceEvent.ERROR] = calback
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }

  return this
}

function _emit (event, data, cb) {
  if (!isString(event)) {
    throw new TypeError('error params')
  }
  if (event === deviceEvent.SENDDATA) { // 发送数据时，数据项不能为空
    if (!isString(data) && !isPlainObject(data)) {
      throw new TypeError('error params')
    }

    if (cb && !isFunction(cb)) {
      throw new TypeError('error params')
    }
  }

  switch (event) {
    case deviceEvent.CONNECT:
      if (this._connect) {
        this._connect()
      }
      break
    case deviceEvent.DISCONNECT:
      if (this._disconnect) {
        this._disconnect()
      }
      break
    case deviceEvent.SENDDATA:
      if (this._sendData) {
        this._sendData(data, cb)
      }
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }
}

function _fire (event, data) {
  switch (event) {
    case deviceEvent.CONNECT:
      if (this._callback[deviceEvent.CONNECT]) {
        this._callback[deviceEvent.CONNECT](data)
      }
      break
    case deviceEvent.DISCONNECT:
      if (this._callback[deviceEvent.DISCONNECT]) {
        this._callback[deviceEvent.DISCONNECT]()
      }
      break
    case deviceEvent.DATA:
      if (this._callback[deviceEvent.DATA]) {
        this._callback[deviceEvent.DATA](data)
      }
      break
    case deviceEvent.STATUSCHANGE:
      if (this._callback[deviceEvent.STATUSCHANGE]) {
        this._callback[deviceEvent.STATUSCHANGE](data)
      }
      break
    case deviceEvent.ERROR:
      if (this._callback[deviceEvent.ERROR]) {
        this._callback[deviceEvent.ERROR](data)
      }
      break
    default:
      console.warn(event + 'is not support')
      break
  }
}

function Device (option) {
  for (var prop in option) {
    this[prop] = option[prop]
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
