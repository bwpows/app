<template>
    <div class="mb-12" @click="leftSlide = false">

        <work-list-loading v-if="loading" />

        <div class="grey--text mb-2" v-if="financeTasks.length != 0">存钱任务</div>
        <template v-for="task in financeTasks">
            <v-card class="mb-2 d-flex justify-space-between" :key="task._id" @touchstart.capture="touchStart" @touchend="touchEnd($event, task)" style="max-width: 100%; overflow: hidden;">
                <div style="min-width: 110%;" class="pa-4">
                    <div>目标金额：{{ task.target_number }}</div>
                    <div class="mt-2">完成金额：{{ task.completed_number || 0 }}</div>
                    <div class="mt-2">
                        截止日期：{{ formatTime(task.end_date, 'YYYY-MM-dd') }}
                    </div>
                </div>
                <div style="min-width: 60px; min-height: 100%;" :class="leftSlide?'list':'list-remove'" class="d-flex flex-column align-center rounded text-center justify-space-around">
                    <div class="white--text error d-flex align-center justify-center" style="height: 100%; width: 100%;" @click="openCancelDialog()"> 取消 </div>
                    <div class="white--text primary d-flex align-center justify-center" style="height: 100%; width: 100%;" @click="openEditDialog()"> 编辑 </div>
                </div>
            </v-card>
        </template>

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



        <!-- <h1 class="animate__animated animate__fadeInUp">An animated element</h1> -->
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

            startX: '',
            endX: '',
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

        touchStart (e) {
            // 记录初始位置
            this.startX = e.touches[0].clientX
        },
        // 滑动结束
        touchEnd (e, task) {
            // 记录结束位置
            this.endX = e.changedTouches[0].clientX
            // 左滑
            if (this.startX - this.endX > 30) {
                this.leftSlide = true;
            }
            // 右滑
            if (this.startX - this.endX < -30) {
                this.leftSlide = false;
            }
        },


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
            console.log(id)
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
