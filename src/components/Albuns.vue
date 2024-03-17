<template>
  <div class="album">
    <div class="album__text">
      <h1 class="album__title">Álbuns</h1>
      <p class="album__subtitle">
        Escolha o álbum que você mais curta e se divirta!
      </p>
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
          <div class="album__content">
            <img
              class="album__img"
              :src="album.cover_medium"
              :alt="album.title"
            />
            <p class="album__name">{{ album.title }}</p>
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
@import "../assets/scss/styles/albuns.scss";
</style>