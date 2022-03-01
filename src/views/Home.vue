<template>
<div>
    <blog-list
        v-for="item in blogList"
        :key="item._id"
        :title="item.title"
        :description="item.description"
        :createdTime="formatTime(item.created_time, 'YYYY-MM-dd HH:mm:ss')"
        :url="baseURL+item.url"
        @click.native="goBlogInfo(item)"
    ></blog-list>
</div>
</template>
<script>
import DefaultFooter from '@/layouts/default/Footer'
import DefaultHeader from '@/layouts/default/Header'
import { getBlog } from '@/api/Home';
import { formatTime } from '@/util/formatTime'
import { baseURL } from '@/api/Server';

export default {
    data(){
        return{
            blogList: [],
            baseURL,
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
        formatTime,
        async fetch(){
            let res = await getBlog()
            if(res.code == 200){
                this.blogList = res.data
            }
        },

        goBlogInfo(item){
            this.$router.push({ path: `/blog/info/${item._id}` })
        }
    }
}
</script>