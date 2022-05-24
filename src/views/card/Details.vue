<template>
    <div>
        <!-- Search condition -->
        <div class="d-flex justify-space-between">
            <v-select color v-model="selectedType" :items="typeList" solo flat class="rounded-md" style="max-width: 100px;" @change="fetch()"></v-select>
            <v-text-field style="max-width: 100px;" class="rounded-md text-center" flat readonly v-model="selectedMonth" solo @click="openMonthDialog()"></v-text-field>
        </div>

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
import { getCardDetails } from '../../api/Card'
import { formatTime, getStartAndEndDate } from '../../util/formatTime'

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
            loading: true
        }
    },

    mounted() {
        this.fetch()
    },

    methods: {
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
            this.loading = true;
            this.detailsData = [];
            this.selectedDate = getStartAndEndDate(this.selectedMonth)
            let obj = { user_id: this.userInfo.userId }
            obj = Object.assign(obj, this.selectedDate)
            if(this.selectedType) obj.type = (this.selectedType).toString()
            let res = await getCardDetails(obj)
            this.loading = false;
            if(res.code == 200){
                this.detailsData = res.data || []
            }
        },


    },

}

</script>