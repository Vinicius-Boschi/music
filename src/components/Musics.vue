<template>
  <div class="chart">
    <div class="chart__text">
      <h1 class="chart__title">Músicas</h1>
      <p class="chart__subtitle">Escolha uma música e se divirta.</p>
    </div>
    <swiper
      :navigation="true"
      :slidesPerView="6"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(music, index) in musics" :key="index">
        <div class="chart__content">
          <div class="chart__content__item">
            <router-link
              :to="{ name: 'DetailsTrack', params: { id: music.id } }"
            >
              <img
                class="chart__img music"
                :src="music.album.cover_medium"
                :alt="music.title"
              />
            </router-link>
            <p class="chart__name">{{ music.title }}</p>
          </div>
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
  name: "Chart",
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

.music {
  border-radius: 5px;
}
</style>