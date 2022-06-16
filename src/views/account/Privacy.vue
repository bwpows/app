<template>
    <div>

        <work-list-loading v-if="loading" class="animate__animated animate__fadeIn" />

        <v-card class="pa-6 grey--text text--darken-1 body-2 rounded-lg animate__animated animate__fadeIn" v-if="workData.length == 0">
            您还没有点赞的作品哦！看样子您的品味很高哦。
        </v-card>

        <worksss-list v-for="item in workData" :key="item._id" :item="item" @refresh="fetch" @click.native="goWorkInfo(item)" />

    </div>
</template>
<script>
import { cancelPraise, praise } from '../../api/Like'
import { calCurrentTime } from '../../util/formatTime'
import { getPrivacyWork } from '../../api/Works'
export default {
    data(){
        return {
            workData: [],
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            bottomSheetData: {},
            loading: true,

            offsetTop: 0,
            preRouteName: ''
        }
    },

    created() {
        this.fetch()
    },

    beforeRouteEnter(to, from, next){
        next(vm => {
            vm.preRouteName = from.name
        })
    },

    async activated(){
        if(this.preRouteName == 'WorkInfo'){
            document.getElementById('app').scrollTop = this.offsetTop || 0;
        }else{
            this.fetch()
        }
    },

    beforeRouteLeave (to, from, next) {
        this.offsetTop = document.getElementById('app').scrollTop || document.body.scrollTop || window.pageYOffset;
        next()
    },

    methods: {
        calCurrentTime,

        async fetch(){
            this.workData = []
            this.loading = true
            let res = await getPrivacyWork(this.userInfo.userId)
            this.loading = false
            this.workData = res.data
        },


        async praise(data,id){
            if(data && !data.is_cancel){
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userInfo.userId, work_id: id })
            }
            this.fetch()
        },

        // 前往详情页面
        goWorkInfo(data){
            this.$router.push({
                path: `/workinfo/${data._id }`
            })
        }

    },


}
</script>