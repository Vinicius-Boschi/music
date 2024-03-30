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
</template>

<script>
import Sidebar from "./Sidebar.vue";
import Gender from "./Gender.vue";
import Chart from "./Chart.vue";
import Albuns from "./Albuns.vue";
import Playlist from "./Playlist.vue";

export default {
  name: "Home",
  components: {
    Sidebar,
    Gender,
    Chart,
    Albuns,
    Playlist,
  },
};
</script>

<style>
@import "../assets/scss/variables.scss";

.container {
  display: flex;
  align-items: flex-start;
}

.content {
  width: 100% !important;
  height: 100vh;
  overflow-x: hidden;
}

.mySwiper {
  margin: 2rem;
}
</style>