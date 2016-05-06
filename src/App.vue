<template>
<div id="app">
  <div class="dashboard">
    <div class="device-menu">
      <header>
        UA List
      </header>
      <ul class="list" data-select="{{selectId}}">
        <li class="item"
            v-for="it in devices" 
            v-bind:class="{active: it.id === selectId}"
            @click="onDevices(it)"
            data-id="{{it.id}}">
            {{$index+1}}{{it.name}}
        </li>
      </ul>
    </div>
    <div class="device-info">
      <h2>User Agent String explained :</h2>
      <div>
        <textarea v-model="currentUa"></textarea>
      </div>    
    </div>
    <div class="qrcode-wrap">
      <qrcode class="qrcode" :val="deviceUrl" size="160" bgc="#FFFFFF" fgc="#000000" level="L"></qrcode>  
    </div>
  </div>
</div>
</template>

<script>
import qrcode from './components/qrcode.vue'
import conf from './conf.js'
let uamap = {}

export default {
  data () {
    return {
      title: 'dashboard',
      cid: conf.cid,
      deviceUrl: '',
      devices: [],
      selectId: '',
      currentUa: '',
      currentInfo: {
      }
    }
  },
  components: {
    qrcode
  },
  created () {
    this.deviceUrl = conf.originUrl + '/device/' + conf.cid
    window.__current.id = conf.cid
    this.update(window.__current)
    this.initSocket()
  },
  methods: {
    fetch () {

    },
    onDevices (it) {
      this.selectId = it.id
      this.currentUa = it.uastring
      this.currentInfo = it.info
    },
    update (data) {
      this.devices.push(data)

      this.selectId = data.id
      this.currentUa = data.uastring
      this.currentInfo = data.info
    },
    initSocket () {
      var socket = io.connect(conf.originUrl + '/client')

      socket.emit('client:init', {
        cid: conf.cid
      })

      socket.on('client:update' + conf.cid, (data) => {
        if (!uamap[data.id]) {
          uamap[data.id] = true
          this.update(data)
        }    
      })
    }
  }
}
</script>

<style lang="stylus">
body
  margin 0
  background-color white
  height 100%

.dashboard
  display flex
  position absolute
  width 100%
  height 100%
  .device-menu
    width 300px
    background-image -webkit-linear-gradient(top,#664a86,#534292)
    background-image linear-gradient(to bottom,#664a86,#534292)
    background-color #534292
    header
      color white
      font-size 32px
      text-align center
      padding 5px 0
      padding-top 20px
      padding-bottom 10px
      box-shadow 0 1px 0 rgba(0,0,0,.1)
      background-color rgba(0,0,0,.05)
    .list
      display block
      list-style none
      padding 0
      margin 10px 0
      margin-top 20px
    .item
      line-height 36px
      display flex
      padding 5px 10px
      margin 10px
      cursor pointer
      color #fff
      margin 0
      font-size 18px
      &:hover
        background-color rgba(255,255,255,.2)
      &.active
        background-color rgba(0,0,0,.1)
  .device-info
    flex 1
    width 20%
    position relative
    padding 20px
    textarea
      font-size 14px
      width 100%
      height 50px
      border 1px solid #DDD

  .qrcode-wrap
    box-sizing border-box
    width 200px
    padding 10px
    taxe-aligin center
    .qrcode
      text-align center
      padding 10px 0
    .qrcode-tips
      text-align center
      color #333



</style>
