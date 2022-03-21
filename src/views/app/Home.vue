<template>
    <div>

        <blog-list
            v-for="item in blogList"
            :key="item._id"
            :title="item.title"
            :description="item.description"
            :createdTime="item.created_time"
            :url="item.url.length!==0?(item.url): null"
            :love="item.likes"
            :views="item.views"
            @praise="praise($event ,item._id)"
            @click.native="openBottomSheet(item)"
        ></blog-list>

        <bottom-dialog
            :value="bottomSheetData.value"
            :data="bottomSheetData.data"
            @close="bottomSheetData = {}"
        />
    </div>
</template>
<script>
import DefaultFooter from '@/layouts/default/Footer'
import DefaultHeader from '@/layouts/default/Header'
import { getBlog } from '@/api/Home';
import { formatTime } from '@/util/formatTime'
import { cancelPraise, praise } from '@/api/Like';
import { viewWork } from '../../api/View';


export default {
    data(){
        return{
            blogList: [],
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            bottomSheetData: {},
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

        async praise(data,id){
            if(data && !data.is_cancel){
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userId, work_id: id })
            }
            this.fetch()
        },

        async openBottomSheet(data){
            this.bottomSheetData = {
                value: true,
                data
            }
            await viewWork({user_id: this.userId, work_id: data._id})
            this.fetch()
        }
    }
}
</script>