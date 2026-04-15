const dConsole = Object.assign({}, console);
const buildMsg = (level, ...data) => {
  if (!window.SANDBOX_LOG_FLAG) return;
  // dConsole[level]?.(...data);
  data = cleanUnclonableFields(data)
  window.parent.postMessage({level, data, id: performance.now() + "_" + Math.random()});
}
console = {
  log: (...data) => buildMsg("log", ...data),
  sys: (...data) => buildMsg("sys", ...data),
  error: (...data) => buildMsg("error", ...data),
  warn: (...data) => buildMsg("warn", ...data),
  info: (...data) => buildMsg("info", ...data),
  debug: (...data) => buildMsg("debug", ...data)
}

/**
 * 清理对象，删除所有 structuredClone 不可克隆的字段
 * @param {any} obj 原始对象
 * @returns {any} 可被 structuredClone 克隆的纯净对象
 */
function cleanUnclonableFields(obj) {
  // 1. 基础类型：直接返回（null/undefined/字符串/数字/布尔）
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // 2. 过滤：不可克隆的类型直接返回 undefined（会被删除）
  const invalidTypes = [
    'function', 'symbol', // 函数、Symbol
    'WeakMap', 'WeakSet', // 弱引用集合
    'Error', 'Event', 'DOMException', // 错误/事件
    'HTMLElement', 'SVGElement' // DOM 元素
  ];

  const type = Object.prototype.toString.call(obj).slice(8, -1);
  if (invalidTypes.includes(typeof obj) || invalidTypes.includes(type)) {
    return undefined;
  }

  // 3. 数组：递归清理每一项
  if (Array.isArray(obj)) {
    return obj.map(item => cleanUnclonableFields(item)).filter(item => item !== undefined);
  }

  // 4. 普通对象：递归清理每个属性
  const cleanedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    const cleanedValue = cleanUnclonableFields(value);
    // 只保留有效字段
    if (cleanedValue !== undefined) {
      cleanedObj[key] = cleanedValue;
    }
  }
  return cleanedObj;
}