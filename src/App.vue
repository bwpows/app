<template>
  <v-app>
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
</style>
