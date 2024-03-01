<template>
  <Header />
  <Gender />
  <Chart />
</template>

<script>
import Header from "./Header.vue"
import Gender from "./Gender.vue"
import Chart from "./Chart.vue"

export default {
  name: "Home",
  components: {
    Header,
    Gender,
    Chart,
  },
}
</script>

<style>
@import "../assets/scss/variables.scss";
</style>