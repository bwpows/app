
<template>
    <div>
        <v-card class="px-4 py-16 text-center">
            <div>当前手机号（可用于登录）</div>
            <div class="text-h3 font-weight-black mt-10"> {{ formatPhoneNumber(userInfo.phone) }} </div>
            <v-btn color="primary" depressed width="60%" class="body-1 mt-16">更换手机号</v-btn>
        </v-card>
    </div>
</template>
<script>
import { formatPhoneNumber } from '@/util/phone';
export default {
    data(){
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
        }
    },

    methods: {
        formatPhoneNumber
    },
}

</script>