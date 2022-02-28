<template>
<v-app>
    <v-main class="container white--text">
        <v-img src="../assets/logo.svg" height="100" contain></v-img>
        <h4 class="text-h5 my-8 text-center">创建账号</h4>
        <v-text-field type="text" placeholder="请输入昵称" dark outlined class="mb-0" v-model="nickname" color="primary"></v-text-field>
        <v-text-field type="password" placeholder="请设置密码" dark outlined class="mb-0" v-model="password" color="primary"></v-text-field>
        <div style="position: relative;">
            <v-text-field type="tel" placeholder="请输入验证码" dark outlined class="mb-0" v-model="code" color="primary"></v-text-field>
            <v-btn text @click="getSMSCode()" x-small class="body-2 primary--text cursor_pointer" style="position: absolute; right: 5px; top:18px;" :disabled='seconds != 60' dark>
                {{seconds == 60?'获取验证码':seconds+'s '+'后再次获取'}}
            </v-btn>
        </div>
        <v-btn color="primary mt-6" style="width:100%;" large @click="createAccount()">创建账号</v-btn>
    </v-main>
</v-app>
</template>
<script>
export default {
    data(){
        return{
            nickname: '',
            username: '',
            password: '',
            code: '',
            interval: {},
            seconds: 60,
            snackbar:{
                value: true
            }
        }
    },
    created(){
        this.username = this.$route.query.account;
    },
    methods:{
        // 点击创建账号
        createAccount(){
            if(this.nickname == ''){
                this.snackbar.content = '请输入昵称';
                this.$store.commit('app/updateSnackbar', this.snackbar);
            }else if(this.password == ''){
                this.snackbar.content = '请设置密码';
                this.$store.commit('app/updateSnackbar', this.snackbar);
            }else if(this.code == ''){
                this.snackbar.content = '请输入验证码';
                this.$store.commit('app/updateSnackbar', this.snackbar);
            }
        },

        // 发送验证码
        getSMSCode(){
            if(this.seconds != 60) return;
            this.seconds--;
            this.interval = setInterval(() => {
                this.seconds--;
                if(this.seconds < 1){
                    clearInterval(this.interval)
                    this.seconds = 60
                }
            }, 1000);
        }
    },
    destroyed(){
        clearInterval(this.interval)
    }
}
</script>
<style>
.container{
    padding: 60px 60px 0 60px !important;
    height: 100vh;
    background-image: linear-gradient(30deg, #0c1224 ,#000, #000, #000, #331807);
}
.cursor_pointer{
    cursor: pointer;
}
</style>
