export function generateId (obj) {
  Object.defineProperty(obj, "_id", {
    value: Symbol(),
    writable: false,
    enumerable: false,
    configurable: false
  });
}
