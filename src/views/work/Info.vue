<template>
    <v-card class="pb-8 rounded-lg">
        <div v-if="loading">
            <work-info-loading />
        </div>

        <div v-else class="mx-6">

            <!-- 头像信息 -->
            <div class="d-flex align-center mb-4 pt-4">
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

            <div class="my-6">
                <!-- 图片 -->
                <div v-if="workInfo.url.length == 0"></div>

                <v-carousel
                    v-model="selectedImg"
                    v-else-if="workInfo.url.length > 1"
                    delimiter-icon="mdi-minus"
                    hide-delimiter-background
                    height="240"
                    class="rounded-lg"
                    style="overflow: hidden;"
                    @click.native="viewPictrue()"
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
                <v-img v-else
                    :src="baseURL + workInfo.url[0]"
                    style="width: 100%"
                    height="200"
                    class="rounded-lg"
                    @click="previewImage([baseURL + workInfo.url[0]])"
                ></v-img>
            </div>

            <!-- {{workInfo}} -->

            <!-- 内容 -->
            <div class="mt-6"> {{ workInfo.description }} </div>
            <div class="my-4 d-flex justify-space-between body-2 grey--text">
                <div class>{{ calCurrentTime(workInfo.created_time) }}</div>
            </div>

            <!-- 评论 -->
            <div class="d-flex mt-6">
                <v-text-field type="text" placeholder="分享您的看法" v-model="comment.content" outlined dense class="mr-4" @focus="height='100%'" @blur="height='75vh'"></v-text-field>
                <v-btn color="primary" outlined :disabled="!comment.content" :loading="submitBtnLoading" @click="submitComment()">发表</v-btn>
            </div>

            <div v-for="comment in commentList" :key="comment._id" class="d-flex align-center mt-6  ">
                <div>
                    <v-img height="42" width="42" class="rounded" :src="comment.user.pictrue? (baseURL+comment.user.pictrue) : userSvg"></v-img>
                </div>
                <div class="ml-4 body-2" style="width: 100%">
                    <div class="grey--text d-flex justify-space-between">
                        <div> {{comment.user.username || comment.user.phone || '匿名用户'}} </div>
                        <div> {{calCurrentTime(comment.create_time)}} </div>
                    </div>
                    <div>{{comment.content}}</div>
                </div>
            </div>

        </div>
    </v-card>
</template>
<script>
import { getBlogInfo } from '@/api/Works';
import { formatTime } from '@/util/formatTime'
import { baseURL } from '@/api/Server';
import { calCurrentTime } from '../../util/formatTime';
import userSvg from '@/assets/user.svg';
import { addComment, getCommentByWorkId } from '../../api/Comment';
import { viewWork } from '../../api/View';

export default {

    name: 'BottomDialog',

    data() {
        return {
            baseURL,
            userSvg,
            comment: {},
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            submitBtnLoading: false,
            commentList: [],
            workInfo: {},
            loading: true,
            siti: {},
            selectedImg: 0
        }
    },

    created() {
        this.fetch()
        this.getComment()
        this.siti = setTimeout(() => {
            viewWork({user_id: this.userInfo.userId, work_id: this.$route.params.id})
        }, 3000);
    },

    destroyed() {
        clearInterval(this.siti)
    },

    methods: {
        formatTime,

        async fetch(){
            let res = await getBlogInfo(this.$route.params.id)
            this.loading = false
            if(res.code == 200){
                this.workInfo = res.data
            }
        },

        calCurrentTime,

        viewPictrue(){
            let arr = []
            for (let i = 0; i < this.workInfo.url.length; i++) {
                arr.push(baseURL + this.workInfo.url[i])
            }
            this.previewImage(arr)
        },

        previewImage(url){
            console.log(url)
            plus.nativeUI.previewImage(url,{
                current: this.selectedImg
            });
        },


        // 获取评论
        async getComment(){
            let data = await getCommentByWorkId(this.$route.params.id)
            this.commentList = data.data
        },

        // 发表评论
        async submitComment(){
            if(!this.comment.content) return this.$snackbar("请先写评论哦")
            this.comment.user_id = this.userInfo.userId
            this.comment.work_id = this.$route.params.id
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