<template>
    <v-dialog
        v-model="value"
        persistent
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card class="pa-6">
            <div class="d-flex justify-space-between">
                <div v-html="title" class="text-h4 font-weight-bold text-truncate"></div>
                <v-icon size="24" @click="$emit('close')">mdi-close</v-icon>
            </div>
            <div v-html="content" class="my-5"></div>
            <div class="d-flex justify-end mt-6">
                <v-btn color="primary" small outlined depressed class="mr-8" @click="$emit('close')">取消</v-btn>
                <v-btn color="primary" small depressed @click="$emit('confirm')">确定</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
    export default {
        name: 'ConfirmDialog',

        props: {
            value: {
                type: Boolean,
                default: false
            },

            title: {
                type: String
            },

            content: {
                type: String,
            }
        },

        data(){
            return {

            }
        }
    }
</script>