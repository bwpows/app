<template>
<div>
    <blog-list
        v-for="item in blogList"
        :key="item._id"
        :title="item.title"
        :description="item.description"
        :createdTime="calCurrentTime(item.created_time)"
        :url="item.url.length!==0?(item.url): null"
        :love="item.likes"
        @click.native="goBlogInfo(item)"
        @praise="praise($event ,item._id)"
    ></blog-list>
</div>
</template>
<script>
import DefaultFooter from '@/layouts/default/Footer'
import DefaultHeader from '@/layouts/default/Header'
import { getBlog } from '@/api/Home';
import { formatTime, calCurrentTime } from '@/util/formatTime'
import { baseURL } from '@/api/Server';
import { cancelPraise, praise } from '../api/Like';

export default {
    data(){
        return{
            blogList: [],
            baseURL,
            userId: JSON.parse(localStorage.getItem('userInfo')).userId
        }
    },

    async mounted(){
        await this.fetch()
    },

    components: {
        DefaultFooter,
        DefaultHeader
    },

    methods: {
        formatTime, calCurrentTime,
        async fetch(){
            let res = await getBlog()
            if(res.code == 200){
                this.blogList = res.data
            }
        },

        goBlogInfo(item){
            this.$router.push({ path: `/blog/info/${item._id}` })
        },

        async praise(data,id){
            if(data){
                // 取消点赞
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userId, work_id: id })
            }
            this.fetch()
        }
    }
}
</script>