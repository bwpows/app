<template>

  <v-app id="app">
    <keep-alive>
        <router-view class="Router"></router-view>
    </keep-alive>
    <other-snackbar />
  </v-app>
</template>

<script>
import OtherSnackbar from './layouts/other/Snackbar.vue'
import { io } from 'socket.io-client'
import { baseURL, wsURL } from './api/Server'
export default {
  name: 'app',
  data () {
    return {
      transitionName: 'slide-right'
    }
  },

  components: {
    OtherSnackbar,
  },

  mounted() {
    // const socket = io(wsURL);
    // socket.emit('findAllWs', (res)=>{
    //   console.log(res);
    // })
    // socket.emit('findOneWs', 10, (res) => {
    //   console.log(res)
    // })
    // socket.on('toAll', res => {
    //   console.log(res)
    // })
  }



}
</script>
<style lang="scss">

  .v-input--selection-controls__ripple{
    display: none !important;
  }
  .v-application--wrap{
    // min-height: 50vh !important;
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

  *{
    // user-select:none;
  }

</style>
