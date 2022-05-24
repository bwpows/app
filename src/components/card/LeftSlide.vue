<template>
    <v-card
        class="mb-2 d-flex justify-space-between animate__animated animate__fadeIn"
        style="max-width: 100%; overflow: hidden;"
        :class="calClass()"
        :id="this._id"
        v-click-outside="close"
        v-touch="{
            left: () => leftSwipe()
        }"
    >
        <div style="min-width: 100%;" class="pa-4" >
            <div :class="(is_completed || is_cancel)?' text-decoration-line-through grey--text':''">{{ content }}</div>
        </div>
        <div style="min-height: 100%;" :class="leftSlide?'list':'list-remove'" class="rounded d-flex text-center body-2 white--text">
            <div class="success d-flex align-center justify-center" @click.stop="completeEvent()" style="min-width: 55px;" v-if="!is_completed"> 完成 </div>
            <div class="success d-flex align-center justify-center" @click.stop="recoveryEvent()" style="min-width: 55px;" v-else> 恢复 </div>
            <div class="warning d-flex align-center justify-center" @click.stop="giveUpEvent()" style="min-width: 55px;"> 终止 </div>
            <div class="rounded-r error d-flex align-center justify-center" @click="deleteEvent()" style="min-width: 55px;"> 删除 </div>
        </div>
    </v-card>
</template>

<script>
import { cancelTask, completeTask, deleteTask, recoveryTask } from '../../api/Task'

export default {
    name: "RightSlideCard",

    props: {
        content: {
            type: String,
            required: true
        },

        is_completed: {
            type: Boolean,
        },

        is_cancel: {
            type: Boolean
        },

        _id: {
            type: String,
            required: true
        }

    },

    data(){
        return {
            leftSlide: false,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            removeTrajectory: [],
            removeDomId: ''
        }
    },

    mounted() {
        this.addEventListener()
    },

    beforeDestroy() {
        this.removeEventListener()
    },

    methods: {

        // 移除监听事件
        removeEventListener(){
            window.removeEventListener('touchmove', this.touchMove)
        },

        // 添加监听事件
        addEventListener(){
            window.addEventListener('touchmove', this.touchMove)
        },


        // 计算右滑动
        calClass(){
            if(this.is_cancel){
                return 'border-left-grey'
            }else if(this.is_completed){
                return 'border-left-success'
            }else{
                return 'border-left-primary'
            }
        },


        // 左滑动
        leftSwipe(){
            this.leftSlide = true
        },

        close(){
            this.leftSlide = false
        },

        getDomId(dom){
            if(dom.id){
                this.removeDomId = dom.id
                return ;
            }else{
                this.getDomId(dom.parentElement)
            }
        },


        // 滑动结束
        touchMove (e) {
            // console.log('移动', e.touches[0].target)
            this.getDomId(e.touches[0].target)
            // console.log(this.removeDomId)
            if(this.removeDomId != this._id){
                this.leftSlide = false
            }

        },



        // 完成任务
        async completeEvent(){
            this.leftSlide = true
            this.close()
            await completeTask({ _id: this._id, user_id: this.userId })
            this.$emit('refresh')
        },

        // 取消任务
        async giveUpEvent(){
            this.leftSlide = true
            this.close()
            await cancelTask({ _id: this._id, user_id: this.userId })
            this.$emit('refresh')
        },

        // 删除任务
        async deleteEvent(){
            this.leftSlide = true
            this.close()
            await deleteTask({ _id: this._id, user_id: this.userId })
            this.$emit('refresh')
        },

        // 恢复任务
        async recoveryEvent(){
            this.leftSlide = true
            this.close()
            await recoveryTask({ _id: this._id, user_id: this.userId })
            this.$emit('refresh')
        },


    },

}

</script>


<style scoped>

.list {
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    transform: translate3d(-165px,0,0);
}

.list-remove{
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    transform: translate3d(0,0,0);
}

.border-left-primary{
    border-left: 8px solid #ec752e;
}

.border-left-success{
    border-left: 8px solid #4CAF50;
}

.border-left-grey{
    border-left: 8px solid #9E9E9E;
}

</style>
