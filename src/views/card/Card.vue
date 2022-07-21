<template>
<div>
    <!-- bank card -->
    <bank-card />

    <add-bank />

</div>
</template>
<script>
import { getCardByUser } from '../../api/Card.js'
export default {
    data(){
        return {
            userInfo: JSON.parse(localStorage.getItem('userInfo')),
            loading: false
        }
    },
    mounted() {
    },

    methods: {
    },
}

</script>