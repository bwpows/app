<template>
    <div class="pa-4 bgColor">
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

    methods: {
        formatTime,
        async fetch(){
            try {
                let res = await getBlog()
                console.log(res)
                if(res.code == 200){
                    this.blogList = res.data
                }
            } catch (error) {
                console.log('获取博客失败')
            }
        },

        goBlogInfo(item){
            this.$router.push({ path: `/blog/info/${item._id}` })
        }
    }
}
</script>