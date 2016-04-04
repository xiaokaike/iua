'use strict';

var express = require('express')
var path = require('path')
var _ = require('underscore')
var app = express()
var colors = require('colors')
var http = require('http')
var cookieParser = require('cookie-parser');
var qrcode = require('qrcode-terminal');
var ip = require('ip');

var app = new express()

app.set('port', process.env.PORT || 1024)
app.set('view engine', 'ejs')
app.set('root', path.resolve(__dirname, '../').replace(/\/+$/, ''))
app.set('views', app.get('root') + '/views')
app.use(cookieParser('novelcn_yzw secret cookie'));

// index
app.get('/', function(req, res) {
  var ua = req.headers['user-agent']
  var current = {
    name: '当前设备',
    info: {
      ua: ua
    }
  }

  res.render('dashboard.ejs', {
    current: JSON.stringify(current)
  })
})

app.get('/client/:cid', function(req, res) {

})

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

  res.render('device.ejs', {
    id: deviceId,
    cid: cid,
    ua: ua
  })
})



var clients = {}

var server = http.createServer(app)
var io = require('socket.io').listen(server)

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

// setInterval(function(){
// 	var date = Date.now();
// 	_.each(clients, function(val, key){
// 		console.log('client->[', date, ']', key)
// 	})
// }, 10000);


app.use(express.static(path.join(app.get('root'), 'public')))


/**
 *  server and port
 **/

var port = app.get('port')
server.listen(port, function() {
  var url = 'http://'+ip.address()+ ':' + port


  console.log('Server on url', String(url).blue)

  qrcode.generate(url, function (qrcode) {
    console.log(qrcode);
  });
  
})



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