'use strict'

var express = require('express')
var socketIo = require('socket.io')
var path = require('path')
var _ = require('underscore')
var colors = require('colors')
var http = require('http')
var cookieParser = require('cookie-parser')
var qrcode = require('qrcode-terminal')
var ip = require('ip')
var AV = require('leanengine')

var app = express()
// 使用这个中间件
app.use(AV.Cloud)
app.use(express.static(path.join(__dirname, '../public/')))
app.use(cookieParser('iua secret cookie'));


var clients = {}

app.get('/device/:cid', function(req, res) {
  var params = req.params
  var cid = req.params.cid
  var ua = req.headers['user-agent']
  var deviceId = '';

  deviceId = req.cookies.deviceId || _uuid();

  var curClients = clients[cid]


  if (!_.isUndefined(curClients)) {
    
    curClients[deviceId] = 1;

    clientSocket.emit('client:update' + cid, {
      id: deviceId,
      name: deviceId,
      cid: cid,
      info: {
        ua: ua
      }
    })
  }

  res.cookie('deviceId', deviceId, {
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.send('xx')
  
  // res.render('device.ejs', {
  //   id: deviceId,
  //   cid: cid,
  //   ua: ua
  // })
})



/**
 *  server and port
 **/

var server = http.createServer(app)
var io = socketIo.listen(server)

var clientSocket = io.of('/client')
var deviceSocket = io.of('/device')

clientSocket.on('connection', function(socket) {
  var socketId
  socket.on('client:init', function(data) {
    socketId = data.cid
    clients[socketId] = {
      index: 0
    }
  })

  socket.on('disconnect', function() {
    if (socketId) delete clients[socketId]
  })

})

module.exports = server


/**
 * 生成唯一标识码的方法
 * @returns {string}
 */
function _uuid() {
  function s4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}