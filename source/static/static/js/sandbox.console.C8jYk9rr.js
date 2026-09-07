/**
 * 能原样 clone → 原样保留
 * 不能 clone → 转换成可 clone 的描述对象
 * @param obj
 * @param seen
 * @return {string|number|boolean|bigint|{__console_type__: string}|{}|{__console_type__: string, tagName: string, id, className: string|string, outerHTML: string}|{__console_type__: string, value: string}|{__console_type__: string, name: string, message: string, stack: string}|{__console_type__: string, type: string, target: {tagName: *, id, className: *|string}, currentTarget: {tagName: *, id, className: *|string}}|{__console_type__: string, name, source: any|string}|*}
 */
function cleanUnclonableFields(obj, seen = new WeakSet()) {

  // 基础类型
  if (obj === null || typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean'
      || typeof obj === 'undefined' || typeof obj === 'bigint') {
    return obj
  }
  // Function
  if (typeof obj === 'function') return {__console_type__: 'Function', name: obj.name || '', source: safeToString(obj)}
  // Symbol
  if (typeof obj === 'symbol') return {__console_type__: 'Symbol', value: obj.toString()}
  // 循环引用
  if (typeof obj === 'object') {
    if (seen.has(obj)) return {__console_type__: 'Circular'}
    seen.add(obj)
  }
  // Error
  if (obj instanceof Error) return {__console_type__: 'Error', name: obj.name, message: obj.message, stack: obj.stack}
  // DOM Event
  if (typeof Event !== 'undefined' && obj instanceof Event) {
    return {
      __console_type__: 'Event', type: obj.type,
      target: safeDescribeDom(obj.target),
      currentTarget: safeDescribeDom(obj.currentTarget)
    }
  }
  // DOM Element
  if (typeof Element !== 'undefined' && obj instanceof Element) {
    return {
      __console_type__: 'HTMLElement', tagName: obj.tagName, id: obj.id || '',
      className: typeof obj.className === 'string' ? obj.className : '',
      outerHTML: obj.outerHTML
    }
  }
  // Date
  if (obj instanceof Date) return {__console_type__: 'Date', value: obj.toISOString()}
  // RegExp
  if (obj instanceof RegExp) return {__console_type__: 'RegExp', value: obj.toString()}
  // Map
  if (obj instanceof Map) {
    return {__console_type__: 'Map', value: Array.from(obj.entries()).map(([key, value]) => [cleanUnclonableFields(key, seen), cleanUnclonableFields(value, seen)])}
  }
  // Set
  if (obj instanceof Set) return {__console_type__: 'Set', value: Array.from(obj).map(value => cleanUnclonableFields(value, seen))}
  // WeakMap / WeakSet
  if (typeof WeakMap !== 'undefined' && obj instanceof WeakMap) return {__console_type__: 'WeakMap'}
  if (typeof WeakSet !== 'undefined' && obj instanceof WeakSet) return {__console_type__: 'WeakSet'}
  // Array
  if (Array.isArray(obj)) return obj.map(item => cleanUnclonableFields(item, seen))
  // 普通对象
  const cleanedObj = {}

  for (const [key, value] of Object.entries(obj)) {
    try {cleanedObj[key] = cleanUnclonableFields(value, seen)} catch (e) {cleanedObj[key] = {__console_type__: 'Unserializable', message: e.message}}
  }

  return cleanedObj
}

function safeToString(value) {
  try {return Function.prototype.toString.call(value)} catch (e) {return '[Function]'}
}

function safeDescribeDom(element) {
  if (!element) return null
  try {
    return {
      tagName: element.tagName, id: element.id || '',
      className: typeof element.className === 'string' ? element.className : ''
    }
  } catch (e) {return null}
}

function clearScript() {
  const now = performance.now();
  if (window.__paramScripts_) {
    const iterator = window.__paramScripts_.values();
    let current = iterator.next();
    while (!current.done) {
      const value = current.value;
      current = iterator.next();
      if (now - window[value].time < 600000) continue;
      window.__paramScripts_.delete(value);
      delete window[value];
    }
  }
}

window.cleanUnclonableFields = cleanUnclonableFields;
window.clearScript = clearScript
