<template>
<div>
    <v-card class="px-6 py-3 mb-5">
        <input type="text" placeholder="请输入标题（15字以内）" v-model="blogInfo.title" maxLength="15" style="border: none; width: 100%; height: 40px;" :class="$vuetify.theme.dark?'white--text':''" class="body-1" />
    </v-card>
    <v-card class="pa-6 mb-5">
        <textarea type="text" cols="20" rows="6" v-model="blogInfo.description" placeholder="这一刻的想法..." style="border: none; width: 100%;" class="body-1" :class="$vuetify.theme.dark?'white--text':''"></textarea>
        <file-upload @upload="getFiles(arguments)" />
    </v-card>
    <v-checkbox v-model="blogInfo.is_public" hide-details dense label="设置为隐私"></v-checkbox>
    <v-card class="mt-8 pa-1">
        <v-btn color="primary" width="100%" class="body-1" text @click="submit()">发布作品</v-btn>
    </v-card>

    <input type="file" style="display: none;" multiple accept="image/*" ref="uploadInput" @change="uploadFile()" />
</div>
</template>

<script>
import uploadIcon from '@/assets/common/upload.svg'
import { publishVideo } from '@/api/Works'
import { getUserInfo } from '@/api/Session';

var formData = new FormData()
export default {
    data() {
        return {
            formData,
            uploadIcon,
            content: '',
            blogInfo: {},
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            uploadFiles: []
        }
    },

    mounted() {
        this.fetch()
    },

    methods: {


        // 获取数据
        async fetch(){
            await getUserInfo(this.userInfo.userId)
        },

        // 文件上传
        getFiles(files){
            this.formData = new FormData()

            if(files[1].length != 0){
                for (let index = 0; index < files[0].length; index++) {
                    if(files[1].indexOf(index) == -1){
                        this.formData.append('files', files[0][index]);
                    }
                }
            }else{
                for (let j = 0; j < files[0].length; j++) {
                    this.formData.append('files',files[0][j]);
                }
            }
        },

        // 提交
        async submit(){
            if(!this.blogInfo.title) return this.$snackbar('请输入标题')
            if(!this.blogInfo.description) return this.$snackbar('请输入内容')

            this.formData.append('user_id',this.userInfo.userId);
            this.formData.append('title',this.blogInfo.title);
            this.formData.append('description',this.blogInfo.description);
            this.formData.append('is_public', Boolean(!this.blogInfo.is_public));
            let res = await publishVideo(this.formData)
            formData = new FormData()
            if(res.code == 200){
                this.$snackbar('发布成功' )
                this.$router.replace('/')
            }else{
                this.$snackbar('发布失败')
            }
        }

    },
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