<template>
  <v-app style="min-height: 100vh">
      <router-view></router-view>
      <other-snackbar />
  </v-app>
</template>

<script>

import OtherSnackbar from './layouts/other/Snackbar.vue'
export default {
  name: 'App',

  data: () => ({
    //
  }),

  components: {
    OtherSnackbar,
  }
};
</script>

<style>
.v-input--selection-controls__ripple{
  display: none !important;
}
.v-application--wrap{
  min-height: 50vh !important;
}
</style>
