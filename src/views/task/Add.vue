<template>
<div>

    <div class="grey--text mb-3">
        请描述您的任务
    </div>
    <v-card class="py-4 mb-5 rounded-lg">
        <textarea type="text" cols="20" rows="2" v-model="addTask.content" placeholder="请输入任务内容" style="border: none; width: 100%;" class="body-1 px-4" :class="$vuetify.theme.dark?'white--text':''"></textarea>
    </v-card>

    <div class="grey--text mb-3">开始日期</div>
    <div class="d-flex justify-space-between flex-wrap">
        <v-card v-for="item in startDateList" :key="item.value" style="min-width: 45%;" class="py-6 body-1 text-center mb-5 rounded-lg" :class="addTask.start_date == item.value?'primary--text base_border':'transparent_border'" @click="addTask.start_date = item.value">
            {{ item.text }}
        </v-card>
    </div>

    <div class="grey--text mb-3">截止日期</div>
    <div class="d-flex justify-space-between flex-wrap">
        <v-card v-for="item in endDateList" :key="item.value" style="min-width: 45%;" class="py-6 body-1 text-center mb-5 rounded-lg" :class="addTask.end_date == item.value?'primary--text base_border':'transparent_border'" @click="addTask.end_date = item.value" :disabled="item.value < addTask.start_date">
            {{ item.text }}
        </v-card>
    </div>

    <v-card class="my-8 pa-1 rounded-lg">
        <v-btn color="primary" width="100%" class="body-1" @click="submit()" text :loading="submitLoading">发布任务</v-btn>
    </v-card>

</div>

</template>
<script>
import { addTask } from '../../api/Task.js'
import { formatTime } from '../../util/formatTime.js'
export default {
    data() {
        return {
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            addTask: {
                content: '',
                end_date: 1,
                start_date: 1,
                cycleDate: 1,
                user_id: JSON.parse(localStorage.getItem('userInfo')).userId
            },
            startDateList: [
                { text: '现在开始', value: 1 },
                { text: '明天开始', value: 2 },
                { text: '下周一开始', value: 3 },
                { text: '下月初开始', value: 4 },
            ],
            endDateList: [
                { text: '今日完成', value: 1 },
                { text: '明日完成', value: 2 },
                { text: '本周完成', value: 3 },
                { text: '下周完成', value: 4 },
                { text: '本月完成', value: 5 },
                { text: '今年完成', value: 6 },
            ],
            taskParams: {},
            submitLoading: false
        }
    },

    methods: {

        formatStartDate(){
            if(this.taskParams.start_date == 1){
                this.taskParams.start_date = formatTime(new Date(), 'YYYY-MM-dd')
            }else if(this.taskParams.start_date == 2){
                let needDate = new Date().setDate(new Date().getDate()+1)
                this.taskParams.start_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }else if(this.taskParams.start_date == 3){
                let needDate = new Date().setDate( new Date().getDate() + (8 - new Date().getDay()))
                this.taskParams.start_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }else if(this.taskParams.start_date == 4){
                let needDate = new Date(new Date().setMonth(new Date().getMonth()+1)).setDate(1)
                this.taskParams.start_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }
        },

        formatEndDate(){
            if(this.taskParams.end_date == 1){
                this.taskParams.end_date = formatTime(new Date(), 'YYYY-MM-dd')
            }else if(this.taskParams.end_date == 2){
                let needDate = new Date().setDate(new Date().getDate()+1)
                this.taskParams.end_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }else if(this.taskParams.end_date == 3){
                let needDate = new Date().setDate( new Date().getDate() + (7 - new Date().getDay()))
                this.taskParams.end_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }else if(this.taskParams.end_date == 4){
                let needDate = new Date().setDate( new Date().getDate() + 14 - new Date().getDay())
                this.taskParams.end_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }else if(this.taskParams.end_date == 5){
                let needDate = new Date().setDate(new Date(new Date().getFullYear(), new Date(new Date().getMonth()+1), 0).getDate())
                this.taskParams.end_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }else if(this.taskParams.end_date == 6){
                let needDate = new Date(new Date().getFullYear(), 11, 31)
                this.taskParams.end_date = formatTime(new Date(needDate), 'YYYY-MM-dd')
            }
        },

        // 添加任务
        async submit(){
            if(!this.addTask.content){ return this.$snackbar('请输入任务内容') }
            this.taskParams = JSON.parse(JSON.stringify(this.addTask))
            this.formatStartDate()
            this.formatEndDate()
            this.submitLoading = true
            let res = await addTask(this.taskParams)
            this.submitLoading = false
            if(res.code == 200){
                this.$router.go(-1)
            }
        },


        selectTime(){
            var styles = {};
            styles.title = "请选择日期："; // 显示标题
            styles.date = new Date(), styles.date.setFullYear(2018,8,8);// 默认显示的日期
            styles.minDate = new Date(), styles.minDate.setFullYear(2010,0,1);// 设置最小可选日期为“2010-01-01”
            styles.maxDate = new Date(), styles.maxDate.setFullYear(2020,11,31);// 设置最大可选日期为“2020-12-31”
            plus.nativeUI.pickDate(function(e){
                var d=e.date;
                console.log( "选择的日期："+d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate() );
            }, function(e){
                console.log( "未选择日期："+e.message );
            }, styles);
        },
    },
}

</script>

<style>
textarea:focus{
	outline: medium;
}
input:focus{
	outline: medium;
}
input{
    font-size: 1.05rem;
}
</style>