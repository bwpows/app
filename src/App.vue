<template>

  <div>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <OtherSnackbar />
  </div>

</template>

<script>
import { io } from 'socket.io-client'
import { getUnreadAlert } from './api/Message'
import { baseURL } from './api/Server'
import OtherSnackbar from './layouts/other/Snackbar.vue'
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
    const socketChat = io(baseURL+'chat',{
      auth: {
        user_id: this.usreInfo.userId
      }
    });

    const socketAlert = io(baseURL+'alert',{
      auth: {
        user_id: this.usreInfo.userId
      }
    });


    if(this.usreInfo){
      this.getUnreadNum()

      // 聊天的 socket
      socketChat.on('sendChat', (res) => {
          console.log(res)
      })
      socketChat.on("disconnect", () => {
        socketChat.connect();
      });

      // 提示的 socket
      socketAlert.on("disconnect", () => {
        socketAlert.connect();
      });
      socketAlert.on('alert', (res) => {
        plus.push.setAutoNotification( false )
        plus.push.createMessage('您有一条新消息')
        getUnreadAlert(this.usreInfo.userId).then(res => {
          if(res.code == 200){
            this.$store.commit('app/updateUnreadNum', res.data.num)
          }
        })
      })

    }

  },
  methods: {
    async getUnreadNum(){
      let res = await getUnreadAlert(this.usreInfo.userId)
      if(res.code == 200){
        this.$store.commit('app/updateUnreadNum', res.data.num)
      }
    }
  },



}
</script>
<style lang="scss">

  .v-input--selection-controls__ripple{
    display: none !important;
  }

  // #app{
  //   height: 100%;
  //   overflow-x: none;
  //   overflow-y: scroll;
  //   -webkit-overflow-scrolling: touch;
  // }
  // html, body{
  //   -webkit-overflow-scrolling:touch;/* 当手指从触摸屏上移开，会保持一段时间的滚动 */
  //   height: 100%;
  // }


</style>
