<template>
    <div>

        <work-list-loading v-if="loading" class="animate__animated animate__fadeIn" />

        <v-card class="pa-6 grey--text text--darken-1 body-2 rounded-lg animate__animated animate__fadeIn" v-if="workData.length == 0">
            您还没有点赞的作品哦！看样子您的品味很高哦。
        </v-card>

        <blog-list
            v-for="item,index in workData"
            :item="item"
            :key="index"
            :title="item.title"
            :description="item.description"
            :createdTime="item.created_time"
            :url="item.url.length!==0?(item.url): null"
            :love="item.likes"
            :views="item.views"
            @praise="praise($event ,item._id)"
            @click.native="goWorkInfo(item)"
        ></blog-list>

    </div>
</template>
<script>
import { cancelPraise, getPraiseByUserId, praise } from '../../api/Like'
import { viewWork } from '../../api/View'
import { calCurrentTime } from '../../util/formatTime'
export default {
    data(){
        return {
            workData: [],
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            loading: true,
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
        calCurrentTime,
        async fetch(){
            this.workData = []
            let res = await getPraiseByUserId(this.userInfo.userId);
            this.loading = false
            if(res.code == 200){
                for (let i = 0; i < res.data.length; i++) {
                    let obj = res.data[i].works[0]
                    obj.likes = res.data[i].likes
                    obj.views = res.data[i].views
                    this.workData.push(obj)
                }
            }
        },


        async praise(data,id){
            if(data && !data.is_cancel){
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userInfo.userId, work_id: id })
            }
            this.fetch()
        },

        goWorkInfo(data){
            this.$router.push({
                path: `/workinfo/${data._id }`
            })
        }

    },
}

</script>