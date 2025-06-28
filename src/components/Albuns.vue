<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div class="chart__header">
          <div class="chart__button">
            <h1 class="chart__title">Álbuns</h1>
            <button>Visualizar tudo</button>
          </div>
          <div class="chart__navigation">
            <div
              :class="[
                'swiper-button-prev',
                `swiper-button-prev-${carouselId}`,
              ]"
            ></div>
            <div
              :class="[
                'swiper-button-next',
                `swiper-button-next-${carouselId}`,
              ]"
            ></div>
          </div>
        </div>
        <swiper
          v-if="navigationReady"
          :navigation="{
            nextEl: `.swiper-button-next-${carouselId}`,
            prevEl: `.swiper-button-prev-${carouselId}`,
          }"
          :slidesPerView="5"
          :spaceBetween="20"
          :modules="modules"
          class="chart__swiper"
        >
          <swiper-slide v-for="(album, index) in albuns" :key="index">
            <div class="chart__content">
              <router-link
                :to="{ name: 'DetailsAlbum', params: { id: album.id } }"
              >
                <img
                  class="chart__img"
                  :src="album.cover_medium"
                  :alt="album.title"
                />
              </router-link>
              <p class="chart__name">{{ album.title }}</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"

import "swiper/scss"
import "swiper/scss/navigation"

export default {
  name: "Albuns",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    carouselId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      albuns: [],
      navigationReady: false,
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getAlbuns().then(() => {
      this.$nextTick(() => {
        this.navigationReady = true
      })
    })
  },
  methods: {
    async getAlbuns() {
      try {
        const response = await fetch("http://localhost:3000/chart/0/albums")
        const data = await response.json()
        this.albuns = data.data
      } catch (error) {
        console.error("Erro ao buscar os álbuns.", error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/chart.scss";
</style>