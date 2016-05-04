var socketIo = require('socket.io')
var http = require('http')

var clients = {}
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