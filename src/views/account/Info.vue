
<template>
    <div>
        <v-card class="px-4 py-2">
            <div class="d-flex justify-space-between align-center my-4">
                <div>我的头像</div>
                <div class="d-flex">
                    <head-img-file
                        v-if="userInfo.pictrue"
                        :preview="baseURL+userInfo.pictrue"
                        @upload="uploadHeadImg"
                    />
                </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between align-center my-4">
                <div>我的昵称</div>
                <div class="d-flex align-center">
                    {{ userInfo.username }}
                    <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between align-center my-4">
                <div>性别</div>
                <div class="d-flex align-center">
                    {{ userInfo.username }}
                    <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                </div>
            </div>
        </v-card>
    </div>
</template>

<script>
import { getUserInfo, uploadHeadImg } from '../../api/Account';
import { baseURL } from '../../api/Server';
export default {
    data() {
        return {
            baseURL,
            userInfo: {}
        }
    },

    mounted() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.getInfo(this.userInfo.userId)
    },

    methods: {
        async getInfo(id){
            let res = await getUserInfo(id)
            this.userInfo = res.data
        },

         // 文件上传
        async uploadHeadImg(file){
            let formData = new FormData()
            formData.append('headImg', file);
            formData.append('_id', this.userInfo._id);
            await uploadHeadImg(formData)
            this.getInfo(this.userInfo._id)
        },
    },

}

</script>
