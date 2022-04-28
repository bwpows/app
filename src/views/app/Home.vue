<template>
    <div class="mb-12" @click="leftSlide = false">

        <v-img src="../../assets/common/bg.png" height="190px" width="100%" cover class="rounded-lg pa-5 mb-5">
            <div class="d-flex justify-space-between align-center" style="font-weight: 300; font-size: 20px;">
                <div>存储金额</div>
                <div style="font-weight:300; font-size: 14px;" class="d-flex">
                    <div class="mr-6">充值</div>
                    <div>消费</div>
                </div>
            </div>
            <div class="mt-6" style="letter-spacing: 2px; font-weight: 400; font-size: 26px;">
                <div>¥ 5344274.67</div>
            </div>
            <div class="mt-8 grey--text text--lighten-1" style="letter-spacing: 3px; font-size: 18px; font-weight: 400;">2342 3848 9023 8239</div>
        </v-img>

        <v-card class="pa-4 my-5 grey--text animate__animated animate__fadeIn" v-if="financeTasks.length === 0">
            <div>想实现财富自由吧，了解自己的收入来源和支出，实现财富自由的第一步。</div>
            <div class="text-center my-3">
                <v-btn color="primary darken-1">添加 Bwpow Cash</v-btn>
            </div>
        </v-card>
        <v-card class="pa-4 my-5 grey--text animate__animated animate__fadeIn" v-if="taskList.length === 0">
            <div>工作很忙吧，但是要提醒一下，别把一些重要的日子和事情给遗忘了哦！</div>
            <div class="text-center mt-5 mb-3">
                <v-btn color="primary darken-1" @click="$router.push('/task/add')">添加任务</v-btn>
            </div>
        </v-card>

        <work-list-loading v-if="loading" />

        <div class="grey--text mb-2" v-if="todayTasks.length != 0">今日任务</div>
        <template v-for="task in todayTasks">
            <right-slide-card :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="fetch()" />
        </template>


        <div class="grey--text mt-6 mb-2" v-if="tomorrowTasks.length != 0">明日任务</div>
        <template v-for="task in tomorrowTasks">
            <right-slide-card :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="fetch()" />
        </template>

        <div class="grey--text mt-6 mb-2" v-if="weekTasks.length != 0">本周任务</div>
        <template v-for="task in weekTasks">
            <right-slide-card :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="fetch()" />
        </template>

        <div class="grey--text mt-6 mb-2" v-if="monthTasks.length != 0">本月任务</div>
        <template v-for="task in monthTasks">
            <right-slide-card :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="fetch()" />
        </template>

        <div class="grey--text mt-6 mb-2" v-if="yearTasks.length != 0">今年任务</div>
        <template v-for="task in yearTasks">
            <right-slide-card :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="fetch()" />
        </template>

    </div>
</template>
<script>

import { cancelTask, completeTask, deleteTask, getTaskByUserId } from '../../api/Task.js'
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

            leftSlide: false,
            rightSlide: false,

            key: 0
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        calCurrentTime, formatTime,

        // 获取数据
        async fetch(){
            let res = await getTaskByUserId(this.userId)
            this.todayTasks = []
            this.tomorrowTasks = []
            this.weekTasks = []
            this.monthTasks = []
            this.yearTasks = []
            this.financeTasks = []
            if(res.code == 200){
                res.data = res.data || []
                this.taskList = res.data
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
        },

        // 完成任务
        async complete(id){
            await completeTask({ _id: id, user_id: this.userId })
            this.fetch()
        },

        // 取消任务
        async giveUp(id){
            await cancelTask({ _id: id, user_id: this.userId })
            this.fetch()
        },

        // 删除任务
        async deleteTask(id){
            await deleteTask({ _id: id, user_id: this.userId })
            this.fetch()
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
