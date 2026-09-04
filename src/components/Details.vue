<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
      <div>
        <img
          class="details__profile"
          :src="artist.picture_medium"
          :alt="artist.name || 'Artista'"
        />
      </div>
      <div>
        <div class="details__text">
          <h1 class="details__name-artist">
            {{ artist.name || "Artista não encontrado" }}
          </h1>
          <p class="details__fan">
            {{ numberReformed(artist.nb_fan || 0) }} fãs
          </p>
          <p class="details__album">{{ artist.nb_album || 0 }} álbuns</p>
        </div>
      </div>
    </div>
    <Accordion :artist="artist" />
  </div>
  <Footer />
</template>

<script>
import { formatNumber } from "../untils/formatNumber.js"
import { API_BASE } from "../services/api.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Accordion from "./Accordion.vue"
import Footer from "./Footer.vue"

export default {
  name: "Details",
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
  data() {
    return {
      artist: {},
    }
  },
  async mounted() {
    await this.getDetails()
  },
  watch: {
    id: {
      immediate: false,
      async handler() {
        await this.getDetails()
      },
    },
  },
  methods: {
    async getDetails() {
      try {
        const id = this.id

        if (!id) {
          this.artist = {}
          return
        }

        const response = await fetch(`${API_BASE}/deezer/artist/${id}`)

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`)
        }

        const data = await response.json()
        this.artist = data
      } catch (error) {
        console.error("Erro ao buscar o artista", error)
        this.artist = {}
      }
    },
    numberReformed(number) {
      return formatNumber(number || 0)
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