<template>
  <Header />
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div class="chart__header">
          <div class="chart__button">
            <h1 class="chart__title">Artistas</h1>
            <button>Visualizar tudo</button>
          </div>
          <div class="chart__navigation">
            <div class="swiper-button-prev"></div>
            <div class="swiper-button-next"></div>
          </div>
        </div>
        <swiper
          :navigation="{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }"
          :slidesPerView="5"
          :spaceBetween="20"
          :modules="modules"
          class="chart__swiper"
        >
          <swiper-slide v-for="(chart, index) in charts" :key="index">
            <div class="chart__content">
              <div class="chart__content__item">
                <router-link
                  :to="{ name: 'Details', params: { id: chart.artist.id } }"
                >
                  <img
                    class="chart__img rounded"
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
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/navigation"

export default {
  name: "Chart",
  components: {
    Header,
    Swiper,
    SwiperSlide,
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