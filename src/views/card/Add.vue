<template>
    <div>
        <v-card class="px-6 py-3 mb-5">
            <input type="string" placeholder="请输入银行卡名称（比如存钱卡）" v-model="addCard.card_name" maxLength="5" style="border: none; width: 100%; height: 40px;" :class="$vuetify.theme.dark?'white--text':''" class="body-1" />
        </v-card>
        <v-card class="pa-6">
            <div class="grey--text mb-3">自定义银行卡尾号</div>
            <v-otp-input length="4" v-model="addCard.tailNumber"></v-otp-input>
        </v-card>
        <v-card class="mt-10 pa-1">
            <v-btn color="primary" width="100%" class="body-1" text @click="submit()" :loading="loading">添加银行卡</v-btn>
        </v-card>
    </div>
</template>
<script>
import { formatTime } from '../../util/formatTime'
import { addCard } from '../../api/Card'

export default {
    data() {
        return {
            addCard: {},
            loading: false,
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
        }
    },

    methods: {

        async submit(){
            console.log(formatTime(new Date(), 'YYYYMMdd'))
            let number_prefix = formatTime(new Date(), 'YYYYMMdd')
            if(!this.addCard.card_name){
                return this.$snackbar('请输入银行卡名称')
            }else if(!this.addCard.tailNumber || this.addCard.tailNumber.length !== 4){
                return this.$snackbar('请输入4位数银行卡尾号')
            }
            let obj = {
                user_id: this.userInfo.userId,
                name: this.addCard.card_name,
                number: number_prefix + this.randomNumber(4) + this.addCard.tailNumber
            }
            this.loading = true;
            let res = await addCard(obj);
            this.loading = false;
            if(res.code == 200){
                this.$router.go(-1)
            }else{
                this.$snackbar('添加失败，发生错误')
            }
        },

        randomNumber(len) {
            let chars = '0123456789';
            let maxPos = chars.length;
            let str = '';
            for (let i = 0; i < len; i++) {
                str += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return str;
        },

    },

}

</script>

<style>
    textarea:focus{
        outline: medium;
    }
    input:focus{
        outline: medium;
    }
    input{
        font-size: 1.05rem;
    }
</style>