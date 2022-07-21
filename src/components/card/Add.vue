<template>
    <v-card flat class="pa-6 rounded-lg d-flex justify-center animate__animated animate__fadeIn" height="180">
        <img :src="AddSvg" alt="添加银行卡" style="opacity: .5;" @click="goAddCard">
    </v-card>
</template>

<script>
import AddSvg from '../../assets/icon/add.svg'
export default {
    name: 'AddBank',
    data(){
        return {
            AddSvg,
            userInfo: JSON.parse(localStorage.getItem('userInfo'))
        }
    },
    
    methods: {
        goAddCard(){
            this.$router.push('/card/add')
        }
    },
}

</script>