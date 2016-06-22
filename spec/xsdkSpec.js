import XSDK from '../src/xsdk'

describe('XSDK property suite', function () {
  it('XSDK should be function type', function () {
    expect(typeof XSDK).toBe('function');
  });

  it('XSDK hasownproperty getXUI', function () {
    expect(XSDK.hasOwnProperty('getXUI')).toBe(true);
    expect(typeof XSDK.getXUI).toBe('function');
    expect(typeof XSDK.getXUI()).toBe('function');
  });

  it('XSDK hasownproperty getDataStorage', function () {
    expect(XSDK.hasOwnProperty('getDataStorage')).toBe(true);
    expect(typeof XSDK.getDataStorage).toBe('function');
    expect(typeof XSDK.getDataStorage()).toBe('function');
  });

  it('XSDK hasownproperty login', function () {
    expect(XSDK.hasOwnProperty('login')).toBe(true);
    expect(typeof XSDK.login).toBe('function');
    expect(XSDK.login).toThrowError('missing params');

    try {
      XSDK.login('abcd')
    } catch (e) {
      expect(e).toEqual(new Error('missing params'))
    }

    try {
      XSDK.login('abcd', {})
    } catch (e) {
      expect(e).toEqual(new Error({} + ' must be String type'));
    }

    describe('XSDK.login should return a promise', function () {
      it('XSDK.login should return a promise', function () {
        expect(typeof XSDK.login('abc', 'abc').then).toBe('function')
      })
    })
  });

  it('XSDK do not hasownproperty on', function () {
    expect(XSDK.hasOwnProperty('on')).toBe(false)
  });

  it('XSDK do not hasownproperty emit', function () {
    expect(XSDK.hasOwnProperty('on')).toBe(false)
  });

  it('XSDK do not hasownproperty type', function () {
    expect(XSDK.hasOwnProperty('type')).toBe(false)
  });

  it('XSDK do not hasownproperty devices', function () {
    expect(XSDK.hasOwnProperty('devices')).toBe(false)
  });
})

describe('XSDK instance test suite', function () {
  var sdk;
  beforeEach(function () {
    sdk = new XSDK('websocket')
  });

  it('XSDK must be a Singleton for each type', function () {
    var sdk1 = new XSDK('websocket', {
        type: 'remote',
        host: 'cm.xlink.cn:23777',
        appid: ''
    });
    var sdk2 = new XSDK('websocket', {
        type: 'remote',
        host: 'cm.xlink.cn:23777',
        appid: ''
    });
    expect(sdk1).toBe(sdk2)

    var sdk3 = new XSDK('bluetooth')
    expect(sdk1).not.toBe(sdk3)
  });

  it("XSDK instance support 'bluetooth' ,'wifi' and 'websocket'", function () {
    try {
      new XSDK('ABC')
    } catch (e) {
      expect(e).toEqual(new Error('ABC' + ' is not support'))
    }
  })

  it('XSDK instance hasownproperty on', function () {
    expect(sdk.hasOwnProperty('on')).toBe(true)
    describe("XSDK instance's method 'on' params test", function () {
      it("XSDK XSDK instance's method 'on' params has a event and a callback function", function () {
        try {
          sdk.on()
        } catch (e) {
          expect(e).toEqual(new Error('missing params'))
        }

        try {
          sdk.on('ready')
        } catch (e) {
          expect(e).toEqual(new Error('missing params'))
        }

        try {
          sdk.on('ready', {})
        } catch (e) {
          expect(e).toEqual(new Error({} + ' must be Function type'))
        }
      })
    })
  });

  it('XSDK instance hasownproperty emit', function () {
    expect(sdk.hasOwnProperty('on')).toBe(true)
  });

  it('XSDK instance hasownproperty type', function () {
    expect(sdk.hasOwnProperty('type')).toBe(true)
    expect(sdk.type).toBe('wifi')
  });

  it('XSDK instance hasownproperty devices', function () {
    expect(sdk.hasOwnProperty('devices')).toBe(true)
  });

  it('XSDK instance do not hasownproperty getXUI', function () {
    expect(sdk.hasOwnProperty('getXUI')).toBe(false);
  });

  it('XSDK instance do not hasownproperty getDataStorage', function () {
    expect(sdk.hasOwnProperty('getDataStorage')).toBe(false);
  });

  it('XSDK instance do not hasownproperty login', function () {
    expect(sdk.hasOwnProperty('login')).toBe(false);
  });
})
