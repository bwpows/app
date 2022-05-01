<template>

  <v-app id="app">
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <OtherSnackbar />
  </v-app>

</template>

<script>
import OtherSnackbar from './layouts/other/Snackbar.vue'
// import { io } from 'socket.io-client'
// import { baseURL, wsURL } from './api/Server'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-right',
      usreInfo: JSON.parse(localStorage.getItem('userInfo')),
      socket: {}
    }
  },

  components: {
    OtherSnackbar,
  },

  mounted() {


    // const socket = io(baseURL+'chat');
    // console.log(this.usreInfo)
    // socket.emit('connection', this.usreInfo.userId,(res) =>{
    //   console.log(res)
    // })
    // socket.on('connect', res => {
    //   console.log(res)
    // })


    // console.log(null == undefined, 'test')




  }



}
</script>
<style lang="scss">

  .v-input--selection-controls__ripple{
    display: none !important;
  }

  #app{

    height: 100%;
    overflow-x: none;
    overflow-y: scroll;
    /*解决ios上滑动不流畅*/
    -webkit-overflow-scrolling: touch;
  }

    html, body{
      -webkit-overflow-scrolling:touch;/* 当手指从触摸屏上移开，会保持一段时间的滚动 */
      height: 100%;
  }


</style>
