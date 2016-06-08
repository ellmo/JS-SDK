'use strict'

function SDKEvent () {}

SDKEvent.CONNECT = 'connect' // 连接设备
SDKEvent.DISCONNECT = 'disconnect' // 断开设备连接
SDKEvent.DATA = 'data' // 设备数据更新
SDKEvent.SUBSCRIBE = 'subscribe' // 订阅设备
SDKEvent.UNSUBSCRIBE = 'unsubscribe' // 取消订阅设备
SDKEvent.SENDDATA = 'senddata' // 发送设备数据
SDKEvent.READY = 'ready' // SDK 就绪，可以扫描设备
SDKEvent.STATUSCHANGE = 'statuschange' // SDK 状态，即蓝牙和WIFI状态改变事件
SDKEvent.STARTSCAN = 'startscan' // 开始扫描设备
SDKEvent.CANCELSCAN = 'cancelscan' // 取消扫描设备
SDKEvent.SCAN = 'scan' // 扫描设备完成
SDKEvent.DESTORY = 'destory' // 销毁一个连接实例
SDKEvent.TIMEOUT = 'timeout' // 超时
SDKEvent.UIBACK = 'uiback' // android系统的后退按钮事件
SDKEvent.ERROR = 'error'

module.exports = SDKEvent
