<template>
    <v-card
        class="mx-auto text-center rounded-lg animate__animated animate__fadeIn"
        color="primary"
        dark
    >
        <v-card-text>
            <div class="text-h4 mb-4">
                2022年收入统计图
            </div>
            <v-sheet color="rgba(0, 0, 0, .12)" class="rounded-lg mb-1  animate__animated animate__fadeIn">
                <v-sparkline
                    :labels="chartXData"
                    :value="chartYData"
                    color="rgba(255, 255, 255, .7)"
                    stroke-linecap="round"
                    smooth
                    padding="16"
                    height="100"
                >
                    <template v-slot:label="item">
                        {{ formatTime(item.value, 'MM') }}
                    </template>
                </v-sparkline>
            </v-sheet>
        </v-card-text>
    </v-card>
</template>

<script>

import { statisticsByMonth } from '../../api/Card'

import { formatTime, getMonthListByYear } from '../../util/formatTime'
export default {
    name: 'CardChart',

    data(){
        return {
            formatTime,
            userInfo: JSON.parse(localStorage.getItem('userInfo')),

            chartXData: getMonthListByYear(new Date().getFullYear()),
            chartYData: [],
        }
    },

    mounted() {
        this.statisticsMonth()
    },


    methods: {

        // 统计数据
        async statisticsMonth(){
            let obj = { user_id: this.userInfo.userId, year: new Date().getFullYear(), type: "1" }
            let res = await statisticsByMonth(obj)
            this.chartYData = []
            if(res.code == 200){
                for (let j = 0; j < this.chartXData.length; j++) {
                    let flag = false
                    for (let i = 0; i < res.data.length; i++) {
                        if(res.data[i]._id == this.chartXData[j]){
                            flag = true;
                            this.chartYData.push(res.data[i].totalSum)
                        }
                    }
                    if(!flag) this.chartYData.push(0)
                }
            }
        }
    },
}

</script>