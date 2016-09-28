import {isArray} from './lang'

function find (arr, predicate) {
  if (!isArray(arr)) {
    throw new TypeError('arr must be a array')
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function')
  }

  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return arr[i]
    }
  }
  return undefined
}

function remove (arr, predicate) {
  if (!isArray(arr)) {
    throw new TypeError('arr must be a array')
  }
  if (typeof predicate !== 'function') {
    throw new TypeError('predicate must be a function')
  }

  let deleted = []
  for (var i = 0; i < arr.length; i++) {
    if (predicate(arr[i])) {
      deleted.push(arr.splice(i, 1))
    }
  }
  return deleted
}

var _  = {
  find,
  remove
}
export default _
