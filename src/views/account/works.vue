<template>
    <div>

        <work-list-loading v-if="loading" />

        <v-card class="pa-6 grey--text text--darken-1 body-2 rounded-lg animate__animated animate__fadeIn" v-if="!loading && worksData.length == 0">
            您还没有创见作品哦！
            <div class="mt-2"> 点击下方按钮去分享一个吧！ </div>
            <v-btn color="primary" depressed class="mt-4" small @click="$router.replace('/publish')">点击分享您的喜悦！</v-btn>
        </v-card>



        <worksss-list v-for="item in worksData" :key="item._id" :item="item" @refresh="fetch" @click.native="goWorkInfo(item)" />


    </div>
</template>

<script>
import { cancelPraise, praise } from '../../api/Like'
import { baseURL } from "../../api/Server"
import { viewWork } from '../../api/View'
import { delWorkById, getBlogByUserId } from "../../api/Works"
import { formatTime, calCurrentTime } from "../../util/formatTime"

export default {
    data() {
        return {
            baseURL,
            worksData: [],
            delBtnLoading: false,
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            delDialog: {},
            bottomSheetData: {},
            loading: true,

            preRouteName: '',
            offsetTop: 0
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
        formatTime, calCurrentTime,

        // 获取数据
        async fetch(){
            let res = await getBlogByUserId(this.userInfo.userId)
            this.loading = false
            this.worksData = res.data
        },

        // 点赞
        async praise(data,id){
            if(data && !data.is_cancel){
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userInfo.userId, work_id: id })
            }
            this.fetch()
        },

        // 删除博客
        async delWork(){
            this.delBtnLoading = true
            let res = await delWorkById(this.delDialog.data._id)
            if(res.code == 200){
                this.$snackbar("删除成功")
            }
            this.delBtnLoading = false
            this.delDialog = {}
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