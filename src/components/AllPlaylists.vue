<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div class="page__title">
        <h1>Playlists que você vai amar</h1>
      </div>
      <div class="page__container">
        <div
          class="page__content"
          v-for="(playlist, index) in playlists"
          :key="index"
        >
          <router-link
            :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
          >
            <img
              class="page__img"
              :src="playlist.picture_medium"
              :alt="playlist.title"
            />
          </router-link>
          <p class="page__name">{{ playlist.title }}</p>
          <p class="page__tracks">{{ playlist.nb_tracks }} faixas</p>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "AllPlaylists",
  data() {
    return {
      playlists: [],
    }
  },
  components: {
    Header,
    Sidebar,
    Footer,
  },
  mounted() {
    this.getAllInfos()
  },
  methods: {
    async getAllInfos() {
      try {
        const response = await fetch(
          "https://api.deezer.com/chart/0/playlists&limit=80"
        )
        const data = await response.json()
        this.playlists = data.data
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/allInfos.scss";
</style>