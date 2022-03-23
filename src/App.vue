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
}
</script>
<style lang="scss">

  .v-input--selection-controls__ripple{
    display: none !important;
  }
  // .v-application--wrap{
  //   min-height: 50vh !important;
  // }

</style>
