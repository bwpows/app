<template>

<v-bottom-sheet inset v-model="value" @click:outside="$emit('close')">
    <v-sheet class="rounded-t-lg px-6" height="75vh">
        <div v-if="value">
            <div class="d-flex justify-center py-4" @touchstart="touchStartEvent" @touchmove="touchMoveEvent">
                <div style="width: 70px; height: 6px;" class="rounded-xl grey"></div>
            </div>
            <div v-if="data.url.length == 0"></div>
            <v-carousel
                v-else-if="data.url.length > 1"
                delimiter-icon="mdi-minus"
                hide-delimiter-background
                height="240"
                class="rounded-lg"
                style="overflow: hidden;"
            >
                <v-carousel-item
                    v-for="(item, i) in data.url"
                    :key="i"
                    :src="baseURL + item"
                    :show-arrows="false"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                ></v-carousel-item>
            </v-carousel>
            <v-img
                v-else
                :src="baseURL + data.url[0]"
                style="width: 100%"
                height="200"
                class="rounded-lg"
            ></v-img>
            <div class="my-6 mb-4 text-h4 font-weight-black">{{ data.title }}</div>
            <div> {{ data.description }} </div>
        </div>
    </v-sheet>
</v-bottom-sheet>

</template>

<script>

import { baseURL } from '@/api/Server';
export default {

    name: 'BottomDialog',

    props: {
        value: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object
        }
    },

    data() {
        return {
            baseURL,
        }
    },

    methods: {
        
        // 开始移动事件
        touchStartEvent(event){
            event.preventDefault()
            this.moveEndX = event.changedTouches[0].pageX
            this.moveEndY = event.changedTouches[0].pageY
        },

        // 移动手指事件
        touchMoveEvent(event){
            event.preventDefault() //阻止默认事件（长按的时候出现复制）
            var moveEndX = event.changedTouches[0].pageX
            var moveEndY = event.changedTouches[0].pageY

            var X = moveEndX - this.moveEndX
            var Y = moveEndY - this.moveEndY

            if (Math.abs(Y) > Math.abs(X)+20 && Y > 0) {
                this.$emit('close')
            }
        },
    },

}

</script>