<template>
<div>

    <v-card class="px-4 py-3 mb-5">
        <span class="grey--text">选择任务类型</span>
        <v-radio-group v-model="addTask.type" row>
            <v-radio label="普通任务" :value="1"></v-radio>
            <v-spacer></v-spacer>
            <v-radio label="存钱任务" :value="2"></v-radio>
        </v-radio-group>
    </v-card>

    <v-card class="px-4 py-3 mb-5">
        <textarea type="text" cols="20" rows="3" v-model="addTask.content" placeholder="请输入任务内容" style="border: none; width: 100%;" class="body-1" :class="$vuetify.theme.dark?'white--text':''" v-if="addTask.type == 1"></textarea>
        <input type="tel" v-model="targetNum" placeholder="请输入你需要存的钱" :class="$vuetify.theme.dark?'white--text':''" v-else />
    </v-card>
    <v-card class="px-4 py-3 mb-5" v-if="addTask.type == 1">
        <span class="grey--text">任务周期</span>
        <v-radio-group v-model="addTask.cycle" row>
            <v-radio label="一次性任务" :value=1></v-radio>
            <v-spacer></v-spacer>
            <v-radio label="周期任务" :value=2></v-radio>
        </v-radio-group>
    </v-card>
    <v-card class="pa-3 mb-5" v-if="addTask.cycle == 1">
        <span class="grey--text">任务截止日期</span>
        <v-radio-group v-model="addTask.endDate">
            <v-radio label="今日完成" :value="1"></v-radio>
            <v-radio label="明日完成" :value="2" class="my-2"></v-radio>
            <v-radio label="本周完成" :value="3" class="my-2"></v-radio>
            <v-radio label="下周完成" :value="4" class="my-2"></v-radio>
            <v-radio label="本月完成" :value="5" class="mt-2"></v-radio>
        </v-radio-group>
    </v-card>
    <v-card class="pa-3" v-else-if="addTask.type == 1">
        <span class="grey--text">请选择循环日期</span>
        <v-radio-group v-model="addTask.cycleDate">
            <v-radio label="日循环" :value="1"></v-radio>
            <v-radio label="周循环" :value="2" class="my-2"></v-radio>
            <v-radio label="半个月循环" :value="3" class="my-2"></v-radio>
            <v-radio label="月循环" :value="4" class="my-2"></v-radio>
            <v-radio label="季循环" :value="5" class="mt-2"></v-radio>
        </v-radio-group>
    </v-card>

    <v-card class="mt-8 pa-1">
        <v-btn color="primary" width="100%" class="body-1" text @click="submit()">发布任务</v-btn>
    </v-card>
</div>
    
</template>
<script>

export default {
    data() {
        return {
            addTask: {
                cycle: 1,
                type: 1,
                endDate: 1,
                cycleDate: 1
            },
            targetNum: ''
            // selectTime: ''
        }
    },

    methods: {
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
        }
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