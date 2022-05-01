<template>
    <div>
        <v-card class="px-6 py-3 mb-5">
            <input type="tel" oninput="value=value.replace(/[^\d\.]/g,'')" placeholder="请输入收入金额" v-model="recharge.number" maxLength="15" style="border: none; width: 100%; height: 40px;" :class="$vuetify.theme.dark?'white--text':''" class="body-1" />
        </v-card>
        <v-card class="px-6 py-4 mb-5">
            <div class="grey--text">
                请选择收入类型
            </div>
        </v-card>
    </div>
</template>
<script>

export default {
    data() {
        return {
            recharge: {}
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