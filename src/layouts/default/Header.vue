<template>
    <v-app-bar app fixed elevation="0" class="headerBG">
        <div class="d-flex align-center justify-space-between" style="width: 100vw;">
            <v-btn color="primary" icon x-large>
                <v-icon @click="drawer = true">mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-img src="@/assets/icon/add.svg" height="24" maxWidth="24" contain @click="openAddDialog()"></v-img>
        </div>
    </v-app-bar>
</template>
<script>

export default {
    name: 'DefaultHeader',

    data:() => ({
        drawer: false
    }),

    methods: {
        openAddDialog(){
            // plus.nativeUI.setUIStyle('dark');
            if(window.plus){
                let that = this;
                plus.nativeUI.actionSheet(
                    {
                        cancel:"取消",
                        buttons:[
                            {
                                title:"发布作品"
                            },
                            {
                                title: "创建任务"
                            }
                        ]
                    },
                    function(e){
                        if(e.index == 1){
                            that.$router.push('/publish')
                        }else if(e.index == 2){
                            that.$router.push('/addTask')
                        }
                    }
                );
            }else{
                this.$router.push('/publish')
            }
        }
    },
}
</script>