<template>

<div></div>

</template>

<script>

export default {
    name: 'ScrollEvent',

    mounted() {
        this.$nextTick(() => {
            document.getElementById('app').addEventListener('scroll', function(){
                console.log()
            })
        })
    },
}

</script>