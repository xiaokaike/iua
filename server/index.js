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

app.get('/device/:cid', function (req, res){
	var params = req.params
	var cid = req.params.cid
	var ua = req.headers['user-agent']
	var name = '设备'

	var curClients = clients[cid]
	if(!_.isUndefined(curClients)){
		curClients.index ++
		name += curClients.index

		clientSocket.emit('client:update' + cid, {
			name: name,
			cid: cid,
			info: {
				ua: ua
			}
		})
	}

	res.render('device.ejs',{
		name: name,
		cid: cid,
		ua: ua
	})
})


var clients = {}

var server = http.createServer(app)
var io = require('socket.io').listen(server)

var clientSocket = io.of('/client')
var deviceSocket = io.of('/device')

clientSocket.on('connection', function (socket) {
	var socketId
    socket.on('client:init', function (data) {
        socketId = data.cid
        clients[socketId] = {
        	index: 0
        }
    })

	socket.on('disconnect', function () {
        if (socketId) delete clients[socketId]
    })
    
})

// setInterval(function(){
// 	var date = Date.now();
// 	_.each(clients, function(val, key){
// 		console.log('client->[', date, ']', key)
// 	})
// }, 10000);


/**
 *  server and port
 **/
var port = app.get('port')
server.listen(port, function() {
    console.log('Server is listen on port', String(port).blue)
})
