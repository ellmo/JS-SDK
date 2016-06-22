'use strict'

import SDKEvent from './sdk-event'
import {functionChect, stringChect} from './util/lang'

function _on (event, fn) {
  stringChect(event)
  functionChect(fn)

  switch (event) {
    case SDKEvent.CONNECT:
      this._callback[SDKEvent.CONNECT] = fn
      break
    case SDKEvent.DISCONNECT:
      this._callback[SDKEvent.DISCONNECT] = fn
      break
    case SDKEvent.STATUSCHANGE:
      this._callback[SDKEvent.STATUSCHANGE] = fn
      break
    case SDKEvent.DATA:
      this._callback[SDKEvent.DATA] = fn
      break
    case SDKEvent.ERROR:
      this._callback[SDKEvent.ERROR] = fn
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }

  return this
}

function _emit (event, data) {
  stringChect(event)
  event === SDKEvent.SENDDATA ? stringChect(data) : null

  switch (event) {
    case SDKEvent.CONNECT:
      this._connect()
      break
    case SDKEvent.DISCONNECT:
      this._disconnect()
      break
    case SDKEvent.SENDDATA:
      this._sendData(data)
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
