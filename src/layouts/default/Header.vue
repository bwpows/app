<template>
    <div>
        <v-app-bar app fixed elevation="0" class="headerBG">
            <div class="d-flex align-center justify-space-between mx-2" style="width: 100vw; height: 100%;" @click="backToTop">
<!--                <div>-->
<!--                    <v-img :src="userInfo.pictrue?(baseURL+userInfo.pictrue):userSvg" class="rounded" width="32" height="32" alt="头像"  @click.stop="drawer = !drawer"></v-img>-->
<!--                </div>-->
                <v-img src="@/assets/icon/menu.svg" height="30" maxWidth="30" contain @click.stop="drawer = !drawer"></v-img>
                <v-img src="@/assets/icon/add.svg" height="24" maxWidth="24" contain @click.stop="openAddDialog()"></v-img>
            </div>
        </v-app-bar>

        <v-navigation-drawer
            v-model="drawer"
            absolute
            left
            temporary
            :color="backgroundColor"
        >
            <template v-slot:prepend>
                <v-card class="d-flex align-center mx-3 my-4 pa-3 rounded-lg my-5">
                    <div class="mr-3">
                        <v-img :src="userInfo.pictrue?(baseURL+userInfo.pictrue):userSvg" class="rounded" width="40" height="40" alt="alt"></v-img>
                    </div>
                    <div class="text-h4 font-weight-regular">Hello, {{ userInfo.username }}</div>
                </v-card>
            </template>

            <v-card class="px-4 mx-3 py-6 rounded-lg">
                <template v-for="(item,index) in items">
                    <div class="d-flex align-center " @click="$router.push(item.path)">
                        <div class="d-flex align-center">
                            <v-img :src="item.icon" height="30" width="30" class="mr-3" contain></v-img>
                            {{ item.text }}
                        </div>
                    </div>

                    <v-divider class="my-4 ml-10" v-if="index !== items.length - 1"></v-divider>
                </template>
                <v-divider class="my-4 ml-10" v-if="showPrivacy"></v-divider>
                <div class="d-flex align-center" @click="$router.push('/account/privacy')" v-if="showPrivacy">
                    <div class="d-flex align-center">
                        <v-img :src="privacySvg" height="30" width="30" class="mr-3" contain></v-img>
                        隐私作品
                    </div>
                </div>
            </v-card>
        </v-navigation-drawer>

    </div>
</template>
<script>

import userSvg from '@/assets/user.svg'
import worksSvg from "@/assets/icon/works.svg";
import likeSvg from "@/assets/icon/like.svg";
import cardDetailsSvg from "@/assets/icon/cardDetails.svg";
import privacySvg from '@/assets/icon/privacy.svg'

import { baseURL } from '@/api/Server'
export default {
    name: 'DefaultHeader',

    data:() => ({
        privacySvg, userSvg, baseURL,
        drawer: false,
        lastClickTime: 0,

        backgroundColor: null,

        // 个人信息
        userInfo: JSON.parse(localStorage.getItem('user')),

        showPrivacy: JSON.parse(localStorage.getItem('showPrivacy')),
        // 列表
        items:[
            { icon: worksSvg, text: '我的作品', path: '/account/works' },
            { icon: likeSvg, text: '我的点赞', path: '/account/likes' },
            { icon: cardDetailsSvg, text: '收支明细', path: '/card/details' }
        ],
    }),

    mounted() {
        this.init()
    },

    methods: {

        init(){
            if(this.$vuetify.theme.isDark){
                this.backgroundColor=this.$vuetify.theme.themes.dark.mainBG;
            }else{
                this.backgroundColor=this.$vuetify.theme.themes.light.mainBG;
            }
        },

        // 返回顶部
        backToTop(){
            if(new Date().getTime() - this.lastClickTime < 400){
                this.lastClickTime = 0
                document.getElementById('app').scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }else{
                this.lastClickTime = new Date().getTime();
            }
        },

        // 打开发布弹窗
        openAddDialog(){
            if(window.plus){
                let that = this;
                plus.nativeUI.actionSheet(
                    {
                        cancel:"取消",
                        buttons:[
                            {
                                title:"发布作品"
                            },
                            {
                                title: "创建任务"
                            }
                        ]
                    },
                    function(e){
                        if(e.index == 1){
                            that.$router.push('/publish')
                        }else if(e.index == 2){
                            that.$router.push('/task/add')
                        }
                    }
                );
            }else{
                this.$router.push('/task/add')
            }
        }
    },
}
</script>