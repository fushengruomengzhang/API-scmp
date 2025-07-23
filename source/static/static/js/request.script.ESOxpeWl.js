const dConsole = Object.assign({}, console);
const buildMsg = (type, ...data) => {
  if (!window.SANDBOX_LOG_FLAG) return;
  window.parent.postMessage({type, data, id: performance.now() + "_" + Math.random()});
}
console = {
  log: (...data) => buildMsg("log", ...data),
  sys: (...data) => buildMsg("sys", ...data),
  error: (...data) => buildMsg("error", ...data),
  warn: (...data) => buildMsg("warn", ...data),
  info: (...data) => buildMsg("info", ...data),
  debug: (...data) => buildMsg("debug", ...data)
}