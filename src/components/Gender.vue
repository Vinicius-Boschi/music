<template>
  <div class="gender">
    <div class="gender__text">
      <h1 class="gender__title">Flow: toque oque você sente</h1>
      <p class="gender__subtitle">
        Escolha o gênero que mais combina com você.
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
        <swiper-slide v-for="(genre, index) in genres" :key="index">
          <div class="gender__content">
            <img
              class="gender__img"
              :src="genre.picture_medium"
              :alt="genre.name"
            />
            <p class="gender__name">{{ genre.name }}</p>
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
  name: "Gender",
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      genres: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getGenres()
  },
  methods: {
    async getGenres() {
      try {
        const response = await fetch("http://localhost:3000/genre")
        const data = await response.json()
        this.genres = data.data
      } catch (error) {
        console.log("Erro ao buscar os gêneros", error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/gender.scss";

.swiper {
  width: 65%;
  height: 100%;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper-button-next:after,
.swiper-button-prev:after {
  font-size: 30px;
}
</style>