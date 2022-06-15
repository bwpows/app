<template>
    <div class="mb-12">

        <work-list-loading v-if="loading" />

        <no-task v-if="!loading && taskList.length === 0" />

        <div class="mb-6" v-if="todayTasks.length != 0">
            <div class="grey--text mb-2">今日任务</div>
            <right-slide-card v-for="task in todayTasks" :key="task._id" :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" @refresh="getTask()" />
        </div>

        <div class="mb-6" v-if="tomorrowTasks.length != 0">
            <div class="grey--text mb-2">明日任务</div>
            <right-slide-card v-for="task in tomorrowTasks" :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="getTask()" />
        </div>

        <div class="mb-6" v-if="weekTasks.length != 0">
            <div class="grey--text mb-2">本周任务</div>
            <right-slide-card v-for="task in weekTasks" :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="getTask()" />
        </div>

        <div class="mb-6" v-if="monthTasks.length != 0">
            <div class="grey--text mb-2">本月任务</div>
            <right-slide-card v-for="task in monthTasks" :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="getTask()" />
        </div>

        <div class="mb-6" v-if="yearTasks.length != 0">
            <div class="grey--text mb-2">今年任务</div>
            <right-slide-card v-for="task in yearTasks" :content="task.content" :is_cancel="task.is_cancel" :is_completed="task.is_completed" :_id="task._id" :key="task._id" @refresh="getTask()" />
        </div>

    </div>
</template>
<script>

import { getTaskByUserId } from '../../api/Task.js'
import { calCurrentTime } from '../../util/formatTime.js'
import { formatTime } from '@/util/formatTime';

export default {
    data(){
        return{
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            loading: true,

            // 任务列表
            taskList: [],
            todayTasks: [],
            tomorrowTasks: [],
            weekTasks: [],
            monthTasks: [],
            yearTasks: [],

        }
    },

    async mounted(){
        await this.getTask()
    },

    methods: {
        calCurrentTime, formatTime,

        // 获取任务数据
        async getTask(){
            let res = await getTaskByUserId(this.userId)
            this.loading = false
            if(res.code == 200){
                this.taskList = res.data || []
                this.taskDataProcessing()
            }else{
                this.$snackbar('获取任务数据失败')
            }
        },

        // 获取数据
        async taskDataProcessing(){
            this.todayTasks = [];
            this.tomorrowTasks = [];
            this.weekTasks = [];
            this.monthTasks = [];
            this.yearTasks = [];
            for (let i = 0; i < this.taskList.length; i++) {
                if(this.taskList[i].taskDateType == 1){
                    this.todayTasks.push(this.taskList[i])
                }else if(this.taskList[i].taskDateType == 2){
                    this.tomorrowTasks.push(this.taskList[i])
                }else if(this.taskList[i].taskDateType == 3){
                    this.weekTasks.push(this.taskList[i])
                }else if(this.taskList[i].taskDateType == 4){
                    this.monthTasks.push(this.taskList[i])
                }else if(this.taskList[i].taskDateType == 5){
                    this.yearTasks.push(this.taskList[i])
                }
            }
        }
    }
}
</script>

<style scoped>

/* .v-main__wrap{} */

</style>
