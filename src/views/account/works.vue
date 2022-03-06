<template>
    <div>
        <blog-list
            v-for="item in worksData"
            :key="item._id"
            :title="item.title"
            :description="item.description"
            :createdTime="calCurrentTime(item.created_time)"
            :url="item.url.length!==0?(item.url): null"
            :love="item.likes"
            :deleteBtn="true"
            @click.native="goBlogInfo(item)"
            @praise="praise($event ,item._id)"
            @delWork="openDelDialog(item)"
        ></blog-list>

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
import { delWorkById, getBlogByUserId } from "../../api/Works"
import { formatTime, calCurrentTime } from "../../util/formatTime"

export default {
    data() {
        return {
            baseURL,
            worksData: [],
            delBtnLoading: false,
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            delDialog: {}
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

        // 去博客详情页面
        goBlogInfo(item){
            this.$router.push({ path: `/blog/info/${item._id}` })
        },

        // 点赞
        async praise(data,id){
            if(data){
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userId, work_id: id })
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