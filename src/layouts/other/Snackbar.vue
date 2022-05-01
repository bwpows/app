<template>
  <div class="text-center ma-2">
    <v-snackbar v-model="snackbar.value" top timeout="1500" fixed>
      {{snackbar.content}}

      <template v-slot:action="{ attrs }">
        <v-btn color="primary" text v-bind="attrs" @click="snackbar.value = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'Snackbar',

  data: () => ({
    //
  }),

  computed: {
      snackbar () {
          return this.$store.state.app.snackbar;
      }
  }
};
</script>