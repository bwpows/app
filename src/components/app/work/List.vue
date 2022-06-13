
<template>
    <v-card class="mb-6 rounded-lg animate__animated animate__fadeIn">
        <div v-if="item.url.length == 0"></div>
        <v-carousel delimiter-icon="mdi-minus" hide-delimiter-background height="240" class="rounded-b-0"
            style="overflow: hidden" v-else-if="item.url.length > 1">
            <v-carousel-item v-for="(pictrue, i) in item.url" :key="i" :src="baseURL + pictrue" :show-arrows="false"
                class="rounded-b-0" reverse-transition="fade-transition" transition="fade-transition"></v-carousel-item>
        </v-carousel>
        <v-img v-else :src="baseURL + item.url[0]" style="width: 100%" height="200" class="rounded-b-0" cover></v-img>
        <div style="position: relative" class="rounded-b-0" v-if="deleteBtn">
            <v-btn color="error" class="mt-4 mr-3" x-small outlined style="position: absolute; z-index: 2; right: 0px"
                @click.stop="openDelDialog()">删除</v-btn>
        </div>
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
export default {
    name: "WorksssList",

    data() {
        return {
            lovedSvg, loveSvg, baseURL, viewSvg,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            delDialog: {}
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
            console.log(this.item)
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
            let loveInfo = {};
            for (let i = 0; i < this.item.likes.length; i++) {
                if (this.item.likes[i].user_id == this.userId) {
                    loveInfo = this.item.likes[i];
                }
            }

            if(loveInfo && !loveInfo.is_cancel){
                await cancelPraise(this.item._id)
            }else{
                await praise({ user_id: this.userId, work_id: this.item._id })
            }
            this.$emit("refresh");
        }
    },
};
</script>
