<template>
  <div class="container">
    <Sidebar />
    <div class="content">
      <Gender />
      <Chart />
      <Albuns />
      <Playlist />
    </div>
  </div>
  <Footer />
</template>

<script>
import Sidebar from "./Sidebar.vue"
import Gender from "./Gender.vue"
import Chart from "./Chart.vue"
import Albuns from "./Albuns.vue"
import Playlist from "./Playlist.vue"
import Footer from "./Footer.vue"

export default {
  name: "Home",
  components: {
    Sidebar,
    Gender,
    Chart,
    Albuns,
    Playlist,
    Footer
  },
}
</script>

<style>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/home.scss";
</style>