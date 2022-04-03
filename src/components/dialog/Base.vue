<template>
    <v-dialog
        v-model="value" persistent :overlay="false"  overlay-opacity="0.85"
        max-width="500px"
        transition="dialog-transition"
    >
        <v-card class="pa-6">
            <div class="d-flex justify-space-between mb-4">
                <div class="text-h5 font-weight-bold">{{ title }}</div>
                <v-icon color="" @click="$emit('close')" v-if="closeBtn">mdi-close</v-icon>
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