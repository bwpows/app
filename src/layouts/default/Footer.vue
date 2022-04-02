<template>
    <v-footer app fixed class="rounded-xl ma-4 mx-7  footBG">
        <div style="width: 100%;" class="d-flex align-center text-center py-3">
            <div style="display: inline-block; width: 25%">
                <v-img :src="path=='/'?homeSelectedSvg:homeSvg" height="30" contain @click="goRouter('/')"></v-img>
            </div>
            <div style="display: inline-block; width: 25%">
                <v-img :src="logoSvg" :class="path=='/work'?'':'selected'" height="30" contain @click="goRouter('/work')"></v-img>
            </div>
            <div style="display: inline-block; width: 25%">
                <v-img :src="path=='/message'?messageSelectedSvg:messageSvg" height="30" contain @click="goRouter('/message')"></v-img>
            </div>
            <div style="display: inline-block; width: 25%">
                <v-img :src="path=='/account'?userSelectedSvg:userSvg" height="30" contain @click="goRouter('/account')"></v-img>
            </div>
        </div>
    </v-footer>
</template>
<script>

import homeSvg from '@/assets/icon/home.svg'
import homeSelectedSvg from '@/assets/icon/homeSelected.svg'
import userSvg from '@/assets/icon/user.svg'
import userSelectedSvg from '@/assets/icon/userSelected.svg'
import logoSvg from '@/assets/logo.svg'
import messageSvg from '@/assets/icon/message.svg'
import messageSelectedSvg from '@/assets/icon/messageSelected.svg'
export default {

    name: 'DefaultFooter',

    data() {
        return {
            homeSvg, homeSelectedSvg, userSvg, userSelectedSvg, logoSvg, messageSvg, messageSelectedSvg,
            path: ''
        }
    },

    mounted() {
        this.path = this.$route.path
    },

    watch:{
        $route(to,from){
            this.path = to.path
        }
    },
    methods: {
        goRouter(path){
            if(this.$route.path == path) return false;
            this.$router.replace(path)
            // 手机震动
            // window.plus.device.vibrate(2000);
        },
    },
}

</script>

<style scoped>
    .selected {
        filter: grayscale(50%);
        filter: gray;
    }
</style>
