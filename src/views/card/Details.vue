<template>
    <div>

        <bank-card />

        <!-- Loading animation  -->
        <template v-for="item in 5">
            <v-card tile class="rounded-lg pa-4 mb-5 animate__animated animate__fadeIn" v-if="loading">
                <v-skeleton-loader type="heading"></v-skeleton-loader>
                <v-skeleton-loader type="text" class="mt-6"></v-skeleton-loader>
            </v-card>
        </template>

        <!-- Search condition -->
        <div class="d-flex justify-space-between mb-5 mt-6 animate__animated animate__fadeIn" v-if="!loading">
            <v-select color v-model="selectedType" :items="typeList" solo flat class="rounded-md" hide-details style="max-width: 100px;" @change="fetch()"></v-select>
            <v-text-field style="max-width: 100px;" class="rounded-md text-center" hide-details flat readonly v-model="selectedMonth" solo @click="openMonthDialog()"></v-text-field>
        </div>

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


        <!-- loading -->
        <request-loading v-if="!noData" />

        <v-card class="pa-5 rounded-lg grey--text  animate__animated animate__fadeIn" v-else="noData">
            没有更多数据啦
        </v-card>

        <!-- Month picker dialog -->
        <v-dialog v-model="selectMonthDialog.value" width="300" overlay-opacity="0.9">
            <v-date-picker
                width="100%"
                class="rounded-lg"
                v-model="selectedMonth"
                type="month"
                color="primary"
                @change="changeMonth()"
            ></v-date-picker>
        </v-dialog>
    </div>
</template>
<script>
import { getCardByUser, getCardDetails } from '../../api/Card'
import { formatTime, getStartAndEndDate } from '../../util/formatTime'
import { calCurrentTime } from '@/util/formatTime';

export default{
    data() {
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            detailsData: [],
            typeList: [
                { text: '全部', value: 0 },
                { text: '收入', value: 1 },
                { text: '支出', value: 2 },
            ],
            selectedType: 0,
            selectedMonth: formatTime(new Date(), 'YYYY-MM'),
            selectMonthDialog: {},



            selectedDate: {},
            loading: true,

            currentPage: 1,
            pageCount: 20,
            requestLoading: false,
            noData: false
        }
    },

    mounted() {
        this.addEventListener()
        this.fetch()
    },

    destroyed() {
        this.removeEventListener()
    },

    methods: {

        calCurrentTime,


        /**
         * @description Format date function
         */
        formatTime,

        /**
         * @description Select month succeeds and closes select month dialog
         */
        changeMonth(){
            this.selectMonthDialog = {}
            this.fetch()
        },

        /**
         * @description Open dialog for month picker
         */
        openMonthDialog(){
            this.selectMonthDialog = {
                value: true
            }
        },

        /**
         * @description Get data by condition
         */
        async fetch(type){
            // this.detailsData = [];
            this.selectedDate = getStartAndEndDate(this.selectedMonth)
            let obj = { user_id: this.userInfo.userId }
            obj = Object.assign(obj, this.selectedDate)
            if(this.selectedType) obj.type = (this.selectedType).toString()
            obj.current_page = this.currentPage
            obj.page_count = this.pageCount

            console.log(obj)
            let res = await getCardDetails(obj)
            this.requestLoading = false;
            this.loading = false;
            if(res.code == 200){
                let arr = res.data || []
                if(arr.length < this.pageCount){
                    this.noData = true;
                }
                if(type){
                    this.detailsData.push(...arr)
                }else{
                    this.detailsData = arr
                }
            }
        },

        // 移除监听事件
        removeEventListener(){
            window.removeEventListener('scroll', this.isBottom)
        },

        // 添加监听事件
        addEventListener(){
            window.addEventListener('scroll', this.isBottom)
        },

        async isBottom(){
            if(document.documentElement.offsetHeight - document.documentElement.clientHeight - document.documentElement.scrollTop < 500){
                // console.log('出发')
                // document.documentElement.scrollTop      滚动的高度
                // document.documentElement.clientHeight   页面的可视高度
                // document.documentElement.offsetHeight   页面的总高度
                if(this.requestLoading || this.noData) return;
                this.currentPage++;

                this.requestLoading = true;
                await this.fetch(1)
            }
        }



    },

}

</script>
<style>

.hidden_scrollbar::-webkit-scrollbar {
    display:none
}
</style>