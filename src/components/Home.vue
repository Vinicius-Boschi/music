<template>
    <Sidebar />
</template>

<script>
import Sidebar from './Sidebar.vue'
export default {
    name: 'Home',
    data() {
        return {
            message: 'Hello Vue!'
        }
    },
    components: {
        Sidebar
    }
}
</script>

<style>
@import '../assets/scss/variables.scss';
@import '../assets/scss/styles/home.scss';
</style>