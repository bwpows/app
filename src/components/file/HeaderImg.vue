<template>
    <div>
        <div class="d-flex flex-wrap align-center">
            <v-img :src="preview" :height="45" cover class="rounded" :max-width="45" @click="selectFile()"></v-img>
        </div>
        <input type="file" style="display: none;" :accept="accept" ref="uploadInput" @change="uploadFile()" />
    </div>
</template>
<script>
export default {
    name: 'HeadImgFile',

    props: {
        accept: {
            type: String,
            default: 'image/*'
        },
        preview: {
            type: String,
            default: false
        },
    },

    data(){
        return {
            files: []
        }
    },

    methods: {

        selectFile(){
            this.$refs.uploadInput.click()
        },

        uploadFile(){
            this.files = this.$refs.uploadInput.files
            this.$emit('upload', this.files[0])
        },


    },
}
</script>