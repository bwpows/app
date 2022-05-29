<template>
    <div>
        <bank-card-loading v-if="loading" />
        <v-img src="../../assets/common/bg.png" height="190px" width="100%" cover class="rounded-lg pa-5 mb-5 animate__animated animate__fadeIn" v-for="item in cardList" :key="item.key" v-else>
            <div class="d-flex justify-space-between align-center white--text font-weight-light" style="font-size: 20px;">
                <div class="font-weight-regular"> {{ item.name }} </div>
                <div style="font-weight:300; font-size: 14px;" class="d-flex">
                    <div class="mr-6" @click="goRouter('/card/recharge', item._id)">充值</div>
                    <div @click="goRouter('/card/consumption', item._id)">消费</div>
                </div>
            </div>

            <div class="mt-6 d-flex justify-space-between align-center white--text font-weight-regular" style="letter-spacing: 2px; font-size: 26px;">
                <div>¥ {{ isBalanceHide?'******':(item.balance).toFixed(2) }}</div>
                <div>
                    <v-img src="../../assets/icon/eye.svg" v-if="!isBalanceHide" width="30" height="30" contain @click="changeBalanceHide(1)"></v-img>
                    <v-img src="../../assets/icon/eye-close.svg" v-else width="30" height="30" contain @click="changeBalanceHide(0)"></v-img>
                </div>
            </div>

            <div class="mt-8 grey--text text--lighten-1 font-weight-regular" style="letter-spacing: 3px; font-size: 18px;">
                {{ calBankuNum(item.number) }}
            </div>
        </v-img>
    </div>
</template>
<script>
import { getCardByUser } from '../../api/Card'


export default {
    name: 'BankCard',

    data(){
        return {
            loading: true,
            isBalanceHide: (localStorage.getItem('balanceHide') == 1),
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            cardList: []
        }
    },

    mounted() {
        this.getCard()
    },

    methods: {

        changeBalanceHide(data){
            this.isBalanceHide = data
            localStorage.setItem('balanceHide', data)
        },

        calBankuNum(value){
            if(!value) return ''
            value = value.toString().replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
            return value
        },


        // 获取用户卡数据
        async getCard(){
            let res = await getCardByUser(this.userInfo.userId)
            if(res.code == 200){
                this.cardList = res.data || [];
                this.loading = false
            } else {
                this.$snackbar('获取银行卡数据失败')
            }
        },

        // 前往路由
        async goRouter(data, id){
            this.$router.push({
                path: data,
                query: { card_id: id }
            })
        },
    },


}

</script>