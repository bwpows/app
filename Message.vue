<template>
    <v-card class="pa-6">
        我的消息
        <v-btn color="primary" depressed @click="testSocket()">测试</v-btn>
    </v-card>
</template>

<script>
import socket from "../../plugins/socket"

export default {

    data(){
        return {
            
        }
    },

    methods: {
        testSocket(){
            socket.emit('receiveMessage', {sender: '6234877ff644ec4b1024aa25', message: 'test', receiver: '622e1483c830ff17b2301884'})
        }
    },

}

</script>