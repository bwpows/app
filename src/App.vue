<template>
  <div>
      <router-view></router-view>
      <other-snackbar />
  </div>
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
