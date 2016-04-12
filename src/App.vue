<template>
  <div id="app">
    <div id="device-menu">
      <header>
        YOUR UA
      </header>
      <ul class="list">
        <li class="item"
            v-for="it in devices" 
            v-bind:class="active: sel"
            v-on:click="onDevices(this)">
            {{$index+1}}  {{it.name}}
        </li>
      </ul>
    </div>
    <div id="info">
      <h2>User Agent String explained :</h2>
      <div>
          <textarea>{{info.ua}}</textarea>
      </div>    
    </div>
    
    <!-- <div id="qrcode">
      <img v-bind:src="qrcode">
      <p>
          <input value="{{deviceUrl}}" readonly></input>
      </p>
      <p class="qrcode-tips">扫描二维码获取设备信息</p>
    </div> -->
    <qrcode val="xxx" size="128" bg-color="#FFFFFF" fg-color="#000000" level="L"></qrcode>
  </div>
</template>

<script>
import qrcode from './components/qrcode'

export default {
  data () {
    return {
      title: 'dashboard',
      cid: '',
      devices: [],
      info: {
        ua: ''
      },
      qrcode: '',
      deviceUrl: ''
    }
  },
  components: {
    qrcode
  },
  methods: {
    fetch () {

    },
    onDevices (e) {
      console.log(e)
      this._resetTab()
      e.$data.sel = true
      this.info = e.$data.info
    },
    update (data) {
      this._resetTab()
      data.sel = true
      this.devices.push(data)
      this.info = data.info
    },
    _resetTab () {
      this.devices.forEach(item => {
        item.sel = false
      })
    }
  }
}
</script>

<style>

</style>
