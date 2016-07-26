import {isArray} from './lang'

export function find (arr, predicate) {
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
