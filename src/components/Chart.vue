<template>
  <div class="chart">
    <div class="chart__text">
      <h1 class="chart__title">Artistas</h1>
      <p class="chart__subtitle">Escolha um artista e de play no seu dia.</p>
    </div>
    <swiper
      :navigation="true"
      :slidesPerView="6"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(chart, index) in charts" :key="index">
        <div class="chart__content">
          <div class="chart__content__item">
            <router-link
              :to="{ name: 'Details', params: { id: chart.artist.id } }"
            >
              <img
                class="chart__img"
                :src="chart.artist.picture_medium"
                :alt="chart.artist.name"
              />
            </router-link>
            <p class="chart__name">{{ chart.artist.name }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import ArtistDetail from "./Details.vue"
import "swiper/scss"
import "swiper/scss/navigation"

export default {
  name: "Chart",
  components: {
    Swiper,
    SwiperSlide,
    ArtistDetail,
  },
  data() {
    return {
      charts: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getChart()
  },
  methods: {
    async getChart() {
      try {
        const response = await fetch("http://localhost:3000/chart")
        const data = await response.json()
        this.charts = data.tracks.data
      } catch (error) {
        console.error("Erro ao buscar os charts.", error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/chart.scss";
</style>