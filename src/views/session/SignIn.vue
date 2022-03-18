<template>
    <v-app>
        <v-main class="containers">
            <v-img src="@/assets/logo.svg" height="100" contain></v-img>
            <h1 class="text-h2 mt-6 text-center primary--text font-weight-normal">欢迎</h1>
            <div class="mb-6 mt-4 grey--text text-center">没有账号将自动为您创建账号</div>
            <v-text-field type="tel" outlined class="mb-0" maxlength="11" counter v-model="phone" color="primary" placeholder="请输入手机号"></v-text-field>
            <v-text-field v-if="signInType != 'code'" type="password" placeholder="请输入密码" outlined class="mb-0" v-model="password" color="primary"></v-text-field>
            <div v-else style="position: relative;">
                <v-text-field type="tel" placeholder="请输入验证码" maxlength="6" outlined class="mb-0" v-model="code" color="primary"></v-text-field>
                <v-btn text @click="getSMSCode()" x-small class="body-2 primary--text cursor_pointer" style="position: absolute; right: 5px; top:15px;" :disabled='seconds != 60'>
                    {{seconds == 60?'获取验证码':seconds+'s '+'后再次获取'}}
                </v-btn>
            </div>

            <div class="body-2 primary--text cursor_pointer">
                <span @click="changeSignInType()">{{ signInType == 'code'?'使用密码登录':'使用验证码 登录/注册' }}</span>
            </div>
            <div class="body-2 d-flex align-center mt-2">
                <v-checkbox v-model="agreement" value="value">
                    <template v-slot:label>
                        <div class="body-2">
                            我已同意并阅读
                            <span class="primary--text mr-1" @click="$router.push('/safety/privacy')">隐私策略</span>和
                            <span class="primary--text" @click="$router.push('/safety/Agreement')">用户协议</span>
                        </div>
                    </template>
                </v-checkbox>
            </div>
            <v-btn color="primary mt-6" style="width:100%;" depressed x-large @click="signIn()" :loading="submitLoading">登录 / 注册</v-btn>

            <v-dialog
                v-model="setPasswordDialog"
                persistent
                max-width="500px"
            >
                <v-card class="pa-6">
                    <div class="text-h4 font-weight-black mb-8">设置新密码</div>
                    <v-text-field v-model="newPassword" outlined placeholder="请输入新密码"></v-text-field>
                    <v-text-field v-model="confirmPassword" outlined placeholder="请确认密码"></v-text-field>
                    <div class="d-flex justify-end">
                        <v-btn color="primary" depressed @click="surePassword()" :loading="setDialogLoading">确定</v-btn>
                    </div>
                </v-card>
            </v-dialog>
        </v-main>
    </v-app>
</template>
<script>
import { passwordLogin, getUserInfo, getSMSCode, SMSCodeLogin, setNewPassword } from '@/api/Session'
export default {
    data(){
        return{
            phone: '',
            password: '',
            code: '',
            signInType: 'code',
            interval: {},
            seconds: 60,

            // 登录按钮的loading
            submitLoading: false,

            // 设置密码弹窗
            setPasswordDialog: false,
            setDialogLoading: false,

            // 密码
            newPassword: '',
            confirmPassword: '',
            
            // 同意协议
            agreement: false
        }
    },
    methods:{

        async dealLoginRequestResult(res){
            localStorage.setItem('token', res.data.token)
            let user = await getUserInfo()
            localStorage.setItem('userInfo', JSON.stringify(user))
            this.$router.replace('/')
        },

        // 登录接口
        async signIn(){
            if(!this.phone) return this.$snackbar("请输入手机号")
            if(!this.agreement) return this.$snackbar("请勾选隐私策略")
            if(this.signInType == 'code'){
                if(!this.code) return this.$snackbar("请输入验证码")
                this.submitLoading = true
                let res = await SMSCodeLogin({phone: this.phone, code: this.code})
                this.submitLoading = false
                if(res.code !== 200){
                    this.$snackbar(res.message || '用户或验证码错误')
                    return false;
                }
                if(res.type == 2){
                    clearInterval(this.interval)
                    this.$snackbar("注册成功")
                    this.setPasswordDialog = true
                }else{
                    await this.dealLoginRequestResult(res)
                }
            }else{
                if(this.phone == ''){
                    this.$snackbar("请输入密码")
                }
                this.submitLoading = true
                let res = await passwordLogin({ phone: this.phone, password: this.password })
                this.submitLoading = false
                if(res.code !== 200){
                    this.$snackbar(res.message || '用户或密码错误')
                    return false;
                }
                await this.dealLoginRequestResult(res)
            }
        },

        // 改变类型
        changeSignInType(){
            this.signInType = this.signInType=='password'?'code':'password'
        },

        // 获取验证码
        async getSMSCode(){
            if(this.seconds != 60) return;
            this.seconds--;
            let res = await getSMSCode({phone: this.phone})
            if(res.code == 200){
                this.$snackbar('发送验证码成功')
            }else{
                clearInterval(this.interval)
                this.seconds = 60
                this.$snackbar('发送验证码失败')
            }
            this.interval = setInterval(() => {
                this.seconds--;
                if(this.seconds < 1){
                    clearInterval(this.interval)
                    this.seconds = 60
                }
            }, 1000);
        },

        // 确定密码事件
        async surePassword(){
            if(this.newPassword != this.confirmPassword) return this.$snackbar('两次密码输入不一致')
            this.setDialogLoading = true
            let data = await setNewPassword({phone: this.phone, password: this.newPassword})
            this.setDialogLoading = false
            if(data.code == 200){
                this.$snackbar("设置密码成功")
                this.dealLoginRequestResult(data)
            }else{
                this.$snackbar(data.message || '设置新密码失败')
            }
        }

    },
    destroyed(){
        clearInterval(this.interval)
    }
}
</script>
<style>
.containers{
    margin: 60px 60px 0 60px !important;
    height: calc( 100vh - 80px );
}
.cursor_pointer{
    cursor: pointer;
}
</style>
