'use strict'

var SDKEvent = {
  READY: 'ready', // SDK 就绪，可以扫描设备
  STATUSCHANGE: 'statuschange', // SDK状态，即蓝牙和WIFI状态改变事件 见SDKStatus
  STARTSCAN: 'startscan', // 开始扫描设备
  CANCELSCAN: 'cancelscan', // 取消扫描设备
  DEVICESREADY: 'devicesready', // 添加或扫描设备完成
  ADDDEVICES: 'adddevices', // 添加设备
  DESTORY: 'destory', // 销毁一个连接实例
  TIMEOUT: 'timeout', // 超时
  UIBACK: 'uiback', // android系统的后退按钮事件
  ERROR: 'error'
}

var DeviceEvent = {
  CONNECT: 'connect', // 连接设备
  DISCONNECT: 'disconnect', // 断开设备连接
  DATA: 'data', // 设备数据更新
  SUBSCRIBE: 'subscribe', // 订阅设备
  UNSUBSCRIBE: 'unsubscribe', // 取消订阅设备
  SENDDATA: 'senddata', // 发送设备数据
  STATUSCHANGE: 'statuschange', // 设备状态改变，上线(1)或者下线(0) 见DeviceStatus
  ERROR: 'error'
}

var SDKStatus = {
  DISCONNECT: 0, // 默认为断开
  CONNECTTING: 1, // 正在连接
  CONNECT: 2 // 已连接
}

var SDKType = {
  WIFI: 'wifi',
  BLUETOOTH: 'bluetooth',
  WEBSOCKET: 'websocket'
}

export {SDKEvent, SDKStatus, SDKType}
