export function isPlainObject (obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}

export function isFunction (fn) {
  return typeof fn === 'function'
}

export function isString (str) {
  return typeof str === 'string'
}

export function isArray (arr) {
  return Array.isArray(arr)
}
