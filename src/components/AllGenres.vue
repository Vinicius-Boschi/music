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
          :style="{ backgroundColor: genre.color }"
          v-for="(genre, index) in genres"
          :key="index"
        >
          <router-link :to="{ name: 'DetailsGenre', params: { id: genre.id } }">
            <p class="page__name center">{{ genre.name }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { getRandomGenreColor } from "../untils/getGenreColor.js"
import { API_BASE } from "../services/api.js"
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
        const response = await fetch(`${API_BASE}/deezer/genre`)

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`)
        }

        const data = await response.json()

        this.genres = (data?.data || [])
          .filter((genre) => {
            const name = String(genre.name || "")
              .trim()
              .toLowerCase()

            return name !== "todos" && name !== "all"
          })
          .map((genre) => ({
            ...genre,
            color: getRandomGenreColor(),
          }))
      } catch (error) {
        console.error("Erro aos buscar os gêneros", error)
      }
    },
  },
}
</script>