<template>
    <div>

        <v-card class="pa-6 grey--text text--darken-1 body-2" v-if="worksData.length == 0">
            您还没有创见作品哦！
            <div class="mt-2"> 点击下方按钮去分享一个吧！</div>
            <v-btn color="primary" depressed class="mt-4" small @click="$router.replace('/publish')">点击分享您的喜悦！</v-btn>
        </v-card>


        <blog-list
            v-for="item in worksData"
            :key="item._id"
            :title="item.title"
            :description="item.description"
            :createdTime="item.created_time"
            :url="item.url.length!==0?(item.url): null"
            :love="item.likes"
            :views="item.views"
            :deleteBtn="true"
            @praise="praise($event ,item._id)"
            @click.native="openBottomSheet(item)"
            @delWork="openDelDialog(item)"
        ></blog-list>

        <bottom-dialog
            :value="bottomSheetData.value"
            :data="bottomSheetData.data"
            @close="bottomSheetData = {}"
        />

        <delete-dialog
            :value="delDialog.value"
            :title="delDialog.title"
            :content="delDialog.content"
            :loading="delBtnLoading"
            @close="delDialog.value = false"
            @delEvent="delWork()"
        />
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
            bottomSheetData: {}
        }
    },

    created() {
        this.fetch()
    },

    methods: {
        formatTime, calCurrentTime,

        // 获取数据
        async fetch(){
            let res = await getBlogByUserId(this.userInfo.userId)
            this.worksData = res.data
        },

        async openBottomSheet(data){
            this.bottomSheetData = {
                value: true,
                data
            }
            await viewWork({user_id: this.userInfo.userId, work_id: data._id})
            this.fetch()
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

        // 弹出删除框
        openDelDialog(data){
            this.delDialog = {
                value: true,
                title: `删除 ${data.title}`,
                content: '此作品将不在你的作品中展示，是否继续删除？',
                data
            }
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
        }

    },

}
</script>