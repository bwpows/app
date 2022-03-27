<template>
    <v-dialog v-model="value" persistent max-width="450px" transition="dialog-transition" overlay-opacity="0.8">
        <v-card class="pa-6" color="delDialog">
            <div class="d-flex align-center justify-space-between">
                <div class="text-h4 font-weight-bold text-truncate">{{ title }}</div>
                <v-icon size="24" @click="$emit('close')">mdi-close</v-icon>
            </div>
            <div v-html="content" class="mt-4"></div>
            <div class="d-flex justify-end mt-5">
                <v-btn color="error" depressed outlined class="mr-8" small @click="$emit('close')" :disabled="loading">取消</v-btn>
                <v-btn color="error" depressed small @click="$emit('delEvent')" :loading="loading">删除</v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>
<script>
export default {
    name: "DeleteDialog",

    props: {
        value: {
            type: Boolean,
            default: false
        },
        title: {
            type: String,
        },
        content: {
            type: String
        },
        loading: {
            type: Boolean,
            default: false
        }
    },

}
</script>