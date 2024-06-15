<template>
  <div class="chart">
    <div class="chart__text">
      <h1 class="chart__title">Gêneros</h1>
      <p class="chart__subtitle">Escolha um gênero musical.</p>
    </div>
    <swiper
      :navigation="true"
      :slidesPerView="6"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(genre, index) in genres" :key="index">
        <div class="chart__content">
          <div
            class="chart__content__item background"
            :style="{ backgroundColor: getGenreColor(genre.name) }"
          >
            <router-link
              :to="{ name: 'DetailsGenre', params: { id: genre.id } }"
            >
              <p class="chart__name">{{ genre.name }}</p>
            </router-link>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/navigation"

export default {
  name: "Genres",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      genres: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getGenre()
  },
  methods: {
    async getGenre() {
      try {
        const response = await fetch("http://localhost:3000/genre")
        const data = await response.json()
        this.genres = data.data
      } catch (error) {
        console.error("Erro ao buscar os gêneros.", error)
      }
    },
    getGenreColor(genre) {
      const genreColors = {
        "Rap/Funk Brasileiro": "#FF8564",
        Pop: "#3448FC",
        Rock: "#FF3D3D",
        Sertanejo: "#DB452C",
        "Samba/Pagode": "#CC4BCF",
        "Axé/Forró": "#AA3933",
        MPB: "#FFB64D",
        "Música Religiosa": "#A1C4FD",
        Reggae: "#707237",
        Reggaeton: "#90931E",
        "Soul & Funk": "#90931E",
        Blues: "#5896A6",
        Jazz: "#A238FF",
        Clássica: "#AF6E33",
        Folk: "#0A1578",
        Metal: "#950800",
        "Rap/Hip Hop": "#4E0193",
        Dance: "#C03AD1",
        "R&B": "#C01FC3",
        Alternativo: "#4D4F05",
        Electro: "#FF673D",
        "Filmes/Games": "#3448FC",
        Cumbia: "#FCBF49",
        Infantil: "#FF6F61",
        "Música Africana": "#F4A261",
        "Música Indiana": "#E5989B",
        "Música asiática": "#9D8189",
      }
      return genreColors[genre] || "#000000"
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  padding: 1rem;
  border-radius: 0.5rem;
  color: white;
}

.chart__name {
  margin-top: 0;
}
</style>