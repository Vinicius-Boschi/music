<template>
  <div class="chart">
    <div class="chart__text">
      <div class="chart__container">
        <div>
          <h1 class="chart__title">Top gêneros músicais</h1>
        </div>
        <div class="chart__button">
          <button>Visualizar tudo</button>
        </div>
      </div>
    </div>
    <swiper
      :navigation="true"
      :slidesPerView="6"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(genre, index) in genres" :key="index">
        <div class="chart__content">
          <div
            class="chart__content__item background"
            :style="{ backgroundColor: getGenreColor(genre.title) }"
          >
            <router-link
              :to="{ name: 'DetailsGenre', params: { id: genre.id } }"
            >
              <p class="chart__name">{{ genre.title }}</p>
            </router-link>
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
  name: "Genres",
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
    this.getGenre()
  },
  methods: {
    async getGenre() {
      try {
        const response = await fetch(
          "http://localhost:3000/radio/top?limit=12"
        )
        const data = await response.json()
        this.genres = data.data
      } catch (error) {
        console.error("Erro ao buscar os gêneros.", error)
      }
    },
    getGenreColor(genre) {
      const genreColors = {
        "Funk": "#FF8564",
        "Pop": "#3448FC",
        "Rock": "#FF3D3D",
        "Sertanejo": "#DB452C",
        "Samba": "#CC4BCF",
        "Axé Forró": "#AA3933",
        "MPB": "#FFB64D",
        "Reggae": "#707237",
        "Reggaeton": "#90931E",
        "Blues": "#5896A6",
        "Jazz": "#A238FF",
        "Clássica": "#AF6E33",
        "Rap americano": "#4E0193",
        "Electronic": "#FF673D",
        "Só sucessos": "#FFD700",
        "Rock Clássico": "#8B0000",
        "Anos 80": "#00FFFF",
        "Gospel": "#87CEEB",
        "Anos 2000": "#C0C0C0",
        "Pop Rock": "#FF69B4",
        "Bossa Nova": "#98FB98",
        "Anos 90": "#39FF14",
        "Rock & Roll": "#2F4F4F",
        "Anos 70": "#FF4500",
        "Dia chuvoso": "#708090",
        "Tarde Acústica": "#D5A2AB",
        "Na Bad": "#2C3E50",
        "Deep House": "#1E90FF",
        "Pop infantil": "#FFB6C1",
        "Dance": "#FF1493",
        "Disney": "#4169E1",
        "Jantar à luz de velas": "#8B0000",
        "Anos 60": "#98FF98",
        "Zen": "#8FBC8F",
        "Country": "#8B4513",
        "Hard Rock": "#2F4F4F",
        "Pega Leve": "#87CEEB",
        "Para malhar": "#FF4500",
        "R&B": "#6A5ACD",
        "Soul": "#4169E1",
        "Hora do café": "#D1C5DC",
        "Para relaxar": "#B0E0E6",
        "Indie": "#556B2F",
        "Vocal jazz": "#800020",
        "Música francesa": "#4682B4",
        "Road Trip": "#FFA500",
        "Alternativo": "#4B0082",
        "Folk": "#6B8E23",
        "Disco": "#C0C0C0",
        "Happy hour": "#FFD700",
        "Ópera": "#8B0000",
        "Tango": "#FF0000",
        "Techno": "#00CED1",
        "Metal": "#696969",
        "Lareira aconchegante": "#FF4500",
        "Tarde de verão": "#FFD700",
        "Salsa": "#FF6347",
        "Mood Boost": "#FFFF00",
        "Músicas de surf": "#40E0D0",
        "EDM": "#39FF14",
        "Dubstep": "#8A2BE2",
        "Rap francês": "#2C3E50",
        "Hair Fashion Night 2017": "#9400D3",
        "Motown": "#4169E1",
      }
      return genreColors[genre] || "#000000"
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

.chart__name {
  margin-top: 0
}
</style>