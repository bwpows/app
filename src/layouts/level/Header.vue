<template>
    <v-app-bar app fixed elevation="0" class="headerBG">
        <div @click="$router.go(-1)" fixed class="d-flex align-center pl-1" style="position: fixed">
            <v-img src="../../assets/icon/rightArrow.svg" max-width="20" contain></v-img>
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