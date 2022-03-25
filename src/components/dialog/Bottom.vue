<template>

<v-bottom-sheet inset v-model="value" @click:outside="$emit('close')" @touchmove.prevent>
    <v-sheet class="rounded-t-lg px-6 pb-6" height="75vh" style="overflow:scroll;">
        <!-- 横条 -->
        <div class="d-flex justify-center py-4" style=" position: relative;" @touchstart="touchStartEvent" @touchmove="touchMoveEvent">
            <div style="width: 70px; height: 4px; position: fixed; z-index: 10;" class="rounded-xl grey darken-1"></div>
        </div>

        <div v-if="loading">
            <work-info-loading />
        </div>

        <div v-else>

            <!-- 头像信息 -->
            <div class="d-flex align-center mb-4">
                <div class="rounded">
                    <v-img :src="workInfo.users?workInfo.users.pictrue?(baseURL + workInfo.users.pictrue): userSvg: userSvg" class="rounded" width="36" cover height="36"></v-img>
                </div>
                <div class="mx-4 text-h4" v-if="workInfo.users">
                    {{ workInfo.users.username || workInfo.users.phone || '匿名用户' }}
                </div>
                <div v-else class="mx-4">
                    匿名用户
                </div>
            </div>

            <!-- 图片 -->
            <div v-if="workInfo.url.length == 0"></div>
            <v-carousel
                v-else-if="workInfo.url.length > 1"
                delimiter-icon="mdi-minus"
                hide-delimiter-background
                height="240"
                class="rounded-lg"
                style="overflow: hidden;"
            >
                <v-carousel-item
                    v-for="(item, i) in workInfo.url"
                    :key="i"
                    :src="baseURL + item"
                    :show-arrows="false"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                ></v-carousel-item>
            </v-carousel>
            <v-img
                v-else
                :src="baseURL + workInfo.url[0]"
                style="width: 100%"
                height="200"
                class="rounded-lg"
                @click="previewImage(baseURL + workInfo.url[0])"
            ></v-img>

            <!-- {{workInfo}} -->

            <!-- 内容 -->
            <div class="my-6 mb-4 text-h4 font-weight-black">{{ workInfo.title }}</div>
            <div> {{ workInfo.description }} </div>
            <div class="my-4 d-flex justify-space-between body-2 grey--text">
                <div class>{{ calCurrentTime(workInfo.created_time) }}</div>
            </div>

            <!-- 评论 -->
            <div class="d-flex mt-6">
                <v-text-field type="text" placeholder="分享您的看法" v-model="comment.content" outlined dense class="mr-4"></v-text-field>
                <v-btn color="primary" outlined :disabled="!comment.content" :loading="submitBtnLoading" @click="submitComment()">发表</v-btn>
            </div>

            <div v-for="comment in commentList" :key="comment._id" class="d-flex align-center my-4">
                <div>
                    <v-img height="42" width="42" class="rounded" :src="comment.user.pictrue? (baseURL+comment.user.pictrue) : userSvg"></v-img>
                </div>
                <div class="ml-4 body-2">
                    <div class="grey--text">{{comment.user.username || comment.user.phone || '匿名用户'}}</div>
                    <div class="">{{comment.content}}</div>
                </div>
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
import { getBlogInfo } from '../../api/Works';

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
            submitBtnLoading: false,
            commentList: [],
            workInfo: {},
            loading: true
        }
    },


    watch: {
        value(){
            if(this.value){
                this.loading = true
                this.getComment()
                this.getWorkById()
            }
        }
    },

    methods: {
        calCurrentTime,

        previewImage(url){
            plus.nativeUI.previewImage([
                url
            ]);
        },

        // 获取单个单个用户
        async getWorkById(){
            this.loading = true
            let data = await getBlogInfo(this.data._id)
            this.loading = false
            this.workInfo = data.data
            console.log(data)
        },

        // 获取评论
        async getComment(){
            let data = await getCommentByWorkId(this.data._id)
            this.commentList = data.data
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

            if (Math.abs(Y) > Math.abs(X)+50 && Y > 0) {
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
            this.comment.content = ''
            this.getComment()
            this.submitBtnLoading = false;
            if(data.code == 200){
                this.$snackbar('发表成功')
            }else{
                this.$snackbar('发表失败')
            }

        },

        // 删除作品


    },

}

</script>