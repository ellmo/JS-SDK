import io from 'socket.io-client'
import {SDKEvent, deviceEvent, deviceStatus} from '../enum'
import Device from '../device'
import {isFunction, isString, isPlainObject, isArray} from '../util/lang'
import debug from 'debug'

var log = debug('xsdk-websocket')

function initWebsocket (xsdk, option) {
  if (!option.host) {
    throw new Error("'host' is necessary")
  }

  xsdk._callback = {}
  xsdk.host = option.host
  xsdk.devices = []
  xsdk.on = _on
  xsdk.emit = _emit
  xsdk._isReady = true
}

function _createSocketIO (device, host) {
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

  var _socket = io(host)

  // 注册socket的状态的监听事件
  _socket.on('connect', function () {
    log('device ' + device.id + ' socket connected')
  }).on('reconnect', function () {
    log('device ' + device.id + ' socket reconnect')
  }).on('disconnect', function () {
    log('device ' + device.id + ' socket disconnect')
  }).on('reconnect_attempt', function () {
    log('device ' + device.id + ' socket reconnect_attempt')
  }).on('reconnecting', function () {
    log('device ' + device.id + ' socket reconnect_attempt')
  }).on('reconnect_error', function (error) {
    log('device ' + device.id + ' socket reconnect_error' + error)
  }).on('reconnect_failed', function () {
    log('device ' + device.id + ' socket reconnect_failed')
  }).on('error', function (error) {
    log('device ' + device.id + ' socket error' + error)
  }).on('device.onRecvData', function (data) {
    _recvDeviceData(device, data)
  }).on('device.onState', function (status) {
    _recvDeviceStatus(device, status)
  }).on('device.connect', function (data) {
    _recvDeviceConnect(device, data)
  })

  return _socket
}

// 分发sdk状态和数据
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
      // 没有其他合适位置触发该方法， 直接调用
      if (this._isReady) {
        callback()
      }
      break
    case SDKEvent.DEVICESREADY:
      this._callback[SDKEvent.DEVICESREADY] = callback
      // 如果设备已经就绪， 直接调用
      if (this.devices.length > 0) {
        callback(this.devices)
      }
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
      // 空实现
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
    token: param.token
  }
  var device = new Device(option)
  device._socket = _createSocketIO(device, this.host)
  this.devices.push(device)
}

// 实现Device类的部分方法
function _deviceImp (Device) {
  Device.prototype._sendData = _deviceSendData
  Device.prototype._connect = _deviceConnect
  Device.prototype._disconnect = _deviceDisconnect
}

// 设备发送数据
function _deviceSendData (data, cb) {
  var params = null
  if (data.type === 'datapoint') {
    params = {
      appid: this.userid,
      name: data.name || '',
      datapoint: data.data
    }
    // 设置数据端点
    this._socket.emit('device.setdata', params, cb)
  } else {
    params = {
      appid: this.userid,
      data: data,
      type: data.type,
      deviceid: this.id
    }
    // 发送透传数据
    this._socket.emit('device.senddata', params, cb)
  }
}

// 连接设备
function _deviceConnect () {
  var params = {
    deviceid: this.id,
    appid: this.userid,
    token: this.token
  }

  this._socket.emit('device.connect', params)
}

// 断开设备
function _deviceDisconnect () {
  var params = {
    deviceid: this.id,
    data: ''
  }
  this._socket.emit('device.disconnect', params, function () {
    this._fire(deviceEvent.DISCONNECT)
  })
}

// 设备设备收到数据
function _recvDeviceData (device, data) {
  if (device) {
    // 去除deviceid字段
    var params = {
      data: data.data,
      type: data.type
    }
    device._fire(deviceEvent.DATA, params)
  }
}

// 设备状态改变
function _recvDeviceStatus (device, status) {
  if (device) {
    device._fire(deviceEvent.STATUSCHANGE, status.state)
  }
}

// 收到设备连接成功消息
function _recvDeviceConnect (device, data) {
  if (data.status === 200) {
    device._fire(deviceEvent.STATUSCHANGE, deviceStatus.ONLINE)
  } else if (data.status === 202) {
    device._fire(deviceEvent.STATUSCHANGE, deviceStatus.OFFLINE)
  } else {
    device._fire(deviceEvent.STATUSCHANGE, deviceStatus.ERROR)
  }
  device._fire(deviceEvent.CONNECT, data)
}

export default initWebsocket
