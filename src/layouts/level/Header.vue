<template>
    <v-app-bar app fixed elevation="0" class="footBG">
        <div @click="$router.go(-1)" fixed class="d-flex align-center" style="position: fixed">
            <v-icon size="30">mdi-chevron-left</v-icon>
        </div>
        <div class="d-flex align-center text-center justify-center" style="width: 100%;">
            {{$route.meta.title}}
        </div>
    </v-app-bar>
</template>
<script>

export default {
    name: 'OtherHeader',

    props: {
        title: {
            type: String,
            default:'标题'
        }
    },

    data:() => ({
        drawer: false
    })
}
</script>