<template>
    <v-app class="containers white--text">
        <v-main>
            <v-img src="../assets/logo.svg" height="100" contain></v-img>
            <h1 class="text-h2 mt-6 text-center">欢迎</h1>
            <div class="mb-6 mt-4 grey--text text--darken-1 text-center">没有账号将自动为您创建账号</div>
            <v-text-field type="tel" outlined class="mb-0" v-model="phone" color="primary" placeholder="请输入手机号"></v-text-field>
            <v-text-field v-if="signInType != 'code'" type="password" placeholder="请输入密码" outlined class="mb-0" v-model="password" color="primary"></v-text-field>
            <div v-else style="position: relative;">
                <v-text-field type="tel" placeholder="请输入验证码" outlined class="mb-0" v-model="code" color="primary"></v-text-field>
                <v-btn text @click="getSMSCode()" x-small class="body-2 primary--text cursor_pointer" style="position: absolute; right: 5px; top:18px;" :disabled='seconds != 60' dark>
                    {{seconds == 60?'获取验证码':seconds+'s '+'后再次获取'}}
                </v-btn>
            </div>

            <div class="body-2 primary--text mb-8 cursor_pointer">
                <span @click="changeSignInType()">{{ signInType == 'code'?'使用密码登录':'使用验证码 登录/注册' }}</span>
            </div>
            <v-btn color="primary mt-14" style="width:100%;" depressed x-large @click="signIn()">登录 / 注册</v-btn>
        </v-main>
    </v-app>
</template>
<script>
import { passwordLogin, getUserInfo } from '@/api/Session'
export default {
    data(){
        return{
            phone: '17779467369',
            password: 'bowei520',
            code: '',
            signInType: 'code',
            interval: {},
            seconds: 60,
            snackbar: {
                value: true
            }
        }
    },
    methods:{
        async signIn(){
            if(this.signInType == 'code'){
                if(this.code == ''){
                    this.snackbar.content = '请输入验证码';
                    this.$store.commit('app/updateSnackbar', this.snackbar);
                }
            }else{
                if(this.phone == ''){
                    this.snackbar.content = '请输入密码';
                    this.$store.commit('app/updateSnackbar', this.snackbar);
                }
                let res = await passwordLogin({ phone: this.phone, password: this.password })
                if(res.code !== 200){
                    this.snackbar.content = res.message || '用户或密码错误';
                    this.$store.commit('app/updateSnackbar', this.snackbar);
                    return false;
                }
                localStorage.setItem('token', res.data.token)
                let user = await getUserInfo()
                localStorage.setItem('userInfo', JSON.stringify(user))
                this.$router.replace('/')
            }
            console.log(this.$store.state.app.snackbar)
        },
        changeSignInType(){
            this.signInType = this.signInType=='password'?'code':'password'
        },
        getSMSCode(){
            if(this.seconds != 60) return;
            this.seconds--;
            this.interval = setInterval(() => {
                this.seconds--;
                console.log(333)
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
.containers{
    padding: 60px 60px 0 60px !important;
    height: 100vh;
    /* background-image: linear-gradient(30deg, #0c1224 ,#000, #000, #000, #331807) !important; */
}
.cursor_pointer{
    cursor: pointer;
}
</style>
