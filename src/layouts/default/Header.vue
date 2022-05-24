<template>
    <v-app-bar app fixed elevation="0" class="headerBG">
        <div class="d-flex align-center justify-space-between" style="width: 100vw; height: 100%;" @click="backToTop">
            <v-btn color="primary" icon x-large>
                <v-icon>mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-img src="@/assets/icon/add.svg" height="24" maxWidth="24" contain @click.stop="openAddDialog()"></v-img>
        </div>
    </v-app-bar>
</template>
<script>

export default {
    name: 'DefaultHeader',

    data:() => ({
        drawer: false,
        lastClickTime: 0
    }),

    methods: {

        // 返回顶部
        backToTop(){
            if(new Date().getTime() - this.lastClickTime < 400){
                this.lastClickTime = 0
                document.getElementById('app').scrollTo({
                    top: 0,
                    left: 0,
                    behavior: 'smooth'
                });
            }else{
                this.lastClickTime = new Date().getTime();
            }
        },

        // 打开发布按钮
        openAddDialog(){
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
                            that.$router.push('/task/add')
                        }
                    }
                );
            }else{
                this.$router.push('/task/add')
            }
        }
    },
}
</script>