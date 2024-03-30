<template>
  <div class="container">
    <Sidebar />
    <div class="content">
      <div class="detail">
        <div>
          <img class="detail__profile" :src="artist.picture_medium" alt="" />
        </div>
        <div>
          <div class="detail__text">
            <h1 class="detail__name-artist">
              {{
                artist && artist.name !== undefined
                  ? artist.name
                  : "Artista não encontrado"
              }}
            </h1>
            <p class="detail__fan">{{ formatNumber(artist.nb_fan) }} fãs</p>
          </div>
        </div>
      </div>
      <Accordion :artist="artist" />
    </div>
  </div>
</template>

<script>
import Sidebar from "./Sidebar.vue"
import Accordion from "./Accordion.vue"

export default {
  name: "Details",
  data() {
    return {
      artist: {},
    }
  },
  components: {
    Sidebar,
    Accordion,
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
    formatNumber(number) {
      if (number !== undefined && number !== null) {
        return number.toLocaleString("pt-BR")
      } else {
        return "0"
      }
    },
    navigateToAccordion() {
      this.$router.push({
        name: "Accordion",
        params: { id: this.$route.params.id },
      })
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/details.scss";
</style>