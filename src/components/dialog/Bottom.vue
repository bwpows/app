<template>

<v-bottom-sheet inset v-model="value">
    <v-sheet class="rounded-t-lg px-6" height="75vh">
        <div v-if="value">
            <div class="d-flex justify-center py-4" @touchstart="touchStartEvent" @touchmove="touchMoveEvent">
                <div style="width: 70px; height: 6px;" class="rounded-xl grey"></div>
            </div>
            <div v-if="data.url.length == 0"></div>
            <v-carousel
                v-else-if="data.url.length > 1"
                delimiter-icon="mdi-minus"
                hide-delimiter-background
                height="240"
                class="rounded-lg"
                style="overflow: hidden;"
            >
                <v-carousel-item
                    v-for="(item, i) in data.url"
                    :key="i"
                    :src="baseURL + item"
                    :show-arrows="false"
                    reverse-transition="fade-transition"
                    transition="fade-transition"
                ></v-carousel-item>
            </v-carousel>
            <v-img
                v-else
                :src="baseURL + data.url[0]"
                style="width: 100%"
                height="200"
                class="rounded-lg"
            ></v-img>
            <div class="my-6 mb-4 text-h4 font-weight-black">{{ data.title }}</div>
            <div> {{ data.description }} </div>
        </div>
    </v-sheet>
</v-bottom-sheet>

</template>

<script>

export default {

    name: 'BottomDialog',

    props: {
        value: {
            type: Boolean,
            default: false
        },
        data: {
            type: Object
        }
    },

    data() {
        return {
            
        }
    },
}

</script>