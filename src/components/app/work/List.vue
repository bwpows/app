
<template>
    <v-card class="mb-6 rounded-lg animate__animated animate__fadeIn">

        <!-- picture display -->
        <div v-if="item.url.length == 0"></div>
        <v-carousel delimiter-icon="mdi-minus" hide-delimiter-background height="240" class="rounded-b-0"
            style="overflow: hidden" v-else-if="item.url.length > 1">
            <v-carousel-item v-for="(pictrue, i) in item.url" :key="i" :src="baseURL + pictrue" :show-arrows="false"
                class="rounded-b-0" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
        </v-carousel>
        <v-img v-else :src="baseURL + item.url[0]" style="width: 100%" height="200" class="rounded-b-0" cover></v-img>

        <!-- delete button display -->
        <div style="position: relative" class="rounded-b-0" v-if="item.user_id == userId">
            <v-btn color="error" class="mt-4 mr-3" x-small outlined style="position: absolute; z-index: 2; right: 0px"
                @click.stop="openDelDialog()">删除</v-btn>
        </div>

        <!-- details work content display -->
        <div class="pa-5">
            <h4>{{ item.title }}</h4>
            <div class="body-2 my-3">{{ item.description }}</div>
            <div class="d-flex justify-space-between align-center body-2 grey--text">
                <div>{{ calCurrentTime(item.created_time) }}</div>
                <div class="d-flex">
                    <v-img width="20" height="20" :src="viewSvg"></v-img>
                    <div class="mx-1 mr-4">{{ item.views.length }}</div>
                    <v-img @click.stop="praise()" width="20" height="20" :src="isLove ? lovedSvg : loveSvg"></v-img>
                    <div class="ml-1">{{ lovedNum }}</div>
                </div>
            </div>
        </div>

        <!-- delete dialog -->
        <delete-dialog
            :value="delDialog.value"
            :title="delDialog.title"
            :content="delDialog.content"
            :loading="delBtnLoading"
            @close="delDialog.value = false"
            @delEvent="delWork()"
        />
    </v-card>
</template>
<script>
import lovedSvg from "@/assets/icon/loved.svg";
import loveSvg from "@/assets/icon/love.svg";
import viewSvg from "@/assets/icon/view.svg";
import { baseURL } from '@/api/Server';
import { calCurrentTime } from "@/util/formatTime";
import { praise, cancelPraise } from '@/api/Like';
import { delWorkById } from "../../../api/Works";
export default {
    name: "WorksssList",

    data() {
        return {
            lovedSvg, loveSvg, baseURL, viewSvg,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            delDialog: {},
            delBtnLoading: false
        };
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    computed: {
        isLove() {
            let flag = false;
            for (let i = 0; i < this.item.likes.length; i++) {
                if (this.item.likes[i].user_id == this.userId && !this.item.likes[i].is_cancel) {
                    flag = true;
                    break;
                }
            }
            return flag;
        },

        lovedNum(){
            let num = 0
            for (let i = 0; i < this.item.likes.length; i++) {
                if(this.item.likes[i].is_cancel == false){
                    num++
                }
            }
            return num
        }
    },

    methods: {
        calCurrentTime,
        baseURL,


        // Like work
        async praise(){
            let loveInfo = null;
            for (let i = 0; i < this.item.likes.length; i++) {
                if (this.item.likes[i].user_id == this.userId) {
                    loveInfo = this.item.likes[i];
                }
            }

            if(loveInfo && !loveInfo.is_cancel){
                await cancelPraise(loveInfo._id)
            }else{
                await praise({ user_id: this.userId, work_id: this.item._id })
            }
            this.$emit("refresh");
        },

        // openDeleteDialog
        openDelDialog(){
            this.delDialog = {
                value: true,
                title: `删除 ${this.item.title}`,
                content: '此作品将不在你的作品中展示，是否继续删除？'
            }
        },

        // delete work
        async delWork(){
            this.delBtnLoading = true
            let res = await delWorkById(this.item._id)
            if(res.code == 200){
                this.$snackbar("删除成功")
            }
            this.delBtnLoading = false
            this.delDialog = {}
            this.$emit('refresh')
        },

    },
};
</script>
