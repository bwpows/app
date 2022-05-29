<template>
    <div v-scroll.self="onScroll" class="overflow-y-auto hidden_scrollbar" style="height: calc( 100vh - 60px );">

        <bank-card />

        <!-- Loading animation  -->
        <template v-for="item in 5">
            <v-card tile class="rounded-lg pa-4 mb-5 animate__animated animate__fadeIn" v-if="loading">
                <v-skeleton-loader type="heading"></v-skeleton-loader>
                <v-skeleton-loader type="text" class="mt-6"></v-skeleton-loader>
            </v-card>
        </template>

        <!-- Search condition -->
        <div class="d-flex justify-space-between mb-5 mt-6" v-if="!loading">
            <v-select color v-model="selectedType" :items="typeList" solo flat class="rounded-md" hide-details style="max-width: 100px;" @change="fetch()"></v-select>
            <v-text-field style="max-width: 100px;" class="rounded-md text-center" hide-details flat readonly v-model="selectedMonth" solo @click="openMonthDialog()"></v-text-field>
        </div>

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


        <!-- loading -->
        <request-loading v-if="!noData" />

        <v-card class="pa-6 rounded-lg mb-10 grey--text" v-else="noData">
            没有更多数据啦
        </v-card>

        <!-- Month picker dialog -->
        <base-dialog :value="selectMonthDialog.value" title="选择日期" @close="selectMonthDialog = {}">
            <v-date-picker
                width="100%"
                class="rounded-lg"
                v-model="selectedMonth"
                type="month"
                color="primary"
                @change="changeMonth()"
            ></v-date-picker>
        </base-dialog>
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
        this.fetch()
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
        async fetch(){
            if(this.requestLoading || this.noData) return;
            this.loading = true;
            this.detailsData = [];
            this.selectedDate = getStartAndEndDate(this.selectedMonth)
            let obj = { user_id: this.userInfo.userId }
            obj = Object.assign(obj, this.selectedDate)
            if(this.selectedType) obj.type = (this.selectedType).toString()
            obj.current_page = this.currentPage
            obj.page_count = this.pageCount
            let res = await getCardDetails(obj)
            this.requestLoading = false;
            this.loading = false;
            if(res.code == 200){
                this.currentPage++;
                let arr = res.data || []
                if(arr.length < this.pageCount){
                    this.noData = true;
                }
                this.detailsData.push(...arr)
            }
        },


        // rolling monitoring
        onScroll(e) {
            this.scrolOffsetTop = e.target.scrollTop + e.target.offsetHeight
            if(e.target.scrollHeight - this.scrolOffsetTop < 500){
                // Trigger interface
                if(this.requestLoading || this.noData) return;
                this.requestLoading = true;
                this.fetch()
            }
        },


    },

}

</script>
<style>

.hidden_scrollbar::-webkit-scrollbar {
    display:none
}
</style>