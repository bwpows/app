<template>
    <div>
        <blog-list
            v-for="item in worksData"
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
import { baseURL } from "../../api/Server"
import { getBlogByUserId } from "../../api/Works"
import { formatTime } from "../../util/formatTime"

export default {
    data() {
        return {
            baseURL,
            worksData: [],
            userInfo: JSON.parse(localStorage.getItem('userInfo'))
        }
    },

    created() {
        this.getData()
    },

    methods: {
        formatTime,
        async getData(){
            let res = await getBlogByUserId(this.userInfo.userId)
            this.worksData = res.data
            console.log(res)
        },

        goBlogInfo(item){
            this.$router.push({ path: `/blog/info/${item._id}` })
        }
    },

}
</script>