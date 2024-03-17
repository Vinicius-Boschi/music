<template>
  <Header />
  <Gender />
  <Chart />
  <Albuns />
  <Playlist />
</template>

<script>
import Header from "./Header.vue"
import Gender from "./Gender.vue"
import Chart from "./Chart.vue"
import Albuns from "./Albuns.vue"
import Playlist from "./Playlist.vue"

export default {
  name: "Home",
  components: {
    Header,
    Gender,
    Chart,
    Albuns,
    Playlist,
  },
}
</script>

<style>
@import "../assets/scss/variables.scss";
</style>