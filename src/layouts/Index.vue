<template>
    <v-app>
        <default-header v-if="this.$route.meta.level == 1" />
        <level-header v-else-if="this.$route.meta.level == 2" />
        <v-main class="ma-6">
            <router-view :key="$route.path" />
        </v-main>
        <default-footer v-if="this.$route.meta.level == 1" />
        <other-snackbar />
    </v-app>
</template>

<script>
import LevelHeader from './level/Header.vue'
import DefaultHeader from './default/Header.vue'
import DefaultFooter from './default/Footer.vue'
import OtherSnackbar from './other/Snackbar.vue'

export default {
    created() {
        console.log(this.$route.meta.level)
    },
    components: {
        LevelHeader, DefaultHeader, DefaultFooter, OtherSnackbar
    }
}

</script>
