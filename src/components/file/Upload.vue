<template>
    <div>
        <div class="d-flex flex-wrap">
            <div class="d-flex flex-wrap align-center" style="width: 100%;">
                <template v-for="(item, index) in urlList">
                    <div style="width: 33%;" v-if="item" :key="index">
                        <v-img :src="item" class="text-end rounded ma-1" height="100" cover max-width="100%">
                            <v-icon color="white" size="20" class="mr-1" @click="delImg(index)">mdi-close</v-icon>
                        </v-img>
                    </div>
                </template>
            <v-img :src="uploadIcon" height="90" contain max-width="33%" @click="selectFile()"></v-img>
            </div>
        </div>
        <input type="file" style="display: none;" :multiple="multiple" :accept="accept" ref="uploadInput" @change="uploadFile()" />
    </div>
</template>
<script>
import uploadIcon from '@/assets/common/upload.svg'
export default {
    name: 'FileUpload',

    props: {
        accept: {
            type: String,
            default: 'image/*'
        },
        multiple: {
            type: Boolean,
            default: true
        }
    },

    data(){
        return {
            uploadIcon,
            urlList: [],
            files: []
        }
    },

    methods: {

        selectFile(){
            this.$refs.uploadInput.click()
        },

        uploadFile(){
            this.files = this.$refs.uploadInput.files
            this.urlList = []
            for (let i = 0; i < this.files.length; i++) {
                let url = this.getObjectURL(this.files[i])
                this.urlList.push(url)
            }
            this.$emit('upload', this.files, [])
        },

        getObjectURL(file) {
            var url = null ;
            if (window.createObjectURL!=undefined) { // basic
                url = window.createObjectURL(file) ;
            } else if (window.URL!=undefined) { // mozilla(firefox)
                url = window.URL.createObjectURL(file) ;
            } else if (window.webkitURL!=undefined) { // webkit or chrome
                url = window.webkitURL.createObjectURL(file) ;
            }
            return url ;
        },

        delImg(index) {
            this.urlList.splice(index, 1, null)
            let delArr = []
            for (let j = 0; j < this.urlList.length; j++) {
                if(!this.urlList[j]){
                    delArr.push(j)
                }
            }
            this.$emit('upload', this.files, delArr)
            // this.uploadFile()
        }


    },
}
</script>