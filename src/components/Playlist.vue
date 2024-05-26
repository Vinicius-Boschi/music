<template>
  <div class="carousel">
    <div class="carousel__text">
      <h1 class="carousel__title">Playlist</h1>
      <p class="carousel__subtitle">
        Escolha a playlist que você mais curta e se divirta!
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
        <swiper-slide v-for="(playlist, index) in playlists" :key="index">
          <div class="carousel__content">
            <router-link
              :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
            >
              <img
                class="carousel__img"
                :src="playlist.picture_medium"
                :alt="playlist.title"
              />
            </router-link>
            <p class="carousel__name">{{ playlist.title }}</p>
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
  name: "Playlist",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      playlists: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getPlaylist()
  },
  methods: {
    async getPlaylist() {
      try {
        const response = await fetch("http://localhost:3000/chart/0/playlists")
        const data = await response.json()
        this.playlists = data.data
      } catch (error) {
        console.error("Erro ao buscar os álbuns.", error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/carousel.scss";
</style>