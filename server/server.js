'use strict';

var express = require('express')
var path = require('path')
var app = express()
var colors = require('colors')
var http = require('http')


var app = new express()
var server = http.createServer(app)
var io = require('socket.io')(server, { log: false })

io.on('connection', function(){

})

/**
 *  static folder
 **/
app.use(express.static(path.join(__dirname, '../public')))

/**
 *  server and port
 **/
var port = process.env.PORT || 1024
app.listen(port, function () {
    console.log('Server is listen on port', String(port).blue)  
})