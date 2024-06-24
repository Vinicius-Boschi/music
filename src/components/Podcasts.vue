<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div>
          <h1 class="chart__title">Podcasts</h1>
        </div>
        <div class="chart__button">
          <button>Visualizar tudo</button>
        </div>
      </div>
    </div>
    <div>
      <swiper
        :navigation="true"
        :slidesPerView="6"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(podcast, index) in podcasts" :key="index">
          <div class="chart__content">
            <router-link
              :to="{ name: 'DetailsPodcasts', params: { id: podcast.id } }"
            >
              <img
                class="chart__img"
                :src="podcast.picture_medium"
                :alt="podcast.title"
              />
            </router-link>
            <p class="chart__name">{{ podcast.title }}</p>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"

import "swiper/scss"
import "swiper/scss/navigation"

export default {
  name: "Podcasts",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      podcasts: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getPodcasts()
  },
  methods: {
    async getPodcasts() {
      try {
        const response = await fetch("http://localhost:3000/chart/0/podcasts")
        const data = await response.json()
        this.podcasts = data.data
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/chart.scss";
</style>