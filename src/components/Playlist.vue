<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div>
          <h1 class="chart__title">Playlists que você vai amar</h1>
        </div>
        <div class="chart__button">
          <button @click="viewAllInfos">Vizualizar tudo</button>
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
        <swiper-slide v-for="(playlist, index) in playlists" :key="index">
          <div class="chart__content">
            <router-link
              :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
            >
              <img
                class="chart__img"
                :src="playlist.picture_medium"
                :alt="playlist.title"
              />
            </router-link>
            <p class="chart__name">{{ playlist.title }}</p>
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
    viewAllInfos() {
      this.$router.push({ name: "AllPlaylists" })
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/chart.scss";
</style>