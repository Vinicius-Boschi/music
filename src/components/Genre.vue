<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div class="chart__header">
          <div class="chart__button">
            <h1 class="chart__title">Top gêneros músicais</h1>
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
          <swiper-slide v-for="(genre, index) in genres" :key="index">
            <div class="chart__content">
              <div
                class="chart__content__item background"
                :style="{ backgroundColor: genre.color }"
              >
                <router-link
                  :to="{ name: 'DetailsGenre', params: { id: genre.id } }"
                >
                  <p class="chart__name center white">{{ genre.name }}</p>
                </router-link>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import { getRandomGenreColor } from "../untils/getGenreColor.js"
import { API_BASE } from "../services/api.js"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

export default {
  name: "Genres",
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
      genres: [],
      navigationReady: false,
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getGenre().then(() => {
      this.$nextTick(() => {
        this.navigationReady = true
      })
    })
  },
  methods: {
    async getGenre() {
      try {
        const response = await fetch(`${API_BASE}/deezer/genre`)
        const data = await response.json()
        this.genres = data.data.map((genre) => ({
          ...genre,
          color: getRandomGenreColor(),
        }))
      } catch (error) {
        console.error("Erro ao buscar os gêneros.", error)
      }
    },
    viewAllInfos() {
      this.$router.push({ name: "AllGenres" })
    },
  },
}
</script>

<style lang="scss" scoped>
.background {
  border-radius: 0.5rem;
  color: white;
  height: 5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
</style>