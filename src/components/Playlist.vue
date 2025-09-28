<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div class="chart__header">
          <div class="chart__button">
            <h1 class="chart__title">Playlists que você vai amar</h1>
            <button @click="viewAllInfos">Visualizar tudo</button>
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
  props: {
    carouselId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      playlists: [],
      navigationReady: false,
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getPlaylist().then(() => {
      this.$nextTick(() => {
        this.navigationReady = true
      })
    })
  },
  methods: {
    async getPlaylist() {
      try {
        const response = await fetch("/api/deezer/chart/0/playlists")
        const data = await response.json()
        this.playlists = data.data
      } catch (error) {
        console.error("Erro ao buscar as playlists.", error)
      }
    },
    viewAllInfos() {
      this.$router.push({ name: "AllPlaylists" })
    },
  },
}
</script>