<template>
    <v-card ref="card" class="mb-2 d-flex justify-space-between animate__animated animate__fadeIn" @touchstart="touchStart" @touchend="touchEnd($event)" style="max-width: 100%; overflow: hidden;" :class="calClass()">
        <div style="min-width: 110%;" class="pa-4">
            <div :class="(is_completed || is_cancel)?' text-decoration-line-through grey--text':''">{{ content }}</div>
        </div>
        <div style="min-height: 100%;" :class="leftSlide?'list':'list-remove'" class="rounded d-flex text-center body-2 white--text">
            <div class="success d-flex align-center justify-center" @click.capture="completeEvent()" style="min-width: 55px;" v-if="!is_completed"> 完成 </div>
            <div class="success d-flex align-center justify-center" @click.capture="recoveryEvent()" style="min-width: 55px;" v-else> 恢复 </div>
            <div class="warning d-flex align-center justify-center" @click.capture="giveUpEvent()" style="min-width: 55px;"> 终止 </div>
            <div class="rounded-r error d-flex align-center justify-center" @click.capture="deleteEvent()" style="min-width: 55px;"> 删除 </div>
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
        }
    },

    mounted() {
        let _this = this
        document.addEventListener('click', function(e){
            _this.leftSlide = false
        })
        document.addEventListener('touchmove', function(e){
            _this.leftSlide = false
        })
    },

    methods: {

        calClass(){
            if(this.is_cancel){
                return 'border-left-grey'
            }else if(this.is_completed){
                return 'border-left-success'
            }else{
                return 'border-left-primary'
            }
        },

        touchStart (e) {
            // 记录初始位置
            this.startX = e.touches[0].clientX
        },


        // 滑动结束
        touchEnd (e) {
            // 记录结束位置
            this.endX = e.changedTouches[0].clientX
            // 左滑
            if (this.startX - this.endX > 45) {
                this.leftSlide = true;
            }
        },

        // giveUpEvent(){
        //     this.$emit('giveUp')
        // },

        // completeEvent(){
        //     this.$emit('complete')
        // },

        // deleteEvent(){
        //     this.$emit('delete')
        // },


        // 完成任务
        async completeEvent(){
            await completeTask({ _id: this._id, user_id: this.userId })
            this.$emit('refresh')
        },

        // 取消任务
        async giveUpEvent(){
            await cancelTask({ _id: this._id, user_id: this.userId })
            this.$emit('refresh')
        },

        // 删除任务
        async deleteEvent(){
            await deleteTask({ _id: this._id, user_id: this.userId })
            this.$emit('refresh')
        },

        // 恢复任务
        async recoveryEvent(){
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
    transform: translate3d(-204px,0,0);
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
