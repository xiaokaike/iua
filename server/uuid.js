/**
 * 生成唯一标识码的方法
 * @returns {string}
 */
function uuid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}


module.exports = uuid