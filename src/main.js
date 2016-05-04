/* eslint-disable */
import Vue from 'vue'
import App from './App.vue'
import conf from './conf.js'

var map = {}

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

new Vue({
  el: 'body',
  components: { App }
})

console.log(conf.originUrl)

var socket = io.connect(conf.originUrl + '/client')

socket.emit('client:init', {
  cid: conf.cid
})

socket.on('client:update' + conf.cid, function(data) {
  if (!map[data.id]) {
    map[data.id] = true
    console.log(data)
  }    
})