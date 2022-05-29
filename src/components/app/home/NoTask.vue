<template>
    <v-card class="pa-4 grey--text animate__animated animate__fadeIn rounded-lg">
        <div>工作很忙吧，但是要提醒一下，别把一些重要的日子和事情给遗忘了哦！</div>
        <div class="text-center mt-5 mb-3">
            <v-btn color="primary" @click="$router.push('/task/add')" depressed>添加任务</v-btn>
        </div>
    </v-card>
</template>
<script>

export default{
    name: 'NoTask'
}

</script>