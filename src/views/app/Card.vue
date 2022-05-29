<template>
    <div class="mb-12">

        <bank-card v-if="loading" />
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

        <!-- Loading animation  -->
        <template v-for="item in 5">
            <v-card tile class="rounded-lg pa-4 mb-5 animate__animated animate__fadeIn" v-if="loading">
                <v-skeleton-loader type="heading"></v-skeleton-loader>
                <v-skeleton-loader type="text" class="mt-6"></v-skeleton-loader>
            </v-card>
        </template>

        <!-- Displayed when there is no consumption data -->
        <v-card class="pa-5 mb-5 rounded-lg grey--text" v-if="!loading && detailsData.length == 0">
            暂时没有消费数据
        </v-card>

        <!-- Consumption details -->
        <v-card v-for="item in detailsData" :key="item._id" class="pa-5 mb-5 rounded-lg d-flex justify-space-between align-center animate__animated animate__fadeIn">
            <div>
                <div>{{ item.typeInfo[0].name }}</div>
                <div class="grey--text body-2 mt-1">{{ formatTime(item.created_time, 'MM-dd HH:mm') }}</div>
            </div>
            <div :class="item.typeInfo[0].type == 1?'primary--text':''" class="text-h4 font-weight-regular d-flex">
                {{ item.typeInfo[0].type == 1?'+':'-' }} {{ (item.amount) }}
            </div>
        </v-card>

        <v-card class="pa-4 my-5 grey--text animate__animated animate__fadeIn rounded-lg" v-if="!loading && cardList.length === 0">
            <div>想实现财富自由吧，了解自己的收入来源和支出，实现财富自由的第一步。</div>
            <div class="text-center my-3">
                <v-btn color="primary" @click="$router.push('/card/add')" depressed>添加 Bwpow Cash</v-btn>
            </div>
        </v-card>

    </div>
</template>
<script>

import { getCardByUser, getCardDetails } from '../../api/Card'
import { calCurrentTime } from '../../util/formatTime.js'
import { formatTime, getStartAndEndDate } from '@/util/formatTime';

export default {
    data(){
        return{
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            detailsData: [],
            loading: true,
            selectedMonth: formatTime(new Date(), 'YYYY-MM'),

            // 任务列表
            taskList: [],
            todayTasks: [],
            tomorrowTasks: [],
            weekTasks: [],
            monthTasks: [],
            yearTasks: [],

            isBalanceHide: (localStorage.getItem('balanceHide') == 1)
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        calCurrentTime, formatTime,

        calBankuNum(value){
            if(!value) return ''
            value = value.toString().replace(/\s/g, '').replace(/(.{4})/g, "$1 ")
            return value
        },

        changeBalanceHide(data){
            this.isBalanceHide = data
            localStorage.setItem('balanceHide', data)
        },

        // 获取数据
        async fetch(){
            await this.getCard();
            await this.getCardData()
            this.loading = false
        },

        // 获取用户卡数据
        async getCard(){
            let res = await getCardByUser(this.userId)
            if(res.code == 200){
                this.cardList = res.data || [];
            } else {
                this.$snackbar('获取银行卡数据失败')
            }
        },


        /**
         * @description Get data by condition
         */
        async getCardData(){
            this.loading = true;
            this.detailsData = [];
            this.selectedDate = getStartAndEndDate(this.selectedMonth)
            let obj = { user_id: this.userId }
            obj = Object.assign(obj, this.selectedDate)
            if(this.selectedType) obj.type = (this.selectedType).toString()
            let res = await getCardDetails(obj)
            this.loading = false;
            if(res.code == 200){
                this.detailsData = res.data || []
            }
        },

        // 前往路由
        async goRouter(data, id){
            this.$router.push({
                path: data,
                query: { card_id: id }
            })
        },



    }
}
</script>

<style scoped>

.list {
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    transform: translate3d(-90px,0,0);
}

.list-remove{
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    transform: translate3d(0,0,0);
}



</style>
