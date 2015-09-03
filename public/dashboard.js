// socket

!function(){
	var originUrl = window.location.origin
	var cid = localStorage.getItem('_yourua_cid');

	if(!cid){
		cid = _uuid()
		localStorage.setItem('_yourua_cid', cid)
		console.log('[first user]', cid)
	}

	var socket = io.connect(originUrl + '/client')

	socket.emit('client:init',{
		cid: cid
	})
	
	socket.on('client:update' + cid, function (data) {
	    console.log(data)
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

	// init
	var app = new Vue({
		el: '#app',
		data: {
			title: 'dashboard',
			cid:'',
			devices: [],
			info:{
				ua: ''
			},
			qrcode: '',
		},
		created: function(){
			this.cid = cid

			var deviceUrl = originUrl + '/device/' +  cid

			console.log(deviceUrl);

			this.qrcode = QRCode.generatePNG(deviceUrl)
		},
		ready: function(){

			
		},
		methods: {
			fetch: function(){

			}
		}
	})

}()

