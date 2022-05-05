<template>
    <v-card class="px-6 py-5 rounded-lg">
        我的消息
        <!-- <v-btn color="primary" depressed @click="testSocket()">测试</v-btn> -->
            <!-- <v-btn color="primary" @click="changeList()">改变</v-btn>
        <div>
            <v-btn color="primary" v-for="item in list" :key="item" class="ma-5">{{item}}</v-btn>
        </div> -->
    </v-card>
</template>

<script>
// import socket from "../../plugins/socket"

export default {

    data(){
        return {
            offsetTop: 0,
            list: [1,2,4]
        }
    },

    methods: {},

}

</script>