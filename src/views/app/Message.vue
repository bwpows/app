<template>
    <v-card class="pa-6">
        我的消息
        <!-- <v-btn color="primary" depressed @click="testSocket()">测试</v-btn> -->
        <div>
            <v-row
                justify="center"
                align="center"
            >
            <!-- <v-subheader>Offset Top</v-subheader> -->
            {{ offsetTop }}
            </v-row>
            <v-container
                id="scroll-target"
                 v-scroll:self="onScroll"
            >
            <div
                align="center"
                justify="center"
                style="height: 1000px"
            >
            </div>
            </v-container>
        </div>
    </v-card>
</template>

<script>
import socket from "../../plugins/socket"

export default {

    data(){
        return {
            offsetTop: 0,
        }
    },

    methods: {
        onScroll (e) {
            this.offsetTop = e.target.scrollTop
        },
        testSocket(){
            socket.emit('receiveMessage', {sender: '6234877ff644ec4b1024aa25', message: 'test', receiver: '622e1483c830ff17b2301884'})
        }
    },

}

</script>