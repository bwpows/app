<template>
  <v-card class="mb-8">
    <v-img v-if="url" :src="url" style="width: 100%;" height="200" class="rounded-b-0" cover />
    <div class="pa-5">
        <h4> {{ title }} </h4>
        <div class="body-2 my-3"> {{ description }} </div>
        <div class="body-2 grey--text"> {{ createdTime }} </div>
    </div>
  </v-card>
</template>

<script>
export default {
    name: 'BlogList',

    props: {

        url: {
            type: String,
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        createdTime: {
            type: String,
        }
    },
}
</script>