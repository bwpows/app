<template>
    <v-card ref="card" class="mb-2 d-flex justify-space-between" @touchstart.capture="touchStart" @touchmove="touchEnd($event)" style="max-width: 100%; overflow: hidden;">
        <div style="min-width: 110%;" class="pa-4">
            <div>{{ content }}</div>
        </div>
        <div style="min-width: 100px; min-height: 100%;" :class="leftSlide?'list':'list-remove'" class="rounded d-flex text-center body-2 white--text">
            <div class="error d-flex align-center justify-center" @click="giveUpEvent()" style="min-width: 55px;"> 放弃 </div>
            <div class="rounded-r primary d-flex align-center justify-center" @click="completeEvent()" style="min-width: 55px;"> 完成 </div>
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
        }
    },

    data(){
        return {
            leftSlide: false
        }
    },

    mounted() {
        let _this = this
        // document.addEventListener('click', function(e){
        //     console.log(e.target)
        //     _this.leftSlide = false
        // })
        // document.addEventListener('touchstart', function(e){
        //     _this.leftSlide = false
        // })
    },

    methods: {
        touchStart (e) {
            // 记录初始位置
            this.startX = e.touches[0].clientX
        },
        // 滑动结束
        touchEnd (e) {
            // 记录结束位置
            this.endX = e.changedTouches[0].clientX
            // 左滑
            if (this.startX - this.endX > 30) {
                this.leftSlide = true;
            }
        },

        giveUpEvent(){
            this.$emit('giveUp')
        },

        completeEvent(){
            console.log(888)
            this.$emit('complete')
        },
    },

}

</script>


<style scoped>

.list {
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    transform: translate3d(-144px,0,0);
}

.list-remove{
    -webkit-transition: all 0.4s;
    transition: all 0.4s;
    transform: translate3d(0,0,0);
}

</style>
