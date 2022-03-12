<template>
    <div>
        <blog-list
            v-for="item in blogList"
            :key="item._id"
            :title="item.title"
            :description="item.description"
            :createdTime="item.created_time"
            :url="item.url.length!==0?(item.url): null"
            :love="item.likes"
            @praise="praise($event ,item._id)"
            @click.native="openBottomSheet(item)"
        ></blog-list>

        <bottom-dialog
            :value="bottomSheetData.value"
            :data="bottomSheetData.data"
            @close="bottomSheetData = {}"
        />

        <!-- <v-bottom-sheet inset v-model="bottomSheetData.value">
            <v-sheet class="rounded-t-lg px-6" height="75vh">
                <div v-if="bottomSheetData.value">
                    <div class="d-flex justify-center py-4" @touchstart="touchStartEvent" @touchmove="touchMoveEvent">
                        <div style="width: 70px; height: 6px;" class="rounded-xl grey"></div>
                    </div>
                    <div v-if="bottomSheetData.data.url.length == 0"></div>
                    <v-carousel
                        v-else-if="bottomSheetData.data.url.length > 1"
                        delimiter-icon="mdi-minus"
                        hide-delimiter-background
                        height="240"
                        class="rounded-lg"
                        style="overflow: hidden;"
                    >
                        <v-carousel-item
                            v-for="(item, i) in bottomSheetData.data.url"
                            :key="i"
                            :src="baseURL + item"
                            :show-arrows="false"
                            reverse-transition="fade-transition"
                            transition="fade-transition"
                        ></v-carousel-item>
                    </v-carousel>
                    <v-img
                        v-else
                        :src="baseURL + bottomSheetData.data.url[0]"
                        style="width: 100%"
                        height="200"
                        class="rounded-lg"
                    ></v-img>
                    <div class="my-6 mb-4 text-h4 font-weight-black">{{ bottomSheetData.data.title }}</div>
                    <div> {{ bottomSheetData.data.description }} </div>
                </div>
            </v-sheet>
        </v-bottom-sheet> -->
    </div>
</template>
<script>
import DefaultFooter from '@/layouts/default/Footer'
import DefaultHeader from '@/layouts/default/Header'
import { getBlog } from '@/api/Home';
import { formatTime, calCurrentTime } from '@/util/formatTime'
import { baseURL } from '@/api/Server';
import { cancelPraise, praise } from '@/api/Like';


export default {
    data(){
        return{
            blogList: [],
            baseURL,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            bottomSheetData: {},

            // 手指触摸事件
            moveEndX: '',
            moveEndY: ''
        }
    },

    async mounted(){
        await this.fetch()
    },

    components: {
        DefaultFooter,
        DefaultHeader
    },

    methods: {
        formatTime,
        async fetch(){
            let res = await getBlog()
            if(res.code == 200){
                console.log('获取数据成功')
                this.blogList = res.data
            }
        },

        goBlogInfo(item){
            this.$router.push({ path: `/work/${item._id}` })
        },

        async praise(data,id){
            if(data && !data.is_cancel){
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userId, work_id: id })
            }
            this.fetch()
        },

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
                this.bottomSheetData = {}
            }
        },

        openBottomSheet(data){
            this.bottomSheetData = {
                value: true,
                data
            }
        }
    }
}
</script>