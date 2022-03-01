<template>
<div>
    <!-- <default-header />
    <v-main class="ma-6"> -->
        <v-card class="px-6 py-3 mb-5">
            <input type="text" placeholder="请输入标题（15字以内）" v-model="blogInfo.title" maxLength="15" style="border: none; width: 100%; height: 40px;" />
        </v-card>
        <v-card class="pa-6 mb-5">
            <textarea type="text" cols="20" rows="6" v-model="blogInfo.description" placeholder="这一刻的想法..." style="border: none; width: 100%;"></textarea>
            <v-img :src="uploadIcon" height="80" contain width="80" @click="selectFile()"></v-img>
        </v-card>
        <v-checkbox v-model="blogInfo.is_public" hide-details dense label="设置为隐私"></v-checkbox>
        <v-card class="mt-8 pa-1">
            <v-btn color="primary" width="100%" class="body-1" text @click="submit()">发布作品</v-btn>
        </v-card>

        <input type="file" style="display: none;"  accept="image/*" ref="uploadInput" @change="uploadFile()" />
    <!-- </v-main>
    <default-footer /> -->
</div>
</template>

<script>
import DefaultFooter from '@/layouts/default/Footer'
import DefaultHeader from '@/layouts/default/Header'
import uploadIcon from '@/assets/common/upload.svg'
import { publishVideo } from '@/api/Works'
export default {
    data() {
        return {
            uploadIcon,
            content: '',
            blogInfo: {},
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            uploadFiles: []
        }
    },

    mounted() {
        console.log(this.userInfo.userId)
    },

    components: {
        DefaultFooter,
        DefaultHeader
    },

    methods: {
        selectFile(){
            this.$refs.uploadInput.click()
        },

        uploadFile(){
            // var formData = new FormData();
            this.uploadFiles = this.$refs.uploadInput.files[0]
        },

        // 提交
        async submit(){
            let obj = this.blogInfo
            obj.user_id = this.userInfo.userId
            var formData = new FormData();
            formData.append('user_id',this.userInfo.userId);
            formData.append('title',this.blogInfo.title);
            formData.append('description',this.blogInfo.description);
            formData.append('file',this.uploadFiles);
            formData.append('is_public', Boolean(!this.blogInfo.is_public));
            let res = await publishVideo(formData)
            if(res.code == 200){
                this.$store.commit('app/snackbar', { value: true, content: '发布成功' })
                this.$router.replace('/')
            }else{
                this.$store.commit('app/snackbar', { value: true, content: '发布失败' })
            }
        },

        // 验证请求结果
        verification(res, msg){
            
        }

    },
}
</script>

<style scoped>
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