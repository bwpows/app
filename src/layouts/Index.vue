<template>
    <v-app>
        <Headers />

        <v-main class="ma-3">
            <router-view :key="$route.path" />
        </v-main>


        <Footer />
    </v-app>
</template>

<script>

export default {
    components:{
        Footer: () => import('./Footer.vue'),
        Headers: () => import('./Header.vue')
    },
}

</script>
