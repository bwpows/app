<template>
    <div>
        <v-card class="pa-6">
            我的关注
            <v-btn color="" @click="showPrompt()">输入框</v-btn><br />
            <v-btn small elevation="" color="" @click="showAlert()">弹出系统提示对话框</v-btn><br />
            <v-btn small elevation="" color="" @click="showConfirm()">弹出提示信息对话框</v-btn><br />
            <v-btn small elevation="" color="" @click="autoCloseWaiting()">自动关闭等待框</v-btn><br />
            
        </v-card>
    </div>
</template>

<script>

export default {
    data() {
        return {
            
        }
    },

    methods: {
        // 弹出输入对话框
        showPrompt(){
            plus.nativeUI.prompt(
                "Input your name: ",
                function(e){
                    console.log(((e.index==0)?"OK: ":"Cancel")+e.value);
                },
                "nativeUI", "your name", ["Cancel","OK"]);
        },

        // 弹出系统提示对话框
        showAlert(){
            plus.nativeUI.alert("Hello HTML5 plus!", function(){
                console.log("User pressed!");
            }, "nativeUI", "OK");
        },

        // 弹出提示信息对话框 (确定，取消)
        showConfirm(){
            plus.nativeUI.confirm("", function(e){
                    console.log("Close confirm: "+e.index);
                },
                {
                    "title":"是否删除此作品？",
                    "buttons":["确定","取消"],
                    "verticalAlign":"center"
                }
            );
        },

        // 弹出系统等待对话框
        showWaiting(){
            plus.nativeUI.showWaiting("等待中...");
        },

        autoCloseWaiting(){
            plus.nativeUI.showWaiting( "等待中..." );
            setTimeout(function(){
                plus.nativeUI.closeWaiting();
            }, 5000);
        }



    },

}

</script>