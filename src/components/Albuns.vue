<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div>
          <h1 class="chart__title">Álbuns</h1>
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
  data() {
    return {
      albuns: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getAlbuns()
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
