<template>
    <v-app id="app" style="max-height: 100vh; overflow: hidden;">
        <v-main class="headerBG">
            <div style="padding: 60px; padding-bottom: 0px;">
                <v-img src="@/assets/logo.svg" height="100" contain></v-img>
                <h1 class="text-h2 mt-6 text-center primary--text font-weight-regular">欢迎</h1>
                <div class="mb-6 mt-4 grey--text text-center">没有账号将自动为您创建账号</div>
                <v-text-field type="tel" outlined class="mb-0" maxlength="11" counter v-model="phone" color="primary" placeholder="请输入手机号"></v-text-field>
                <v-text-field v-if="signInType != 'code'" type="password" placeholder="请输入密码" outlined class="mb-0" v-model="password" color="primary"></v-text-field>
                <div v-else style="position: relative;">
                    <v-text-field type="tel" placeholder="请输入验证码" maxlength="6" outlined class="mb-0" v-model="code" color="primary"></v-text-field>
                    <v-btn text @click="getSMSCode()" x-small class="body-2 primary--text cursor_pointer" style="position: absolute; right: 5px; top:15px;" :disabled='seconds != 60'>
                        {{seconds == 60?'获取验证码':seconds+'s '+'后再次获取'}}
                    </v-btn>
                </div>

                <div class="body-2 primary--text cursor_pointer mb-3">
                    <span @click="changeSignInType()">{{ signInType == 'code'?'使用密码登录':'使用验证码 登录/注册' }}</span>
                </div>

                <div class="body-2 d-flex align-center" style="position: absolute; bottom: 20px;">
                    <v-checkbox v-model="agreement" dense>
                        <template v-slot:label>
                            <div class="caption">
                                我已同意并阅读
                                <span class="primary--text mr-1" @click="$router.push('/safety/privacy')">用户协议和隐私策略</span>
                            </div>
                        </template>
                    </v-checkbox>
                </div>

                <v-btn color="primary mt-6" style="width:100%;" depressed x-large @click="signIn()" :loading="submitLoading">登录 / 注册</v-btn>
            </div>

            <v-dialog v-model="setPasswordDialog" persistent max-width="500px">
                <v-card class="pa-6">
                    <div class="text-h4 font-weight-black mb-8">设置新密码</div>
                    <v-text-field v-model="newPassword" outlined placeholder="请输入新密码"></v-text-field>
                    <v-text-field v-model="confirmPassword" outlined placeholder="请确认密码"></v-text-field>
                    <div class="d-flex justify-end">
                        <v-btn color="primary" depressed @click="surePassword()" :loading="setDialogLoading">确定</v-btn>
                    </div>
                </v-card>
            </v-dialog>

            <confirm-dialog title="服务协议和隐藏政策提示" :value="agreementDialog" @close="agreementDialog = false" :closeBtn="false" confirmText="同意并继续" @confirm="sureAgreement()">
                <template>
                    <div class="body-2">
                        感谢您使用 bwpow。为了保护您的个人信息安全，我们将依据 bwpow 的 <span class="primary--text mr-1" @click="$router.push('/safety/privacy')">《隐私策略》和《用户协议》</span> 来帮助您了解：我们如何收集个人信息，如何使用及存储个人信息，以及您享有的相关权利。<br /> <br />
                        在您使用 bwpow 的服务前，请务必阅读 <span class="primary--text mr-1" @click="$router.push('/safety/privacy')">《隐私策略》和《用户协议》</span> 以了解详细内容。如您同意，请点击“同意并继续”并开始使用我们的服务。
                    </div>
                </template>
            </confirm-dialog>
        </v-main>
    </v-app>
</template>
<script>

import { passwordLogin, getUserInfo as getProfile, getSMSCode, SMSCodeLogin, setNewPassword } from '@/api/Session'
import {getUserInfo} from "@/api/Account";
export default {
    data(){
        return{
            aweixin: null,
            auths: {},
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
            agreement: false,

            // 协议弹窗
            agreementDialog: false
        }
    },

    methods:{

        async dealLoginRequestResult(res){
            // 存储token
            localStorage.setItem('token', res.data.token)

            // 存储jwt的用户信息
            let user = await getProfile()
            localStorage.setItem('userInfo', JSON.stringify(user))

            // 存储个人信息
            let resUser = await getUserInfo(user.userId)
            localStorage.setItem('user', JSON.stringify(resUser.data))


            await this.$router.replace('/')
        },

        // 登录接口
        async signIn(){
            if(!this.phone) return this.$snackbar("请输入手机号")
            if(!this.agreement) {
                this.agreementDialog = true
                return;
            }
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
                this.interval = setInterval(() => {
                    this.seconds--;
                    if(this.seconds < 1){
                        clearInterval(this.interval)
                        this.seconds = 60
                    }
                }, 1000);
            }else{
                clearInterval(this.interval)
                this.seconds = 60
                this.$snackbar('发送验证码失败')
            }
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
        },

        // 同意协议
        sureAgreement(){
            this.agreement = true
            this.agreementDialog = false
            this.signIn()
        }

    },
    destroyed(){
        clearInterval(this.interval)
    }
}
</script>
<style>
.containers{
    height: 100vh;
    max-height: 100vh;
    /* padding: 60px 60px 0 60px !important; */
    /* height: calc( 100vh - 880px ); */
}
.cursor_pointer{
    cursor: pointer;
}
</style>
