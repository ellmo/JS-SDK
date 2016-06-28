import XSDK from '../src/xsdk'

describe('XSDK 基本功能测试', function () {
  it('XSDK must be a Singleton for each type', function () {
    var wifi_1 = new XSDK('wifi');
    var wifi_2 = new XSDK('wifi');
    expect(wifi_1).toBe(wifi_2)

    var bt_1 = new XSDK('bluetooth')
    var bt_2 = new XSDK('bluetooth')
    expect(bt_1).toBe(bt_2)

    try {
      new XSDK('websocket')
    } catch (e) {
      expect(e instanceof TypeError).toEqual(true)
    } finally {

    }

    try {
      new XSDK('websocket', {
          type: 'remote',
          host: 'http://42.121.122.23:23775'
      })
    } catch (e) {
      expect(e instanceof TypeError).toEqual(true)
    } finally {

    }

    var ws_1 = new XSDK('websocket', {
        type: 'remote',
        host: '42.121.122.23:23775',
        userid: '1153087813'
    })

    var ws_2 = new XSDK('websocket', {
        type: 'remote',
        host: '42.121.122.23:23775',
        userid: '1153087813'
    })

    var ws_3 = new XSDK('websocket', {
        type: 'remote',
        host: 'http://42.121.122.24:23775',
        userid: '1153087813'
    })
    expect(ws_1).toBe(ws_2)
    expect(ws_1).not.toBe(ws_3)
  });
})
