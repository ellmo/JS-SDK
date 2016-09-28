'use strict'

import {deviceEvent} from './enum'
import {isFunction, isString, isPlainObject, isArray} from './util/lang'

function _on (event, callback) {
  if (!(isString(event) && isFunction(callback))) {
    throw new TypeError('error params')
  }

  if (!this._callbacks[event]) {
    this._callbacks[event] = []
  }

  this._callbacks[event].push(callback)

  return this
}

function _emit (event, data, cb) {
  if (!isString(event)) {
    throw new TypeError('error params')
  }
  if (event === deviceEvent.SENDDATA) { // 发送数据时，数据项不能为空
    if (!isString(data) && !isPlainObject(data) && !isArray(data)) {
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

function _fire (event) {
  let args = Array.prototype.slice.call(arguments, 1);
  if (this._callbacks[event]) {
    this._callbacks[event].forEach((fn) => {
      fn.apply(null, args)
    })
  }
}

function Device (option) {
  for (var prop in option) {
    this[prop] = option[prop]
  }
  this._callbacks = {}
}

Device.prototype._sendData = null
Device.prototype._connect = null
Device.prototype._disconnect = null
Device.prototype._fire = _fire
Device.prototype.on = _on
Device.prototype.emit = _emit

export default Device
