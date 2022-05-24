<template>
    <v-app>
        <default-header v-if="this.$route.meta.index == 1" />
        <level-header v-else-if="this.$route.meta.index == 2" />
        <v-main class="ma-6" style="padding: 56px 0 60px 0; transition: all 0s;">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </v-main>
        <default-footer v-if="this.$route.meta.index == 1" />
    </v-app>
</template>

<script>
import LevelHeader from './level/Header.vue'
import DefaultHeader from './default/Header.vue'
import DefaultFooter from './default/Footer.vue'
import OtherSnackbar from './other/Snackbar.vue'

export default {
    components: {
        LevelHeader, DefaultHeader, DefaultFooter, OtherSnackbar
    },

    mounted() {
      this.init()
    },

    methods: {
      init(){
        let backgroundColor = null;
        if(this.$vuetify.theme.isDark){
          backgroundColor=this.$vuetify.theme.themes.dark.mainBG;
        }else{
          backgroundColor=this.$vuetify.theme.themes.light.mainBG;
        }
        var ws=null;
        // 扩展API加载完毕，现在可以正常调用扩展API
        function plusReady(){
          ws=plus.webview.currentWebview().setStyle({
            bounce:'vertical',
            background: backgroundColor,
            scrollIndicator: 'none'
          });
        }
        if(window.plus){
          plusReady();
        }else{
          document.addEventListener('plusready', plusReady, false);
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
    // height: 100%;
    // overflow-x: none;
    // overflow-y: scroll;
    /*解决ios上滑动不流畅*/
    // -webkit-overflow-scrolling: touch;
  // }


</style>
