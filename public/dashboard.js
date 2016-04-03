// socket

! function() {
  var originUrl = window.location.origin
  var cid = localStorage.getItem('_yourua_cid');

  if (!cid) {
    cid = _uuid()
    localStorage.setItem('_yourua_cid', cid)
  }

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

  // init
  var app = new Vue({
    el: '#app',
    data: {
      title: 'dashboard',
      cid: '',
      devices: [],
      info: {
        ua: ''
      },
      qrcode: '',
      deviceUrl: ''
    },
    created: function() {
      this.cid = cid

      var deviceUrl = originUrl + '/device/' + cid


      this.deviceUrl = deviceUrl
      this.qrcode = QRCode.generatePNG(deviceUrl)

      this.update(_current)
    },
    ready: function() {

    },
    methods: {
      fetch: function() {

      },
      onDevices: function(e) {
        console.log(e)
        this._resetTab()
        e.$data.sel = true
        this.info = e.$data.info
      },
      update: function(data) {
        this._resetTab()
        data.sel = true
        this.devices.push(data)
        this.info = data.info
      },
      _resetTab: function() {
        this.devices.forEach(function(item) {
          item.sel = false
        })
      }
    }
  })

  var socket = io.connect(originUrl + '/client')

  socket.emit('client:init', {
    cid: cid
  })

  var map = {};

  socket.on('client:update' + cid, function(data) {
    if(!map[data.id]){
      map[data.id] = true
      app.update(data)  
    }    
  })


}()
