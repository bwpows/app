
<template>
    <div>
        <v-card class="pa-4">
            <div class="d-flex justify-space-between">
                <div>我的头像</div>
                <div></div>
            </div>
        </v-card>
    </div>
</template>

<script>
import { getUserInfo } from '@/api/Session';
export default {
    data() {
        return {
            userInfo: {}
        }
    },

    mounted() {
        this.getInfo()
    },

    methods: {
        async getInfo(){
            let res = await getUserInfo()
            console.log(res)
        }
    },

}

</script>
