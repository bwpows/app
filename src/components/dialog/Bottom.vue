<template>

<v-bottom-sheet inset v-model="value" @click:outside="$emit('close')">
    <v-sheet class="rounded-t-lg px-6" height="75vh">
        <div v-if="value">
            <!-- 横条 -->
            <div class="d-flex justify-center py-4" @touchstart="touchStartEvent" @touchmove="touchMoveEvent">
                <div style="width: 70px; height: 4px;" class="rounded-xl grey darken-1"></div>
            </div>

            <!-- 头像信息 -->
            <div class="d-flex align-center mb-4">
                <div>
                    <v-img :src="data.users.pictrue?(baseURL + data.users.pictrue): userSvg" class="rounded" width="36" cover height="36"></v-img>
                </div>
                <div class="mx-4 text-h4">
                    {{ data.users.username || data.users.phone || '匿名用户' }}
                </div>
            </div>

            <!-- 图片 -->
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

            <!-- 内容 -->
            <div class="my-6 mb-4 text-h4 font-weight-black">{{ data.title }}</div>
            <div> {{ data.description }} </div>
            <div class="my-4 d-flex justify-space-between body-2 grey--text">
                <div class>{{ calCurrentTime(data.created_time) }}</div>
            </div>

            <!-- 评论 -->
            <div class="d-flex mt-6">
                <v-text-field type="text" placeholder="分享您的看法" v-model="comment.content" outlined dense class="mr-4"></v-text-field>
                <v-btn color="primary" outlined :disabled="!comment.content" :loading="submitBtnLoading" @click="submitComment()">发表</v-btn>
            </div>

            <div v-for="comment in data.comments" :key="comment._id">
                {{comment.content}}
            </div>

        </div>
    </v-sheet>
</v-bottom-sheet>

</template>

<script>

import { baseURL } from '@/api/Server';
import { calCurrentTime } from '../../util/formatTime';
import userSvg from '@/assets/user.svg';
import { addComment, getCommentByWorkId } from '../../api/Comment';

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
            userSvg,
            comment: {},
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            submitBtnLoading: false
        }
    },


    watch: {
        value(){
            console.log(444)
            if(this.value){
                this.getComment()
            }
        }
    },

    methods: {
        calCurrentTime,

        // 获取评论
        async getComment(){
            let data = await getCommentByWorkId(this.data._id)
            console.log(data)
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
                this.$emit('close')
            }
        },

        // 发表评论
        async submitComment(){
            if(!this.comment.content) return this.$snackbar("请先写评论哦")
            this.comment.user_id = this.userInfo.userId
            this.comment.work_id = this.data._id
            this.comment.object_id = null
            this.submitBtnLoading = true;
            let data = await addComment(this.comment)
            this.submitBtnLoading = false;
            if(data.code == 200){
                this.$snackbar('发表成功')
            }else{
                this.$snackbar('发表失败')
            }

        },


    },

}

</script>