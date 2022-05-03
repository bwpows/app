<template>
    <v-card class="px-6 pa-2 rounded-lg">
        <div class="d-flex align-center justify-space-between my-4">
            <div>夜间模式</div>
            <v-switch inset v-model="darkAuto" class="mt-0" @change="changeTheme()" hide-details></v-switch>
        </div>
        <v-divider></v-divider>
        <div class="d-flex align-center justify-space-between my-4">
            <div>显示隐藏作品</div>
            <v-switch inset v-model="showPrivacy" class="mt-0" @change="changePrivacy()" hide-details></v-switch>
        </div>
    </v-card>
</template>

<script>

export default {
    data() {
        return {
            darkAuto: null,
            showPrivacy: JSON.parse(localStorage.getItem('showPrivacy')) || false
        }
    },

    created() {
        this.darkAuto = localStorage.getItem('darkAuto') == 'true'
    },

    methods: {
        changeTheme(){
            if(window.plus){
                if(!this.darkAuto){
                    plus.nativeUI.setUIStyle('light');
                    plus.navigator.setStatusBarStyle('dark');
                    plus.navigator.setStatusBarBackground('#ffffff')
                }else{
                    plus.nativeUI.setUIStyle('dark');
                    plus.navigator.setStatusBarStyle('light');
                    plus.navigator.setStatusBarBackground('#121212')
                }
            }
            this.$vuetify.theme.dark = this.darkAuto
            localStorage.setItem('darkAuto', this.darkAuto)
        },

        // 修改相册隐藏
        changePrivacy(){
            localStorage.setItem('showPrivacy', this.showPrivacy)
        }

    },
}

</script>