<template>
  <Sidebar />
  <div class="content">
    <Artist />
    <Musics />
    <Albuns />
    <Playlist />
    <Podcasts />
    <Genre />
  </div>
  <Footer />
</template>

<script>
import Sidebar from "./Sidebar.vue"
import Artist from "./Artist.vue"
import Musics from "./Musics.vue"
import Albuns from "./Albuns.vue"
import Playlist from "./Playlist.vue"
import Podcasts from "./Podcasts.vue"
import Genre from "./Genre.vue"
import Footer from "./Footer.vue"

export default {
  name: "Home",
  components: {
    Sidebar,
    Artist,
    Musics,
    Albuns,
    Playlist,
    Podcasts,
    Genre,
    Footer,
  },
}
</script>

<style>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/home.scss";
</style>