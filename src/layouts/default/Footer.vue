<template>
    <v-footer app fixed>
        <div style="width: 100%;" class="d-flex align-center text-center">
            <div style="display: inline-block; width: 30%">
                <v-img :src="path=='/'?homeSelectedSvg:homeSvg" height="30" contain @click="goRouter('/')"></v-img>
            </div>
            <div style="display: inline-block; width: 30%" class="ma-3">
                <v-img :src="logoSvg" :class="path=='/publish'?'':'selected'" height="35" contain @click="goRouter('/publish')"></v-img>
            </div>
            <div style="display: inline-block; width: 30%">
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
export default {

    name: 'DefaultFooter',

    data() {
        return {
            homeSvg, homeSelectedSvg, userSvg, userSelectedSvg, logoSvg,
            path: ''
        }
    },

    mounted() {
        this.path = this.$route.path
    },

    watch:{
        $route(to,from){
            this.path = to.path
            console.log(to.path);
        }
    },
    methods: {
        goRouter(path){
            if(this.$route.path == path) return false;
            this.$router.replace(path)
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
