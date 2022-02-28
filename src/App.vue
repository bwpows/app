<template>
  <div>
      <router-view></router-view>
      <v-snackbar v-model="snackbar.value" timeout="1500" light top>{{snackbar.content}}</v-snackbar>
  </div>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),

  computed: {
      snackbar () {
          return this.$store.state.app.snackbar;　　//需要监听的数据
      }
  }
};
</script>
