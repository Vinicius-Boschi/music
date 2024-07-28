<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div>
          <h1 class="chart__title">Músicas</h1>
        </div>
        <div class="chart__button">
          <button>Visualizar tudo</button>
        </div>
      </div>
    </div>
    <swiper
      :navigation="true"
      :slidesPerView="5"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(music, index) in musics" :key="index">
        <div class="chart__content">
          <router-link :to="{ name: 'DetailsTrack', params: { id: music.id } }">
            <img
              class="chart__img"
              :src="music.album.cover_medium"
              :alt="music.title"
            />
          </router-link>
          <p class="chart__name">{{ music.title }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/navigation"

export default {
  name: "Musics",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      musics: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getMusics()
  },
  methods: {
    async getMusics() {
      try {
        const response = await fetch("http://localhost:3000/chart/0/tracks")
        const data = await response.json()
        this.musics = data.data
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