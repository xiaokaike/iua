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

export default config