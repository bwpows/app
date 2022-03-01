<template>
<div>
    <!-- <other-header />
    <v-main class="ma-4"> -->
        {{blogInfo}}
    <!-- </v-main> -->
    <!-- <other-feader /> -->
</div>
</template>
<script>
import { getBlogInfo } from '@/api/Works';
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