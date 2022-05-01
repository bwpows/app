<template>
<div>
    <v-card class="pa-4 d-flex justify-space-between align-center rounded-lg" @click="$router.push('/account/info')">
        <div class="d-flex">
            <div class="mr-3">
                <v-img :src="userInfo.pictrue?(baseURL+userInfo.pictrue):userSvg" class="rounded" width="50" height="50" alt="alt"></v-img>
            </div>
            <div>
                <div class="display-1 font-weight-regular">Hello, {{ userInfo.nicename || userInfo.username }}</div>
                <div class="body-2 grey--text text--darken-1 mt-1">昵称、头像与隐私</div>
            </div>
        </div>
        <v-img src="../../assets/icon/leftArrow.svg" max-width="20" height="20" contain></v-img>
    </v-card>
    <v-card class="pa-4 mt-8 mb-5 rounded-lg">
        <div class="d-flex align-center">
            <v-img :src="phoneSvg" height="38" width="38" class="mr-3" contain></v-img>
            <div style="width: 100%; height: 100%;" class="d-flex justify-space-between align-center" @click="$router.push('/account/phone')">
                <span>手机号</span>
                <div class="d-flex align-center">
                    <span class="grey--text body-2 mr-2">{{ formatPhoneNumber(userInfo.phone) }}</span>
                    <v-img src="../../assets/icon/leftArrow.svg" width="20" height="20"></v-img>
                </div>
            </div>
        </div>

        <v-divider class="ml-12 my-3 mr-2"></v-divider>
        <div class="d-flex align-center">
            <v-img :src="settingSvg" height="34" width="34" class="mr-3" contain></v-img>
            <div style="width: 100%; height: 100%;" class="d-flex justify-space-between align-center" @click="$router.push('/account/settings')">
                <span>通用设置</span>
                <v-img src="../../assets/icon/leftArrow.svg" max-width="20" height="20" contain></v-img>
            </div>
        </div>
    </v-card>
    <v-card class="pa-4 my-5 rounded-lg">
        <template v-for="(item,index) in list">
            <div class="d-flex align-center justify-space-between" @click="goOtherPage(item)" :key="item.path">
                <div class="d-flex align-center">
                    <v-img :src="item.icon" height="35" width="35" class="mr-3" contain></v-img>
                    <span>{{ item.text }}</span>
                </div>
                <v-img src="../../assets/icon/leftArrow.svg" max-width="20" height="20" contain></v-img>
            </div>
            <v-divider class="ml-12 my-3 mr-2" v-if="index !== list.length-1"  :key="item.path"></v-divider>
        </template>
        <v-divider class="ml-12 my-3 mr-2" v-if="showPrivacy"></v-divider>
        <div class="d-flex justify-space-between" @click="$router.push('/account/privacy')" v-if="showPrivacy">
            <div class="d-flex align-center">
                <v-img :src="privacySvg" height="35" width="35" class="mr-3" contain></v-img>
                隐私作品
            </div>
            <v-img src="../../assets/icon/leftArrow.svg" max-width="20" height="20" contain></v-img>
        </div>
    </v-card>

    <v-card class="pa-1 mt-10 text-center rounded-lg">
        <v-btn color="error" class="body-1" width="100%" text @click="openLogoutDialog()">退出登录</v-btn>
    </v-card>

    <confirm-dialog
        :title="confirm.title"
        :value="confirm.value"
        :content="confirm.content"
        @close="confirm.value = false"
        @confirm="logout()"
    />

</div>
</template>
<script>
import userSvg from '@/assets/user.svg'
import phoneSvg from '@/assets/icon/phone.svg'
import collecteSvg from '@/assets/icon/collecte.svg'
import likeSvg from '@/assets/icon/like.svg'
import settingSvg from '@/assets/icon/setting.svg'
import worksSvg from '@/assets/icon/works.svg'
import privacySvg from '@/assets/icon/privacy.svg'
import { formatPhoneNumber } from '@/util/phone'
import { baseURL } from '../../api/Server'
import { getUserInfo } from '../../api/Account';
export default {
    data() {
        return {
            // 图标
            userSvg, phoneSvg, collecteSvg, likeSvg, settingSvg, worksSvg, baseURL, privacySvg,

            // 个人信息
            userInfo: JSON.parse(localStorage.getItem('userInfo')),

            showPrivacy: JSON.parse(localStorage.getItem('showPrivacy')),

            // 列表
            list:[
                { icon: worksSvg, text: '我的作品', path: '/account/works' },
                { icon: likeSvg, text: '我的点赞', path: '/account/likes' },
                { icon: collecteSvg, text: '我的关注', path: '/account/collectes' },
                { icon: collecteSvg, text: '收支明细', path: '/account/card' }
            ],

            // 确定框
            confirm: {}
        }
    },

    created() {
        this.getInfo(this.userInfo.userId)
    },

    methods: {
        formatPhoneNumber,

        async goOtherPage(item){
            this.$router.push(item.path)
        },



        async getInfo(id){
            let res = await getUserInfo(id)
            if(res.code === 200){
                this.userInfo = res.data
            }else{
                this.$snackbar("身份验证失败")
                await this.$router.replace('signin')
            }
        },

        openLogoutDialog(){
            let that = this
            plus.nativeUI.actionSheet(
                {title:"退出登录会导致部分功能不可用，是否要继续退出？",
                cancel:"取消",
                buttons:[
                    {
                        title:"确认退出",
                        style:"destructive"
                    }
                ]},
                function(e){
                    if(e.index == 1){
                        that.logout()
                    }
                }
            );
        },

        // 退出登录
        logout(){
            localStorage.removeItem('userInfo')
            localStorage.removeItem('token')
            this.$router.replace('/signin')
        }
    },
}
</script>