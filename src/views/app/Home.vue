<template>
    <div class="mb-12">
        <work-list-loading v-if="loading" />
        <div class="grey--text mb-2" v-if="todayTasks.length != 0">今日任务</div>
        <template v-for="task in todayTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2">明日任务</div>
        <template v-for="task in tomorrowTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2">本周任务</div>
        <template v-for="task in weekTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2">本月任务</div>
        <template v-for="task in monthTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2">今年任务</div>
        <template v-for="task in yearTasks">
            <v-card class="pa-4 mb-2" :key="task._id">
                {{ task.content }}
            </v-card>
        </template>
    </div>
</template>
<script>

import { getTaskByUserId } from '../../api/Task.js'

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
            yearTasks: []
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        async fetch(){
            let res = await getTaskByUserId(this.userId)
            this.todayTasks = []
            this.tomorrowTasks = []
            this.weekTasks = []
            this.monthTasks = []
            this.yearTasks = []
            if(res.code == 200){
                for (let i = 0; i < res.data.length; i++) {
                    console.log(res.data[i].taskDateType)
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
                }
                // this.taskList = res.data
            }
            this.loading = false
        }
    }
}
</script>
