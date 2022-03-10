<template>
    <div>
        <blog-list
            v-for="(item,index) in workData"
            :key="index"
            :title="item.title"
            :description="item.description"
            :createdTime="item.created_time" f
            :url="item.url.length!==0?(item.url): null"
            :love="item.likes"
            @click.native="goBlogInfo(item)"
            @praise="praise($event ,item._id)"
        ></blog-list>
    </div>
</template>
<script>
import { cancelPraise, getPraiseByUserId, praise } from '../../api/Like'
import { calCurrentTime } from '../../util/formatTime'
export default {
    data(){
        return {
            workData: [],
            userInfo: JSON.parse(localStorage.getItem('userInfo'))
        }
    },

    created() {
        this.fetch()
    },

    methods: {
        calCurrentTime,
        async fetch(){
            this.workData = []
            let res = await getPraiseByUserId(this.userInfo.userId);
            for (let i = 0; i < res.data.length; i++) {
                let obj = res.data[i].works[0]
                obj.likes = [{
                    _id: res.data[i]._id,
                    user_id: res.data[i].user_id,
                    work_id: res.data[i].work_id,
                }]
                this.workData.push(obj)
            }
        },

        goBlogInfo(item){
            this.$router.push({ path: `/work/${item._id}` })
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

    },
}

</script>