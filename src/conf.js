/* eslint-disable */

var originUrl = window.location.origin
var cid = localStorage.getItem('__iua_cid')

if (!cid) {
  cid = _uuid()
  localStorage.setItem('__iua_cid', cid)
}


var config = {

  /**
   */
  cid: cid,

  originUrl: originUrl

}

/**
 * 生成唯一标识码的方法
 * @returns {string}
 */

function _uuid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}

export default config