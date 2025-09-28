<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
      <div>
        <img class="details__profile" :src="artist.picture_medium" alt="" />
      </div>
      <div>
        <div class="details__text">
          <h1 class="details__name-artist">
            {{
              artist && artist.name !== undefined
                ? artist.name
                : "Artista não encontrado"
            }}
          </h1>
          <p class="details__fan">{{ numberReformed(artist.nb_fan) }} fãs</p>
          <p class="details__album">{{ artist.nb_album }} álbuns</p>
        </div>
      </div>
    </div>
    <Accordion :artist="artist" />
  </div>
  <Footer />
</template>

<script>
import { formatNumber } from "../untils/formatNumber.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Accordion from "./Accordion.vue"
import Footer from "./Footer.vue"

export default {
  name: "Details",
  data() {
    return {
      artist: {},
    }
  },
  components: {
    Header,
    Sidebar,
    Accordion,
    Footer,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    async getDetails() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`/api/deezer/artist/${id}`)
        const data = await response.json()
        this.artist = data
      } catch (error) {
        console.error("Erro ao buscar o artista", error)
      }
    },
    numberReformed(number) {
      return formatNumber(number)
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