<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div>
          <h1 class="chart__title">Top gêneros músicais</h1>
        </div>
        <div class="chart__button">
          <button @click="viewAllInfos">Visualizar tudo</button>
        </div>
      </div>
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
            :style="{ backgroundColor: getColors(genre.title) }"
          >
            <router-link
              :to="{ name: 'DetailsGenre', params: { id: genre.id } }"
            >
              <p class="chart__name">{{ genre.title }}</p>
            </router-link>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { getGenreColor } from "../untils/getGenreColor.js"
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
        const response = await fetch(
          "http://localhost:3000/radio/top?limit=12"
        )
        const data = await response.json()
        this.genres = data.data
      } catch (error) {
        console.error("Erro ao buscar os gêneros.", error)
      }
    },
    viewAllInfos() {
      this.$router.push({ name: "AllGenres" })
    },
    getColors(genre) {
      return getGenreColor(genre)
    },
  },
}
</script>

<style lang="scss">
.background {
  border-radius: 0.5rem;
  color: white;
  height: 5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.chart__name {
  margin-top: 0;
}
</style>