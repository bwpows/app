<template>
    <div class="overflow-y-auto hidden_scrollbar">
        <v-card class="px-6 py-3 mb-6 rounded-lg" style="position: relative;">
            <input type="text" placeholder="搜索作品" v-model="keyword" maxLength="15" style="border: none; width: 100%; height: 40px;" :class="$vuetify.theme.dark?'white--text':''" class="body-1" @keydown.enter="fetch()" ref="inputVal" @blur.prevent="fetch()" />
            <img :src="searchSvg" height="30" width="30" @click="fetch()" style="position: absolute; right: 20px; top: 18px;" />
        </v-card>

        <work-list-loading v-if="loading" />

        <div v-else>
            <worksss-list v-for="item in blogList" :key="item._id" :item="item" @refresh="fetch" @click.native="goWorkInfo(item)" />
        </div>

        <!-- loading -->
        <request-loading v-if="!noData" />

        <!-- {{ noData }} -->
        <v-card class="pa-6 rounded-lg mb-10 grey--text" v-else>
            没有更多数据啦
        </v-card>


    </div>
</template>
<script>
import { getBlog } from '@/api/Home';
import { formatTime } from '@/util/formatTime'
import { cancelPraise, praise } from '@/api/Like';
import searchSvg from '../../assets/icon/search.svg'

export default {
    data(){
        return{
            searchSvg,
            blogList: [],
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            loading: true,
            keyword: '',
            bottomSheetvalue: false,
            offsetTop: '',
            preRouteName: '',

            currentPage: 1,
            pageCount: 20,
            requestLoading: false,
            noData: false
        }
    },

    async created(){
        await this.fetch()
    },

    mounted() {
        this.addEventListener()
    },

    beforeDestroy() {
        this.removeEventListener()
    },

    // Get the name of the previous route
    beforeRouteEnter(to, from, next){
        next(vm => {
            vm.preRouteName = from.name
        })
    },

    // Get the current page sliding position,
    beforeRouteLeave (to, from, next) {
        this.removeEventListener()
        this.offsetTop = document.getElementById('app').scrollTop || document.body.scrollTop || window.pageYOffset;
        localStorage.setItem('offsetTop', this.offsetTop)
        next()
    },

    // If the previous route is 'WorkInfo', jump the location recorded when leaving the page.
    async activated(){
        if(this.preRouteName == 'WorkInfo'){
            document.getElementById('app').scrollTop = this.offsetTop || 0;
        }else{
            this.fetch()
        }
    },

    methods: {
        formatTime,

        // Get work data
        async fetch(type){
            this.requestLoading = true;
            this.$nextTick(() => {
                this.$refs.inputVal.blur();
            })
            let res = await getBlog({keywords: this.keyword, current_page: this.currentPage, page_count: this.pageCount})
            this.requestLoading = false;
            if(res.code == 200){
                let arr = res.data || []
                if(arr.length < this.pageCount){
                    this.noData = true;
                }
                if(type){
                    this.blogList.push(...arr)
                }else{
                    this.blogList = arr
                }
            }
            this.loading = false;
        },

        // Like work
        async praise(data,id){
            if(data && !data.is_cancel){
                await cancelPraise(data._id)
            }else{
                await praise({ user_id: this.userId, work_id: id })
            }
            this.fetch()
        },

        // Go to the work details page
        async goWorkInfo(data){
            this.$router.push({
                path: `/workinfo/${data._id }`
            })
        },

        // 移除监听事件
        removeEventListener(){
            window.removeEventListener('scroll', this.isBottom)
        },

        // 添加监听事件
        addEventListener(){
            window.addEventListener('scroll', this.isBottom)
        },

        async isBottom(){
            if(document.documentElement.offsetHeight - document.documentElement.clientHeight - document.documentElement.scrollTop < 500){
                // console.log('出发')
                // document.documentElement.scrollTop      滚动的高度
                // document.documentElement.clientHeight   页面的可视高度
                // document.documentElement.offsetHeight   页面的总高度
                if(this.requestLoading || this.noData) return;
                await this.fetch(1)
                this.currentPage++;
            }
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

.touch_action_none {
    touch-action: none !important;
}

.hidden_scrollbar::-webkit-scrollbar {
    display:none
}

</style>