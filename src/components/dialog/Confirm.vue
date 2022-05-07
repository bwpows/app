<template>
    <v-dialog
        overlay-opacity="0.85"
        v-model="value"
        persistent
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card class="pa-6 rounded-lg" color="confirmDialog">
            <div class="d-flex justify-space-between">
                <div v-html="title" class="text-h4 font-weight-bold text-truncate"></div>
                <v-icon size="24" @click="$emit('close')">mdi-close</v-icon>
            </div>
            <div v-html="content" class="my-5"></div>
            <slot/>
            <div class="d-flex justify-end mt-6">
                <v-btn color="primary" small depressed @click="$emit('confirm')">{{ confirmText  }}</v-btn>
                <v-btn color="primary" small outlined depressed class="ml-8" @click="$emit('close')"> {{ cancelText }} </v-btn>
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
            },

            confirmText: {
                type: String,
                default: '确定'
            },

            cancelText: {
                type: String,
                default: '取消'
            }
        },


        data(){
            return {

            }
        }
    }
</script>