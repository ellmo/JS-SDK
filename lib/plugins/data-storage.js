'use strict'

var _dataStorage = {
  get: _get,
  put: _put,
  remove: _remove,
  insert: _insert,
  find: _find,
  update: _update,
  delete: _delete
}

function getDataStorage () {
  return _dataStorage
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

export default getDataStorage
