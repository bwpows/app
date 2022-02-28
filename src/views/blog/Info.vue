<template>
    <div class="pa-4">
        {{blogInfo}}
    </div>
</template>
<script>
import { getBlogInfo } from '@/api/Video';
import { formatTime } from '@/util/formatTime'
import { baseURL } from '@/api/Server';

export default {
    data(){
        return{
            blogInfo: {}
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        async fetch(){
            let res = await getBlogInfo(this.$route.params.id)
            console.log(res)
            if(res.code == 200){
                this.blogInfo = res.data
            }
        }
    }
}
</script>