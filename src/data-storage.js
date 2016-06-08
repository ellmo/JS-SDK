'use strict'

import _ from 'lodash'

function DataStorage () {
  if (this === DataStorage) {
    return DataStorage
  }
}

function _get (key, table) {
  if (!(_.isString(key))) {
    throw new Error(key + ' must be String type')
  }

  if (table === undefined) {
    // 在默认表中获取数据
  } else {
    if (!(_.isString(table))) {
      throw new Error(table + ' must be String type')
    }

    // 在table表中获取数据
  }
}

function _put (key, value, table) {
  if (!(_.isString(key))) {
    throw new Error(key + ' must be String type')
  }

  if (table === undefined) {
    // 在默认表中获取数据
  } else {
    if (!(_.isString(table))) {
      throw new Error(table + ' must be String type')
    }

    // 在table表中添加数据
  }
}

function _remove (key, table) {
  if (!(_.isString(key))) {
    throw new Error(key + ' must be String type')
  }

  if (table === undefined) {
    // 在默认表中获取数据
  } else {
    if (!(_.isString(table))) {
      throw new Error(table + ' must be String type')
    }

    // 在table表中添加数据
  }
}

function _insert (data, collection) {
  if (!(_.isObject(data))) {
    throw new Error(data + ' must be Object type')
  }

  if (!(_.isString(collection))) {
    throw new Error(collection + ' must be String type')
  }

  // 调用容器方法插入数据
}

function _find (collection, condition) {
  if (!(_.isObject(condition))) {
    throw new Error(condition + ' must be Object type')
  }

  if (!(_.isString(collection))) {
    throw new Error(collection + ' must be String type')
  }

  // 调用容器方法查找数据
}

function _update (value, collection, query) {
  if (!(_.isObject(value))) {
    throw new Error(value + ' must be Object type')
  }

  if (!(_.isString(collection))) {
    throw new Error(collection + ' must be String type')
  }

  if (!(_.isObject(query))) {
    throw new Error(query + ' must be Object type')
  }

  // 调用容器方法更新数据
}

function _delete (collection, query) {
  if (!(_.isObject(query))) {
    throw new Error(query + ' must be Object type')
  }

  if (!(_.isString(collection))) {
    throw new Error(collection + ' must be String type')
  }

  // 调用容器方法删除数据
}

DataStorage.get = _get
DataStorage.put = _put
DataStorage.remove = _remove
DataStorage.insert = _insert
DataStorage.find = _find
DataStorage.update = _update
DataStorage.delete = _delete

export default DataStorage
