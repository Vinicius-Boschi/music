<template>
  <Header />
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div class="chart__header">
          <div class="chart__button">
            <h1 class="chart__title">Artistas</h1>
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
          <swiper-slide v-for="(chart, index) in charts" :key="index">
            <div class="chart__content">
              <div class="chart__content__item">
                <router-link
                  :to="{ name: 'Details', params: { id: chart.artist.id } }"
                >
                  <img
                    class="chart__img rounded"
                    :src="chart.artist.picture_medium"
                    :alt="chart.artist.name"
                  />
                </router-link>
                <p class="chart__name center">{{ chart.artist.name }}</p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/navigation"

export default {
  name: "Artist",
  components: {
    Header,
    Swiper,
    SwiperSlide,
  },
  props: {
    carouselId: {
      type: String,
      default: () => Math.random().toString(36).substring(2, 9),
    },
  },
  data() {
    return {
      charts: [],
      navigationReady: false,
    }
  },
  computed: {
    navigation() {
      return {
        nextEl: `.swiper-button-next-${this.carouselId}`,
        prevEl: `.swiper-button-prev-${this.carouselId}`,
      }
    },
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getChart().then(() => {
      this.$nextTick(() => {
        this.navigationReady = true
      })
    })
  },
  methods: {
    async getChart() {
      try {
        const response = await fetch("/api/deezer/chart")

        if (!response.ok) {
          throw new Error(`Erro ao buscar os charts: ${response.statusText}`)
        }

        const data = await response.json()
        this.charts = this.removeDuplicateArtists(data.tracks.data)
      } catch (error) {
        console.error("Erro ao buscar os charts.", error)
      }
    },
    removeDuplicateArtists(tracks) {
      const seen = new Set()
      return tracks.filter((track) => {
        const name = track.artist.name.toLowerCase()
        if (seen.has(name)) return false
        seen.add(name)
        return true
      })
    },
    viewAllInfos() {
      this.$router.push({ name: "AllArtists" })
    },
  },
}
</script>