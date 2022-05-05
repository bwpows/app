<template>
    <div>
        <v-card v-for="item in detailsData" :key="item._id" class="pa-5 mb-5 rounded-lg d-flex justify-space-between align-center">
            <div class="">
                <div>{{ item.typeInfo[0].name }}</div>
                <div class="grey--text body-2 mt-1">{{ formatTime(item.created_time, 'MM-dd HH:mm') }}</div>
            </div>
            <div :class="item.typeInfo[0].type == 1?'primary--text':''" class="text-h4 font-weight-regular d-flex">
                {{ item.typeInfo[0].type == 1?'+':'-' }} {{ (item.amount) }}
            </div>
        </v-card>
    </div>
</template>
<script>
import { getCardDetails } from '../../api/Card'
import { formatTime } from '../../util/formatTime'

export default{
    data() {
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            detailsData: []
        }
    },

    mounted() {
        this.fetch()
    },

    methods: {
        formatTime,

        async fetch(){
            let obj = {
                user_id: this.userInfo.userId
            }
            let res = await getCardDetails(obj)
            console.log(res)
            if(res.code == 200){
                this.detailsData = res.data || []
            }
        }
    },

}

</script>