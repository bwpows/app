<template>
    <v-footer app fixed class="rounded-lg ma-4 mb-6 mx-6 confirmDialog">
        <div style="width: 100%;" class="d-flex align-center text-center py-3">
            <div class="footList">
                <v-img :src="path=='/'?homeSelectedSvg:homeSvg" height="30" contain @click="goRouter('/')"></v-img>
            </div>
            <div class="footList">
                <v-img :src="logoSvg" :class="path=='/work'?'':'selected'" height="28" contain @click="goRouter('/work')"></v-img>
            </div>
            <div class="footList position_relative">
                <div class="rounded-pill error d-flex align-center justify-center white--text body-2 px-1 red_dot" v-if="$store.state.app.unreadNum">
                    {{ $store.state.app.unreadNum>99?'99+':$store.state.app.unreadNum }}
                </div>
                <v-img :src="path=='/message'?messageSelectedSvg:messageSvg" height="30" contain @click="goRouter('/message')"></v-img>
            </div>
            <div class="footList">
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
import cardSvg from '@/assets/icon/card.svg'
import cardSelectedSvg from '@/assets/icon/cardSelected.svg'
export default {

    name: 'DefaultFooter',

    data() {
        return {
            homeSvg, homeSelectedSvg, userSvg, userSelectedSvg, logoSvg, messageSvg, messageSelectedSvg, cardSvg, cardSelectedSvg,
            path: '',
            // unreadNum: this.$store.state.app.unreadNum
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
    .red_dot{
        position: absolute;
        top: -12px;
        right: 8px;
        min-width: 20px;
        z-index: 10;
    }
    .footList{
        display: inline-block;
        width: 25%;
    }
    .position_relative{
        position: relative;
    }
</style>
