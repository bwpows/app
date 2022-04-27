<template>
    <v-app-bar app fixed elevation="0" class="headerBG">
        <div class="d-flex align-center justify-space-between" style="width: 100vw;">
            <div style="width: 48px;"></div>
            <!-- <div class="grey--text"></div> -->
            {{$route.meta.title}}
            <v-img src="@/assets/icon/add.svg" height="24" maxWidth="24" contain @click="openAddDialog()" class="mx-3"></v-img>
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