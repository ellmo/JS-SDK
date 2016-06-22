'use strict'

function DataStorage () {
  if (this === DataStorage) {
    return DataStorage
  }
}

function _get (key, table) {
  if (table === undefined) {
    // 在默认表中获取数据
  } else {
    // 在table表中获取数据
  }
}

function _put (key, value, table) {
  if (table === undefined) {
    // 在默认表中获取数据
  } else {
    // 在table表中添加数据
  }
}

function _remove (key, table) {
  if (table === undefined) {
    // 在默认表中获取数据
  } else {
    // 在table表中添加数据
  }
}

function _insert (data, collection) {
  // 调用容器方法插入数据
}

function _find (collection, condition) {
  // 调用容器方法查找数据
}

function _update (value, collection, query) {
  // 调用容器方法更新数据
}

function _delete (collection, query) {
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
