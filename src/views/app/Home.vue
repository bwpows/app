<template>
    <div>
        <work-list-loading v-if="loading" />
        <v-card class="pa-4">
            <div class="font-weight-bold">
                今日任务
            </div>
        </v-card>
        <v-card class="pa-4 my-6">
            <div class="font-weight-bold">
                明日任务
            </div>
        </v-card>
        <v-card class="pa-4 my-6">
            <div class="font-weight-bold">
                本周任务
            </div>
        </v-card>
        <v-card class="pa-4 my-6">
            <div class="font-weight-bold">
                当月任务
            </div>
        </v-card>
        <v-card class="pa-4 my-6">
            <div class="font-weight-bold">
                今年任务
            </div>
        </v-card>
    </div>
</template>
<script>


export default {
    data(){
        return{
            blogList: [],
            userId: JSON.parse(localStorage.getItem('userInfo')).userId,
            bottomSheetData: {},
            loading: true
        }
    },

    async mounted(){
        await this.fetch()
    },

    methods: {
        async fetch(){
            this.loading = false
        }
    }
}
</script>
