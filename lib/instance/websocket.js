import io from 'socket.io-client'
import {SDKStatus, SDKEvent, deviceEvent, deviceStatus} from '../enum'
import Device from '../device'
import {isFunction, isString, isPlainObject, isArray} from '../util/lang'
import {find} from '../util/array'
import debug from 'debug'

var log = debug('xsdk-websocket')

function initWebsocket (xsdk, option) {
  if (!option.host) {
    throw new Error("'host' is necessary")
  }

  _initState(xsdk)

  xsdk._isReady = false
  xsdk._callback = {}
  xsdk._socket = _initSocketIO(xsdk, option)
  xsdk.devices = []
  xsdk.on = _on
  xsdk.emit = _emit
}

function _initSocketIO (sdk, option) {
  log('init socket-io')
  // option 参数结构:
  // {
  //   type: 'remote', //固定为remote 暂时未处理该参数
  //   host: 'url',
  //   userid: '' // 通过云智易restful接口获取，暂时未处理该参数
  // }

  if (!io) {
    throw new Error('socket.io do not exsit')
  }

  var _socket = io(option.host)

  // 注册socket的状态的监听事件
  _socket.on('connect', function () {
    sdk._status = SDKStatus.CONNECT
  }).on('reconnect', function () {
    sdk._status = SDKStatus.CONNECT
  }).on('disconnect', function () {
    sdk._status = SDKStatus.DISCONNECT
  }).on('reconnect_attempt', function () {
    sdk._status = SDKStatus.CONNECTTING
  }).on('reconnecting', function () {
    sdk._status = SDKStatus.CONNECTTING
  }).on('reconnect_error', function (error) {
    _fire(sdk, SDKEvent.ERROR, error)
  }).on('reconnect_failed', function () {
    _fire(sdk, SDKEvent.ERROR, {})
  }).on('error', function (error) {
    _fire(sdk, SDKEvent.ERROR, error)
  }).on('device.onRecvData', function (data) {
    _dispatchDeviceData(sdk.devices, data)
  }).on('device.onState', function (status) {
    _dispatchDeviceStatus(sdk.devices, status)
  })

  return _socket
}

// 初始化sdk状态
function _initState (sdk) {
  Object.defineProperty(sdk, '_status', {
    set: function (status) {
      if (this.status !== status) {
        _fire(sdk, SDKEvent.STATUSCHANGE, status)
      } else {
        return
      }

      if (status === SDKStatus.CONNECT && !sdk._isReady) {
        _fire(sdk, SDKEvent.READY)
        sdk._isReady = true // 自动重连不触发sdk ready时间。sdk的ready只触发一次
      }

      this.status = status
    },
    get: function () {
      return this.status
    },
    enumerable: false,
    configurable: false
  })

  sdk.status = SDKStatus.DISCONNECT
}

// 分发socket状态和数据
function _fire (sdk, event, params) {
  switch (event) {
    case SDKEvent.READY:
      if (sdk._callback[SDKEvent.READY]) {
        sdk._callback[SDKEvent.READY]()
      }
      break
    case SDKEvent.DEVICESREADY:
      if (sdk._callback[SDKEvent.DEVICESREADY]) {
        sdk._callback[SDKEvent.DEVICESREADY](params)
      }
      break
    case SDKEvent.STATUSCHANGE:
      if (sdk._callback[SDKEvent.STATUSCHANGE]) {
        sdk._callback[SDKEvent.STATUSCHANGE](params)
      }
      break
    case SDKEvent.ERROR:
      if (sdk._callback[SDKEvent.ERROR]) {
        sdk._callback[SDKEvent.ERROR](params)
      }
      break
    default:
      break
  }
}

// 监听sdk事件
function _on (event, callback) {
  if (!(isString(event) && isFunction(callback))) {
    throw new TypeError('error params')
  }

  switch (event) {
    case SDKEvent.READY:
      this._callback[SDKEvent.READY] = callback
      break
    case SDKEvent.DEVICESREADY:
      this._callback[SDKEvent.DEVICESREADY] = callback
      break
    case SDKEvent.STATUSCHANGE:
      this._callback[SDKEvent.STATUSCHANGE] = callback
      break
    case SDKEvent.ERROR:
      this._callback[SDKEvent.ERROR] = callback
      break
    default:
      console.warn('event: ' + event + 'is not support')
      break
  }

  return this
}

// sdk 触发事件
function _emit (event, params) {
  if (!isString(event)) {
    throw new TypeError('error params')
  }
  if (event === SDKEvent.ADDDEVICES) { // 添加设备时，数据项不能为空
    if (isArray(params)) {
      params.forEach(function (item) {
        if (!isPlainObject(item)) {
          throw new TypeError('error params')
        }
      })
    } else {
      if (!isPlainObject(params)) {
        throw new TypeError('error params')
      }
    }
  }

  switch (event) {
    case SDKEvent.DESTORY:
      this._socket = null
      break
    case SDKEvent.ADDDEVICES:
      _addDevices.call(this, params)
      break
    default:
      console.warn('websocket do not support event: ' + event)
      break
  }
}

// 向sdk添加数据
function _addDevices (params) {
  var self = this
  _deviceImp(Device)
  if (params instanceof Array) {
    params.forEach(function (item) {
      _createDevice.call(self, item)
    })
  } else {
    _createDevice.call(self, params)
  }

  _fire(this, SDKEvent.DEVICESREADY, this.devices)
}

function _createDevice (param) {
  var option = {
    id: param.deviceid,
    userid: param.userid,
    token: param.token,
    _socket: this._socket
  }
  this.devices.push(new Device(option))
}

// 实现Device类的部分方法
function _deviceImp (Device) {
  Device.prototype._sendData = _sendData
  Device.prototype._connect = _connect
  Device.prototype._disconnect = _disconnect
}

// 设备发送数据
function _sendData (data) {
  this._socket.emit('device.senddata', data)
}

// 连接设备
function _connect () {
  var self = this
  var params = {
    deviceid: this.id,
    appid: this.userid,
    token: this.token
  }

  this._socket.emit('device.connect', params, function (data) {
    if (data.status === 200) {
      self._fire(deviceEvent.STATUSCHANGE, deviceStatus.ONLINE)
    } else if (data.status === 202) {
      self._fire(deviceEvent.STATUSCHANGE, deviceStatus.OFFLINE)
    } else {
      self._fire(deviceEvent.STATUSCHANGE, deviceStatus.ERROR)
    }
  })
}

// 断开设备
function _disconnect () {
  var params = {
    deviceid: this.id,
    data: ''
  }
  this._socket.emit('device.disconnect', params, function () {
    this._fire(deviceEvent.DISCONNECT)
  })
}

// 分发设备数据
function _dispatchDeviceData (devices, data) {
  var device = find(devices, function (item) {
    return item.id === data.deviceid.toString()
  })

  if (device) {
    var params = {
      data: data.data,
      type: data.type
    }
    device._fire(deviceEvent.DATA, params)
  }
}

// 分发设备状态
function _dispatchDeviceStatus (devices, status) {
  var device = find(devices, function (item) {
    return item.id === status.deviceid.toString()
  })

  if (device) {
    device._fire(deviceEvent.STATUSCHANGE, status.state)
  }
}

export default initWebsocket
