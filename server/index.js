'use strict'

var express = require('express')
var socketIo = require('socket.io')
var path = require('path')
var _ = require('underscore')
var colors = require('colors')
var parser = require('ua-parser-js')
var http = require('http')
var cookieParser = require('cookie-parser')
var qrcode = require('qrcode-terminal')
var ip = require('ip')
var AV = require('leanengine')

var app = express()

app.set('view engine', 'ejs')

// 使用这个中间件
app.use(AV.Cloud)
app.set('views', path.join(__dirname, '../views'))
app.use(cookieParser('iua secret cookie'))


var clients = {}

// index
app.get('/', function(req, res) {
  var ua = req.headers['user-agent']
  var current = {
    id: '',
    name: '当前设备',
    uastring: ua,
    info: JSON.stringify(parser(ua))
  }

  res.render('dashboard.ejs', {
    current: JSON.stringify(current)
  })
})

app.get('/device/:cid', function(req, res) {
  var params = req.params
  var cid = req.params.cid
  var ua = req.headers['user-agent']
  var deviceId = req.cookies.deviceId || _uuid()
  var linkClients = clients[cid]
  var deviceInfo = {
    id: deviceId,
    name: deviceId,
    cid: cid,
    uastring: ua,
    info: JSON.stringify(parser(ua))
  }

  res.cookie('deviceId', deviceId, {
    maxAge: 7 * 24 * 60 * 60 * 1000
  })
  res.render('device.ejs', deviceInfo)

  if (!_.isUndefined(linkClients)) {
    linkClients[deviceId] = 1;
    clientSocket.emit('client:update' + cid, deviceInfo)
  }
})

app.use(express.static(path.join(__dirname, '../public/')))

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