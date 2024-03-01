<template>
  <Sidebar />
  <div class="detail">
   <div>
    <img class="detail__profile" :src="artist.picture_medium" alt="">
   </div>
    <div>
      <div class="detail__text">
      <h1 class="detail__name-artist">{{ artist.name !== "UNDEFINED" ? artist.name : "Artista não encontrado" }}</h1>
      <p class="detail__fan">{{ artist.nb_fan }} fãs</p>
    </div>
    </div>
  </div>
  <Accordion />
</template>

<script>
import Sidebar from "./Header.vue"
import Accordion from './Accordion.vue'

export default {
  name: "Details",
  data() {
    return {
      artist: [],
    }
  },
  components: {
    Sidebar,
    Accordion
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    async getDetails() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`http://localhost:3000/artist/${id}`)
        const data = await response.json()
        this.artist = data
      } catch (error) {
        console.error("Erro ao buscar o artista", error)
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/details.scss";
.artist-detail {
  text-align: center;

}
</style>