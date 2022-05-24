<template>
<div>
    <!-- <v-card></v-card> -->
    <like-loading v-for="item in 5" v-if="loading" :key="item" />
    <v-card class="px-4 py-3 rounded-lg mb-5 d-flex align-center" v-for="notice in workNotice" :key="notice.id">
        <div class="mr-4">
            <v-img :src="xihuanSvg" width="42" height="42" contain></v-img>
        </div>
        <div class="body-2">
            <div>
                {{ notice.sender[0].username }}{{ notice.type == 1?'喜欢了':'' }}您的作品
            </div>
            <div class="my-1">
                {{ notice.work[0].title || notice.work[0].description }}
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
import { formatTime, calCurrentTime } from '@/util/formatTime';

export default {

    data(){
        return {
            xihuanSvg, formatTime, calCurrentTime,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            offsetTop: 0,
            list: [1,2,4],
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
            let res = await getAlert(this.userId);
            this.loading = false;
            if(res.code == 200){
                this.workNotice = res.data
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