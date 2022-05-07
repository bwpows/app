<template>
    <v-dialog
        v-model="value" persistent :overlay="false"  overlay-opacity="0.85"
        max-width="500px"
        transition="dialog-transition"
        class="rounded-lg"
    >
        <v-card class="pa-6 rounded-lg" color="confirmDialog">
            <div class="d-flex justify-space-between mb-4">
                <div class="text-h5 font-weight-bold">{{ title }}</div>
                <v-icon @click="$emit('close')" v-if="closeBtn">mdi-close</v-icon>
            </div>
            <slot></slot>
        </v-card>
    </v-dialog>
</template>
<script>

export default{
    name: 'BaseDialog',
    props: {
        title: {
            type: String,
            default: '标题'
        },
        value: {
            type: Boolean,
            default: false
        },
        closeBtn: {
            type: Boolean,
            default: true
        }
    }
}

</script>