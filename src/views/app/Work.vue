<template>
    <div>
        <v-card class="px-6 py-3 mb-6" style="position: relative;">
            <input type="text" placeholder="搜索作品" v-model="keyword" maxLength="15" style="border: none; width: 100%; height: 40px;" :class="$vuetify.theme.dark?'white--text':''" class="body-1" @keydown.enter="fetch()" ref="inputVal" @blur.prevent="fetch()" />
            <img :src="searchSvg" height="30" width="30" @click="fetch()" style="position: absolute; right: 20px; top: 18px;" />
        </v-card>

        <work-list-loading v-if="loading" class="animate__animated animate__fadeIn" />

        <div v-else>
            <blog-list
                class="animate__animated animate__fadeIn"
                v-for="item,index in blogList"
                :key="item._id"
                :class="'animate__delay-'+ 0.15*index +'s'"
                :_id="item._id"
                :title="item.title"
                :description="item.description"
                :createdTime="item.created_time"
                :url="item.url.length!==0?(item.url): null"
                :love="item.likes"
                :views="item.views"
                @praise="praise($event, item._id)"
                @click.native="openBottomSheet(item)"
            ></blog-list>
        </div>

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
import searchSvg from '../../assets/icon/search.svg'


export default {
    data(){
        return{
            searchSvg,
            blogList: [],
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            bottomSheetData: {},
            loading: true,
            keyword: ''
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
            this.$refs.inputVal.blur();
            let res = await getBlog({keyword: this.keyword})
            if(res.code == 200){
                this.blogList = res.data
            }
            this.loading = false
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
            viewWork({user_id: this.userId, work_id: data._id})
            this.fetch()
        }
    }
}
</script>
<style>

textarea:focus{
	outline: medium;
}
input:focus{
	outline: medium;
}
input{
    font-size: 1.05rem;
}

</style>