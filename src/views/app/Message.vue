<template>
<div>
    <like-loading v-for="item in 5" v-if="loading" :key="item" />

    <v-card class="pa-6 rounded-lg" v-if="!loading && workNotice.length==0">
        暂时没有通知
    </v-card>

    <v-card class="px-4 py-3 rounded-lg mb-5 d-flex align-center" v-for="notice in workNotice" :key="notice.id">
        <div class="mr-4">
            <v-img v-if="notice.type == 1" :src="xihuanSvg" width="42" height="42" contain></v-img>
            <v-img v-if="notice.type == 2" :src="pingLunSvg" width="42" height="42" contain></v-img>
        </div>
        <div class="body-2">
            <div>
                <span v-if="notice.sender[0]">{{ notice.sender[0].username || '-' }}</span>
                <span v-else>匿名用户</span>
                {{ notice.type == 1?'喜欢了':'评论了' }}您的作品
            </div>
            <div class="my-1">
                {{ notice.message || notice.work[0].title || notice.work[0].description }}
            </div>
            <div class="grey--text caption">
                {{ calCurrentTime(notice.created_time) }}
            </div>
        </div>
    </v-card>
</div>
</template>

<script>
// import socket from "../../plugins/socket"
// import

import { getAlert, modityRead } from '../../api/Message'
import { getUnreadAlert } from '../../api/Message'
import xihuanSvg from './../../assets/icon/xihuan.svg'
import pingLunSvg from './../../assets/icon/pinglun.svg'
import { formatTime, calCurrentTime } from '@/util/formatTime';

export default {

    data(){
        return {
            xihuanSvg, formatTime, calCurrentTime, pingLunSvg,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            offsetTop: 0,
            workNotice: [],
            loading: true
        }
    },

    mounted() {
        this.fetch()
    },

    methods: {
        async fetch(){
            this.loading = true;
            await modityRead({user_id: this.userId, type: 1});
            await modityRead({user_id: this.userId, type: 2});
            let res = await getAlert(this.userId);
            this.loading = false;
            if(res.code == 200){
                this.workNotice = res.data || [];
            }
            this.unReadNum()
        },

        // 获取未读数量
        async unReadNum(){
            getUnreadAlert(this.userId).then(res => {
                if(res.code == 200){
                    this.$store.commit('app/updateUnreadNum', res.data.num)
                }
            })
        }
    },

}

</script>