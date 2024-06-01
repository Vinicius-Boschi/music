<template>
  <div class="chart">
    <div class="chart__text">
      <h1 class="chart__title">Radio</h1>
      <p class="chart__subtitle">Escolha uma rádio.</p>
    </div>
    <swiper
      :navigation="true"
      :slidesPerView="6"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(radio, index) in radios" :key="index">
        <div class="chart__content">
          <div class="chart__content__item">
            <router-link
              :to="{ name: 'DetailsRadio', params: { id: radio.id } }"
            >
              <img
                class="chart__img"
                :src="radio.picture_medium"
                :alt="radio.title"
              />
            </router-link>
            <p class="chart__name">{{ radio.title }}</p>
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
  name: "Radio",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      radios: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getRadio()
  },
  methods: {
    async getRadio() {
      try {
        const response = await fetch("http://localhost:3000/radio")
        const data = await response.json()
        this.radios = data.data
      } catch (error) {
        console.error("Erro ao buscar a rádio.", error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/chart.scss";
</style>