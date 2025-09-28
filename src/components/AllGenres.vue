<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div class="page__title">
        <h1>Todos os Canais</h1>
      </div>
      <div class="page__container">
        <div
          class="page__content background"
          :style="{ backgroundColor: getColors(genre.title) }"
          v-for="(genre, index) in genres"
          :key="index"
        >
          <router-link :to="{ name: 'DetailsGenre', params: { id: genre.id } }">
            <p class="page__name center">{{ genre.title }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { getGenreColor } from "../untils/getGenreColor.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "AllGenres",
  data() {
    return {
      genres: [],
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
        const response = await fetch("/api/deezer/radio/top")
        const data = await response.json()
        this.genres = data.data
      } catch (error) {
        console.error(error)
      }
    },
    getColors(genre) {
      return getGenreColor(genre)
    },
  },
}
</script>