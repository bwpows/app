<template>
    <div class="mb-12">

        <work-list-loading v-if="loading" />

        <div class="grey--text mb-2" v-if="financeTasks.length != 0">存钱任务</div>
        <template v-for="task in financeTasks">
            <v-card class="pa-4 mb-2" :key="task._id"  @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                <div>目标金额：{{ task.target_number }}</div>
                <div class="mt-2">完成金额：{{ task.completed_number || 0 }}</div>
                <div class="mt-2">
                    截止日期：{{ formatTime(task.end_date, 'YYYY-MM-dd') }}
                </div>
            </v-card>
        </template>

        <div class="grey--text mb-2" v-if="todayTasks.length != 0">今日任务</div>
        <template v-for="task in todayTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2" v-if="tomorrowTasks.length != 0">明日任务</div>
        <template v-for="task in tomorrowTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2" v-if="weekTasks.length != 0">本周任务</div>
        <template v-for="task in weekTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2" v-if="monthTasks.length != 0">本月任务</div>
        <template v-for="task in monthTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2" v-if="yearTasks.length != 0">今年任务</div>
        <template v-for="task in yearTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>
    </div>
</template>
<script>

import { getTaskByUserId } from '../../api/Task.js'
import { calCurrentTime } from '../../util/formatTime.js'
import { formatTime } from '@/util/formatTime';

export default {
    data(){
        return{
            taskList: [],
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            loading: true,
            todayTasks: [],
            tomorrowTasks: [],
            weekTasks: [],
            monthTasks: [],
            yearTasks: [],
            financeTasks: [],

            startX: '',
            endX: ''
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        calCurrentTime, formatTime,


        touchStart (e) {
            // console.log(e);
            // 记录初始位置
            this.startX = e.touches[0].clientX
        },
        // 滑动结束
        touchEnd (e) {
            // 记录结束位置
            this.endX = e.changedTouches[0].clientX
            // 左滑
            if (this.startX - this.endX > 30) {
                // this.restSlide(index)
                // parentElement.dataset.type = 1;
                console.log('左滑动')
            }
            // 右滑
            if (this.startX - this.endX < -30) {
                // this.restSlide(index);
                // parentElement.dataset.type = 0;
                console.log('右滑动')
            }
            this.startX = 0
            this.endX = 0
        },


        // 获取数据
        async fetch(){
            let res = await getTaskByUserId(this.userId)
            this.todayTasks = []
            this.tomorrowTasks = []
            this.weekTasks = []
            this.monthTasks = []
            this.yearTasks = []
            if(res.code == 200){
                for (let i = 0; i < res.data.length; i++) {
                    if(res.data[i].type != 3){
                        if(res.data[i].taskDateType == 1){
                            this.todayTasks.push(res.data[i])
                        }else if(res.data[i].taskDateType == 2){
                            this.tomorrowTasks.push(res.data[i])
                        }else if(res.data[i].taskDateType == 3){
                            this.weekTasks.push(res.data[i])
                        }else if(res.data[i].taskDateType == 4){
                            this.monthTasks.push(res.data[i])
                        }else if(res.data[i].taskDateType == 5){
                            this.yearTasks.push(res.data[i])
                        }
                    }else if((res.data[i].type == 3)){
                        this.financeTasks.push(res.data[i])
                    }
                }
            }
            this.loading = false
        }
    }
}
</script>
