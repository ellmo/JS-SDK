import lang from 'lodash/Lang'

export function objectChect (obj) {
  if (!lang.isObject(obj)) {
    throw new TypeError('must be Object')
  }
}

export function functionChect (obj) {
  if (!lang.isFunction(obj)) {
    throw new TypeError('must be function')
  }
}

export function stringChect (obj) {
  if (!lang.isString(obj)) {
    throw new TypeError('must be string')
  }
}

export function objectOrArrayChect (obj) {
  if (!lang.isObject(obj) && !lang.isArray(obj)) {
    throw new TypeError('must be object or array')
  }
}
