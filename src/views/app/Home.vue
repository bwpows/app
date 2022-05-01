<template>
    <div class="mb-12">
        <v-img src="../../assets/common/bg.png" height="190px" width="100%" cover class="rounded-lg pa-5 mb-5" v-for="item in cardList" :key="item.key">
            <div class="d-flex justify-space-between align-center" style="font-weight: 300; font-size: 20px;">
                <div>{{ item.name }}</div>
                <div style="font-weight:300; font-size: 14px;" class="d-flex">
                    <div class="mr-6" @click="$router.push('/card/recharge')">充值</div>
                    <div @click="$router.push('/card/consumption')">消费</div>
                </div>
            </div>
            <div class="mt-6" style="letter-spacing: 2px; font-weight: 400; font-size: 26px;">
                <div>¥ {{ item.balance }}</div>
            </div>
            <div class="mt-8 grey--text text--lighten-1" style="letter-spacing: 3px; font-size: 18px; font-weight: 400;">
                {{ item.number }}
            </div>
        </v-img>

        <v-card class="pa-4 my-5 grey--text animate__animated animate__fadeIn" v-if="cardList.length === 0">
            <div>想实现财富自由吧，了解自己的收入来源和支出，实现财富自由的第一步。</div>
            <div class="text-center my-3">
                <v-btn color="primary darken-1" @click="$router.push('/card/add')">添加 Bwpow Cash</v-btn>
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
import { getCardByUser } from '../../api/Card'
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


            // 卡列表
            cardList: []

            // leftSlide: false,
            // rightSlide: false,

            // key: 0
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        calCurrentTime, formatTime,

        fetch(){
            this.getCard();
            this.getTask();
        },

        // 获取用户卡数据
        async getCard(){
            let res = await getCardByUser(this.userId)
            if(res.code == 200){
                this.cardList = res.data || []
            } else {
                this.$snackbar('获取银行卡数据失败')
            }
        },

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
            this.todayTasks = []
            this.tomorrowTasks = []
            this.weekTasks = []
            this.monthTasks = []
            this.yearTasks = []
            for (let i = 0; i < this.taskList.length; i++) {
                if(this.taskList[i].type != 3){
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
