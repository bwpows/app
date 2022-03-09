<template>
    <v-card class="pa-6">
        <div class="d-flex align-center justify-space-between">
            <div>页面模式跟随系统</div>
            <v-switch inset v-model="darkAuto" class="mt-0" @change="changeTheme()" hide-details></v-switch>
        </div>
    </v-card>
</template>

<script>

export default {
    data() {
        return {
            darkAuto: null
        }
    },

    created() {
        this.darkAuto = localStorage.getItem('darkAuto') == 'true'
    },

    methods: {
        changeTheme(){
            this.$vuetify.theme.dark = this.darkAuto
            localStorage.setItem('darkAuto', this.darkAuto)
        }
    },
}

</script>