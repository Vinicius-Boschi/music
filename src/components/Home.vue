<template>
  <Sidebar />
  <Gender />
  <Chart />
</template>

<script>
import Sidebar from "./Sidebar.vue"
import Gender from "./Gender.vue"
import Chart from "./Chart.vue"

export default {
  name: "Home",
  components: {
    Sidebar,
    Gender,
    Chart,
  },
}
</script>

<style>
@import "../assets/scss/variables.scss";
</style>