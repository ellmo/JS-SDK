# xlink jssdk

jssdk面向智能硬件的H5应用开发者，通过xlink jssdk接入云智易物联平台。支持WIFI、蓝牙和微信应用开发.


## 安装
###独立版本
直接在页面中插入 &lt;script src='/path/to/xsdk.js'&gt; 标签，XSDK 会被注册为一个全局变量
###npm
```
$ npm install xlink-jssdk --save
```

## 使用

###初始化
```
var XSDK = require('xlink-jssdk') // 独立版本不需要这一句，XSDK 为全局变量(window属性)

var sdk = new XSDK('type'[, option])
```

###事件监听
```
sdk.on('ready', function () {
    // do something (扫描设备或添加已有设备)
}).on('devicesready', function (devices) {
    // devices表示设备对象数组，可以通过devices建立设备连接，控制设备和监听设备数据
})
```

###触发事件
```
sdk.emit('startscan') // sdk扫描设备

device.emit('connect') // 建立设备连接
```

**详细信息请参考 [API 文档](./docs/xlink-jssdk接口文档.md)**
