<template>
    <v-app-bar app fixed elevation="0">
        <div class=" d-flex align-center justify-space-between" style="width: 100vw;">
            <v-btn color="primary" icon x-large>
                <v-icon @click="drawer = true">mdi-format-list-bulleted</v-icon>
            </v-btn>
            <v-img src="@/assets/user.svg" height="35" maxWidth="35" contain></v-img>
        </div>
    </v-app-bar>
</template>
<script>

export default {
    name: 'DefaultHeader',

    data:() => ({
        drawer: false
    })
}
</script>