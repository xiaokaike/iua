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
    <qrcode :val="deviceUrl" size="128" bgc="#FFFFFF" fgc="#000000" level="L"></qrcode>
  </div>
</template>

<script>
import qrcode from './components/qrcode.vue'
import conf from './conf.js'

export default {
  data () {
    return {
      title: 'dashboard',
      cid: conf.cid,
      devices: [],
      info: {
        ua: ''
      },
      deviceUrl: ''
    }
  },
  components: {
    qrcode
  },
  created () {
    this.deviceUrl = conf.originUrl + '/device/' + conf.cid
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

<style lang="stylus">
body
  margin 0
  background-color white
  height 100%

#app
  display -webkit-box
  position absolute
  width 100%
  height 100%

#device-menu
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

#info
  -webkit-box-flex 1
  width 20%
  position relative
  padding 20px

textarea
  width 100%
  height 50px
  border 1px solid #DDD

.list
  display block
  list-style none
  padding 0
  margin 10px 0
  margin-top 20px

.item
  line-height 36px
  display -webkit-box
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

#qrcode
  padding 10px

.qrcode-tips
  text-align center
  color #333



</style>
