<template>
    <div>
        <div class="grey--text mb-4">
            消费金额
        </div>

        <v-card class="py-3 mb-6 rounded-lg">
            <input type="tel" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入消费金额" v-model="consumption.amount" maxLength="15" style="border: none; width: 100%; height: 40px;" :class="$vuetify.theme.dark?'white--text':''" class="body-1 px-6" />
        </v-card>

        <div class="grey--text mb-4">
            消费类型
        </div>

        <div class="d-flex justify-space-between flex-wrap">
            <v-card v-for="item in typeList" :key="item.value" style="min-width: 22%;" class="py-4 body-2 text-center mb-5 rounded-lg" :class="consumption.type_id == item._id?'primary--text base_border':'transparent_border'" @click="consumption.type_id = item._id">
                {{ item.name }}
            </v-card>
        </div>

        <v-card class="my-8 pa-1 rounded-lg">
            <v-btn color="primary" width="100%" class="body-1" @click="submit()" text :loading="submitLoading">消费</v-btn>
        </v-card>

    </div>
</template>
<script>
import { addConsumption } from '../../api/Card'
import { getTypeByUser } from '../../api/Type'
export default {
    data() {
        return {
            consumption: {
                type_id: 0
            },
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            typeList: [],
            submitLoading: false
        }
    },

    mounted() {
        this.fetch()
        console.log(this.$route.query)
    },

    methods: {
        async fetch(){
            let res = await getTypeByUser({ type: 2, user_id: this.userInfo.userId, type_id: this.consumption.type_id })
            if(res.code == 200){
                this.typeList = res.data || [];
            }
        },

        async submit(){

            if(!this.consumption.amount){
                return this.$snackbar('请输入金额')
            }

            if(!this.consumption.type_id){
                return this.$snackbar('请选择类型')
            }
            let obj = {
                type_id: this.consumption.type_id,
                amount: this.consumption.amount,
                user_id: this.userInfo.userId,
                card_id: this.$route.query.card_id
            }
            this.submitLoading = true
            let res = await addConsumption(obj)
            this.submitLoading = false;
            if(res.code == 200){
                this.$router.go(-1)
            }else{
                this.$snackbar('新增失败')
            }
        }
    },
}

</script>

<style>
    textarea:focus{
        outline: medium;
    }
    input:focus{
        outline: medium;
    }
    input{
        font-size: 1.05rem;
    }
</style>