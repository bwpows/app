<template>
    <div>
        <default-header v-if="this.$route.meta.index == 1" />
        <level-header v-else-if="this.$route.meta.index == 2" />
        <v-main class="ma-6" style="padding: 56px 0 60px 0; transition: all 0s">
            <keep-alive>
                <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
        </v-main>
        <default-footer v-if="this.$route.meta.index == 1" />
    </div>
</template>

<script>
import LevelHeader from './level/Header.vue'
import DefaultHeader from './default/Header.vue'
import DefaultFooter from './default/Footer.vue'
import OtherSnackbar from './other/Snackbar.vue'

export default {
    components: {
        LevelHeader, DefaultHeader, DefaultFooter, OtherSnackbar
    }
}

</script>
