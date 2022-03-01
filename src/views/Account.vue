<template>
<div>
    <!-- <default-header /> -->
    <!-- <v-main class="ma-6"> -->
        <v-card class="pa-4 d-flex justify-space-between">
            <div class="d-flex">
                <v-avatar size="50" color="primary mr-4" >
                    <v-img :src="userSvg" alt="alt"></v-img>
                </v-avatar>
                <div>
                    <div class="display-1 font-weight-regular">Hello, {{ userInfo.nicename || userInfo.username }}</div>
                    <div class="body-2 grey--text text--darken-1 mt-1">昵称、头像与隐私</div>
                </div>
            </div>
            <div class="d-flex align-center">
                 <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
            </div>
        </v-card>
        <v-card class="pa-4 mt-8 mb-5">
            <div class="d-flex align-center">
                <v-img :src="phoneSvg" height="35" width="35" class="mr-3" contain></v-img>
                <div style="width: 100%; height: 100%;" >
                    <div class="d-flex justify-space-between align-center">
                        <span>手机号</span>
                        <div class="d-flex align-center">
                            <span class="grey--text body-2">{{ formatPhoneNumber(userInfo.phone) }}</span>
                            <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                        </div>
                    </div>
                </div>
            </div>
            <v-divider class="ml-12 my-3 mr-2"></v-divider>
            <div class="d-flex align-center" @click="$router.push('/account/works')">
                <v-img :src="worksSvg" height="35" width="35" class="mr-3" contain></v-img>
                <div style="width: 100%; height: 100%;" >
                    <div class="d-flex justify-space-between align-center">
                        <span>我的作品</span>
                        <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                    </div>
                </div>
            </div>
            <v-divider class="ml-12 my-3 mr-2"></v-divider>
            <div class="d-flex align-center">
                <v-img :src="likeSvg" height="32" width="32" class="mr-3" contain></v-img>
                <div style="width: 100%; height: 100%;" >
                    <div class="d-flex justify-space-between align-center">
                        <span>我的点赞</span>
                        <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                    </div>
                </div>
            </div>
            <v-divider class="ml-12 my-3 mr-2"></v-divider>
            <div class="d-flex align-center">
                <v-img :src="collecteSvg" height="32" width="35" class="mr-3" contain></v-img>
                <div style="width: 100%; height: 100%;" >
                    <div class="d-flex justify-space-between align-center">
                        <span>我的关注</span>
                        <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                    </div>
                </div>
            </div>
            <v-divider class="ml-12 my-3 mr-2"></v-divider>
            <div class="d-flex align-center">
                <v-img :src="settingSvg" height="32" width="35" class="mr-3" contain></v-img>
                <div style="width: 100%; height: 100%;" >
                    <div class="d-flex justify-space-between align-center">
                        <span>通用设置</span>
                        <v-icon color="grey" size="30">mdi-chevron-right</v-icon>
                    </div>
                </div>
            </div>
        </v-card>

        <v-card class="pa-1 mt-8 text-center">
            <v-btn color="error" class="body-1" width="100%" text>退出登录</v-btn>
        </v-card>
    <!-- </v-main>
    <default-footer /> -->
</div>
</template>
<script>
import userSvg from '@/assets/user.svg'
import phoneSvg from '@/assets/icon/phone.svg'
import collecteSvg from '@/assets/icon/collecte.svg'
import likeSvg from '@/assets/icon/like.svg'
import settingSvg from '@/assets/icon/setting.svg'
import worksSvg from '@/assets/icon/works.svg'
import { formatPhoneNumber } from '@/util/phone'
export default {
    data() {
        return {
            userSvg, phoneSvg, collecteSvg, likeSvg, settingSvg, worksSvg,
            userInfo: JSON.parse(localStorage.getItem('userInfo'))
        }
    },

    methods: {
        formatPhoneNumber,
    },
}
</script>