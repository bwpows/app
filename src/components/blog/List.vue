<template>
  <v-card class="mb-8">
    <v-img v-if="url" :src="baseURL+url[0]" style="width: 100%;" height="200" class="rounded-b-0" cover></v-img>
    <div style="position: relative;" class="rounded-b-0" v-if="deleteBtn">
        <v-btn color="error" class="mt-4 mr-3" x-small outlined style="position: absolute; z-index: 2; right: 0px;" @click.stop="delWork()">删除</v-btn>
    </div>
    <div class="pa-5">
        <h4> {{ title }} </h4>
        <div class="body-2 my-3"> {{ description }} </div>
        <div class="d-flex justify-space-between align-center body-2 grey--text">
            <div class=""> {{ createdTime }} </div>
            <div class="d-flex">
                <v-img @click.stop="likeEvent()" width="20" height="20" :src="isLove?lovedSvg:loveSvg"></v-img>
            </div>
        </div>
    </div>
  </v-card>
</template>

<script>
import lovedSvg from '@/assets/icon/loved.svg'
import loveSvg from '@/assets/icon/love.svg'
import { baseURL } from '@/api/Server';
export default {
    name: 'BlogList',

    data(){
        return {
            lovedSvg, loveSvg, baseURL,
            loveInfo: null,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
        }
    },

    props: {

        love: {
            type: Array,
            required: true
        },

        url: {
            type: Array,
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String,
            required: true
        },

        createdTime: {
            type: String,
        },

        deleteBtn: {
            type: Boolean,
            default: false
        },
    },

    computed: {
        isLove(){
            let flag = false
            for (let i = 0; i < this.love.length; i++) {
                if(this.love[i].user_id == this.userId && !this.love[i].is_cancel){
                    this.loveInfo = this.love[i]
                    flag = true
                    return true;
                }
            }
            return flag
        }
    },

    methods: {
        // 点赞
        likeEvent(){
            this.$emit('praise', this.loveInfo)
        },

        // 删除
        delWork(){
            this.$emit('delWork')
        }

    },

}
</script>