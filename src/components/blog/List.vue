<template>
    <v-card class="mb-8" :key="cardKey">
        <div v-if="url.length == 0"></div>
        <v-carousel
            v-else-if="url.length > 1"
            delimiter-icon="mdi-minus"
            hide-delimiter-background
            height="240"
            class="rounded-b-0"
            style="overflow: hidden;"
        >
            <v-carousel-item
                v-for="(item, i) in url"
                :key="i"
                :src="baseURL + item"
                :show-arrows="false"
                reverse-transition="fade-transition"
                transition="fade-transition"
            ></v-carousel-item>
        </v-carousel>
        <v-img
            v-else
            :src="baseURL + url[0]"
            style="width: 100%"
            height="200"
            class="rounded-b-0"
            cover
        ></v-img>
        <div style="position: relative" class="rounded-b-0" v-if="deleteBtn">
            <v-btn
                color="error"
                class="mt-4 mr-3"
                x-small
                outlined
                style="position: absolute; z-index: 2; right: 0px"
                @click.stop="delWork()"
            >删除</v-btn>
        </div>
        <div class="pa-5">
            <h4>{{ title }}</h4>
            <div class="body-2 my-3">{{ description }}</div>
            <div class="d-flex justify-space-between align-center body-2 grey--text">
                <div class>{{ calCurrentTime(createdTime) }}</div>
                <div class="d-flex">
                    <v-img
                        @click.stop="likeEvent()"
                        width="20"
                        height="20"
                        :src="isLove ? lovedSvg : loveSvg"
                    ></v-img>
                </div>
            </div>
        </div>
    </v-card>
</template>

<script>
import lovedSvg from "@/assets/icon/loved.svg";
import loveSvg from "@/assets/icon/love.svg";
import { baseURL } from "@/api/Server";
import { calCurrentTime } from "../../util/formatTime";
export default {
    name: "BlogList",

    data() {
        return {
            lovedSvg, loveSvg, baseURL,
            loveInfo: null,
            userId: JSON.parse(localStorage.getItem("userInfo")).userId,
            isLoved: false,
            cardKey: new Date().getTime()
        };
    },

    props: {
        love: {
            type: Array,
            required: true,
        },

        url: {
            type: Array,
        },

        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        createdTime: {
            type: String,
        },

        deleteBtn: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        isLove() {
            let flag = false;
            for (let i = 0; i < this.love.length; i++) {
                if (this.love[i].user_id == this.userId && !this.love[i].is_cancel) {
                    flag = true;
                    return true;
                }
            }
            return flag;
        },
    },

    methods: {
        calCurrentTime,

        // 点赞
        likeEvent() {
            for (let i = 0; i < this.love.length; i++) {
                if (this.love[i].user_id == this.userId) {
                    this.loveInfo = this.love[i];
                }
            }
            console.log(this.loveInfo)
            this.$emit("praise", this.loveInfo);
        },

        // 删除
        delWork() {
            this.$emit("delWork");
        },
    },
};
</script>
