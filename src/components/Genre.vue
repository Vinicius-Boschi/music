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
          <div class="chart__content__item">
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
  },
}
</script>

<style></style>