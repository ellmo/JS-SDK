import SDKEvent from '../sdk-event'
import SDKState from '../sdk-state'
import Device from '../device'
import {functionChect, stringChect, objectOrArrayChect} from '../util/lang'

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
  if (!window.io) {
    throw new Error('socket.io do not exsit')
  }

  /* eslint-disable */
  var _socket = window.io(option.host)
  /* eslint-enable */

  // 注册socket的状态的监听事件
  _socket.on('connect', function () {
    sdk._status = SDKState.CONNECT
  }).on('reconnect', function () {
    sdk._status = SDKState.CONNECT
  }).on('disconnect', function () {
    sdk._status = SDKState.DISCONNECT
  }).on('reconnect_attempt', function () {
    sdk._status = SDKState.CONNECTTING
  }).on('reconnecting', function () {
    sdk._status = SDKState.CONNECTTING
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

      if (status === SDKState.CONNECT && !sdk._isReady) {
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

  sdk.status = SDKState.DISCONNECT
}

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

function _on (event, callback) {
  stringChect(event)
  functionChect(callback)

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

function _emit (event, params) {
  stringChect(event)
  objectOrArrayChect(params)

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
    user_id: param.user_id,
    token: param.token,
    socket: this._socket
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
  stringChect(data)

  this._socket.emit('device.senddata', data, function (data) {
    console.log(data)
  })
}

// 连接设备
function _connect () {
  var params = {
    deviceid: this._id,
    appid: this._user_id,
    token: this._token
  }

  this._socket.emit('device.connect', params, function () {
    this._fire(SDKEvent.CONNECT)
  }.bind(this))
}

// 断开设备
function _disconnect () {
  var params = {
    deviceid: this._id,
    data: ''
  }
  this._socket.emit('device.disconnect', params, function () {
    this._fire(SDKEvent.DISCONNECT)
  })
}

// 分发设备数据
function _dispatchDeviceData (devices, data) {
  var device = devices.find(function (item) {
    return item._id === data.deviceid.toString()
  })

  if (device) {
    var params = {
      data: data.data,
      type: data.type
    }
    device._fire(SDKEvent.DATA, params)
  }
}

// 分发设备状态
function _dispatchDeviceStatus (devices, status) {
  var device = devices.find(function (item) {
    return item._id === status.deviceid.toString()
  })

  if (device) {
    device._fire(SDKEvent.STATUSCHANGE, status.state)
  }
}

export default initWebsocket
