<template>
  <Header />
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div>
          <h1 class="chart__title">Artistas</h1>
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

.swiper {
  width: calc(100% - 80px);
  height: 100%;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
}

.swiper-button-next,
.swiper-button-prev {
  position: absolute;
  top: 50%;
  transform: translateY(-45%);
  z-index: 10;
}
</style>
