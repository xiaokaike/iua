'use strict';

var express = require('express')
var path = require('path')
var _ = require('underscore')
var app = express()
var colors = require('colors')
var http = require('http')

var app = new express()

app.set('port', process.env.PORT || 1024)
app.set('view engine', 'ejs')
app.set('root', path.resolve(__dirname, '../').replace(/\/+$/, ''))
app.set('views', app.get('root') + '/views')
app.use(express.static(path.join(app.get('root'), 'public')))

// index
app.get('/', function(req, res) {
    res.render('dashboard.ejs',{})
})

app.get('/device/:cid', function (req, res){
	var params = req.params
	var cid = req.params.cid
	var ua = req.headers['user-agent']

	res.render('device.ejs',{
		cid: cid,
		ua: ua
	})

	clientSocket.emit('client:update', {
		cid: cid,
		info: {
			device: 'aaa',
			ua: ua
		}
	})

})

var server = http.createServer(app)
var io = require('socket.io').listen(server)

var clientSocket = io.of('/client')
var deviceSocket = io.of('/device')

clientSocket.on('connection', function (socket) {
    var socketId

    socket.on('client:init', function (data) {
        console.log(data)
    })
    

	clientSocket.emit('client:update', {
		cid: 'xxx',
		info: 'xxxx'
	})
})



/**
 *  server and port
 **/
var port = app.get('port')
server.listen(port, function() {
    console.log('Server is listen on port', String(port).blue)
})
