<template>
    <v-card ref="card" class="mb-2 d-flex justify-space-between" @touchstart="touchStart" @touchend="touchEnd($event)" style="max-width: 100%; overflow: hidden;" :class="calClass()">
        <div style="min-width: 110%;" class="pa-4">
            <div :class="(is_completed || is_cancel)?' text-decoration-line-through':''">{{ content }}</div>
        </div>
        <div style="min-width: 100px; min-height: 100%;" :class="leftSlide?'list':'list-remove'" class="rounded d-flex text-center body-2 white--text">
            <div class="success d-flex align-center justify-center" @click.capture="completeEvent()" style="min-width: 55px;"> 完成 </div>
            <div class="warning d-flex align-center justify-center" @click.capture="giveUpEvent()" style="min-width: 55px;"> 终止 </div>
            <div class="rounded-r error d-flex align-center justify-center" @click.capture="deleteEvent()" style="min-width: 55px;"> 删除 </div>
        </div>
    </v-card>
</template>

<script>

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
        }

    },

    data(){
        return {
            leftSlide: false
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

        giveUpEvent(){
            this.$emit('giveUp')
        },

        completeEvent(){
            this.$emit('complete')
        },

        deleteEvent(){
            this.$emit('delete')
        },
    },

}

</script>


<style scoped>

.list {
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    transform: translate3d(-200px,0,0);
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
