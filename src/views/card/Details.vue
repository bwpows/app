<template>
    <div>
        <div class="d-flex justify-space-between">
            <v-select color v-model="selectedType" :items="typeList" solo style="max-width: 120px;" @change="fetch()" class="rounded-lg"></v-select>
            <!-- <v-text-field style="max-width: 110px;" class="rounded-lg text-center" type="" readonly v-model="selectedMonth" solo @click="openMonthDialog()"></v-text-field> -->
        </div>

        <v-card v-for="item in detailsData" :key="item._id" class="pa-5 mb-5 rounded-lg d-flex justify-space-between align-center">
            <div>
                <div>{{ item.typeInfo[0].name }}</div>
                <div class="grey--text body-2 mt-1">{{ formatTime(item.created_time, 'MM-dd HH:mm') }}</div>
            </div>
            <div :class="item.typeInfo[0].type == 1?'primary--text':''" class="text-h4 font-weight-regular d-flex">
                {{ item.typeInfo[0].type == 1?'+':'-' }} {{ (item.amount) }}
            </div>
        </v-card>

        <base-dialog :value="selectMonthDialog.value" title="选择日期" @close="selectMonthDialog = {}">
            <v-date-picker
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

            selectedDate: {}
        }
    },

    mounted() {
        this.fetch()
    },

    methods: {
        formatTime,

        changeMonth(){
            this.selectMonthDialog = {}
            this.fetch()
        },

        openMonthDialog(){
            this.selectMonthDialog = {
                value: true
            }
        },

        async fetch(){
            this.selectedDate = getStartAndEndDate(this.selectedMonth)
            let obj = { user_id: this.userInfo.userId }
            obj = Object.assign(obj, this.selectedDate)
            if(this.selectedType) obj.type = (this.selectedType).toString()
            let res = await getCardDetails(obj)
            if(res.code == 200){
                this.detailsData = res.data || []
            }
        },


    },

}

</script>