
<template>
    <div>
        <v-card class="px-4 py-2 rounded-lg">
            <div class="d-flex justify-space-between align-center my-4">
                <div>我的头像</div>
                <div class="d-flex">
                    <head-img-file
                        :preview="(userInfo.pictrue)?(baseURL+userInfo.pictrue):userSvg"
                        @upload="uploadHeadImg"
                    />
                </div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex justify-space-between align-center my-4" @click="openEditUsernameDialog()">
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
                    {{ userInfo.sex || '保密' }}
                    <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                </div>
            </div>
        </v-card>

        <!-- 编辑用户名称的弹窗 -->
        <base-dialog
            :value="editUsernameDialog"
            title="修改名称"
            @close="changeUsername()"
        >
            <template>
                <v-text-field maxlength="10" counter="10" type="text" autofocus placeholder="请输入昵称" class="mt-6 mr-1" v-model="userInfo.username" outlined dense color @keypress.native.enter="changeUsername()"></v-text-field>
            </template>
        </base-dialog>

    </div>
</template>

<script>
import userSvg from '@/assets/user.svg'
import { getUserInfo, uploadHeadImg } from '../../api/Account';
import { baseURL } from '../../api/Server';
import { editUsername } from '../../api/User';
import { viewWork } from '../../api/View';
export default {
    data() {
        return {
            baseURL, userSvg,
            userInfo: {},
            editUsernameDialog: false
        }
    },

    mounted() {
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        this.getInfo(this.userInfo.userId)
    },

    methods: {

        // 获取用户信息
        async getInfo(id){
            let res = await getUserInfo(id)
            if(res.code == 200){
                this.userInfo = res.data || {};
            }
        },

         // 文件上传
        async uploadHeadImg(file){
            let formData = new FormData()
            formData.append('headImg', file);
            formData.append('_id', this.userInfo._id);
            await uploadHeadImg(formData)
            this.getInfo(this.userInfo._id)
        },

        // 打开修改名称弹窗
        openEditUsernameDialog(){
            this.editUsernameDialog = true
        },

        // 修改用户昵称
        async changeUsername(){
            let obj = {
                username: this.userInfo.username
            }
            let data = await editUsername(this.userInfo._id, obj)
            if(data.code == 200){
                this.editUsernameDialog = false
                this.getInfo(this.userInfo._id)
            }

        },

    },

}

</script>
