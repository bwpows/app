<template>
    <div>
        <v-skeleton-loader v-for="item in 2" :key="item" class="mb-8" type="image, article"></v-skeleton-loader>
    </div>
</template>
<script>

export default {
    name: 'WorkListLoading'
}

</script>