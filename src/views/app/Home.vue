<template>
    <div class="mb-12">
        <work-list-loading v-if="loading" />
        <div class="grey--text mb-2">今日任务</div>
        <template v-for="task in taskList">
            <v-card class="pa-4 mb-2" v-if="task.taskDateType == 1" :key="task._id">
                <div>
                    {{ task.content }}
                </div>
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2">明日任务</div>
        <template v-for="task in taskList">
            <v-card class="pa-4 mb-2" v-if="task.taskDateType == 2" :key="task._id">
                <div>
                    {{ task.content }}
                </div>
            </v-card>
        </template>

        <div class="grey--text mt-6 mb-2">本周任务</div>
        <v-card class="pa-4">
            <div class="font-weight-bold">
                本周任务
            </div>
        </v-card>

        <div class="grey--text mt-6 mb-2">当月任务</div>
        <v-card class="pa-4">
            <div class="font-weight-bold">
                当月任务
            </div>
        </v-card>

        <div class="grey--text mt-6 mb-2">今年任务</div>
        <v-card class="pa-4">
            <div class="font-weight-bold">
                今年任务
            </div>
        </v-card>
    </div>
</template>
<script>

import { getTaskByUserId } from '../../api/Task.js'

export default {
    data(){
        return{
            taskList: [],
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            loading: true
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        async fetch(){
            let res = await getTaskByUserId(this.userId)
            console.log(res)
            if(res.code == 200){
                this.taskList = res.data
            }
            this.loading = false
        }
    }
}
</script>
