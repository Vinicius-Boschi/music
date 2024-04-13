<template>
  <Sidebar />
  <div class="content">
    <div class="details">
      <img :src="details.cover_medium" :alt="details.title" />
      <div class="details__container">
        <h1>{{ details.title }}</h1>
        <div class="details__singer" v-if="details.artist">
          <img :src="details.artist.picture" />
          <router-link
            :to="{ name: 'Details', params: { id: details.artist.id } }"
          >
            <h2>{{ details.artist.name }}</h2>
          </router-link>
        </div>
        <div v-else>
          <h1>Artista não encontrado</h1>
        </div>
        <div class="details__info">
          <p>{{ details.nb_tracks }} faixas</p>
          <p>{{ formatDuration(details.duration) }} minutos</p>
          <p>{{ formatDate(details.release_date) }}</p>
          <p>{{ formatNumber(details.fans) }} fãs</p>
        </div>
      </div>
    </div>
    <table class="accordion__track-list">
      <thead>
        <tr class="accordion__track-bottom">
          <th>Música</th>
          <th>Álbum</th>
          <th>Gênero</th>
          <th>
            <img
              src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
              alt="icon watch"
            />
          </th>
        </tr>
      </thead>
      <tbody
        class="accordion__track-container"
        v-if="details.tracks && details.tracks.data"
      >
        <tr
          v-for="(detail, index) in details.tracks.data"
          :key="index"
          @mouseover="highlightedRow = index"
          @mouseleave="highlightedRow = null"
          ref="trackRows"
          :class="{ highlighted: highlightedRow === index }"
        >
          <audio ref="audioPlayers" :src="detail.preview"></audio>
          <td class="accordion__track-group">
            <img
              :src="detail.album.cover_small"
              :alt="detail.title"
              @click="playPreview(index)"
              @mouseover="currentTrackIndex = index"
              @mouseleave="currentTrackIndex = null"
            />
            <h1>{{ index + 1 }} - {{ detail.title }}</h1>
          </td>
          <td>{{ detail.album.title }}</td>
          <td>
            <span v-for="(genre, index) in details.genres.data" :key="index">
              {{ genre.name }}
            </span>
          </td>
          <td>{{ formatDuration(detail.duration) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Footer />
</template>

<script>
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "DetailsAlbum",
  data() {
    return {
      details: {},
      date: new Date(),
      currentTrackIndex: null,
      highlightedRow: null,
      audioPlayers: [],
    }
  },
  components: {
    Sidebar,
    Footer,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  mounted() {
    this.getDetailsAlbum().then(() => {
      this.audioPlayers = this.$refs.audioPlayers
    })
  },
  methods: {
    async getDetailsAlbum() {
      try {
        const id = this.id
        const response = await fetch(`http://localhost:3000/album/${id}`)
        const data = await response.json()
        this.details = data
      } catch (error) {
        console.error("Erro ao buscar o álbum", error)
      }
    },

    formatNumber(number) {
      if (number !== undefined && number !== null) {
        return number.toLocaleString("pt-BR")
      } else {
        return "0"
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      const formattedMinutes = String(minutes).padStart(2, "0")
      const formattedSeconds = String(remainingSeconds).padStart(2, "0")
      return `${formattedMinutes}:${formattedSeconds}`
    },
    getAlbumImageUrl(imageId) {
      const baseUrl = `https://e-cdns-images.dzcdn.net/images/artist/${imageId}/250x250-000000-80-0-0.jpg`
      return `${baseUrl}`
    },
    formatDate(data) {
      if (!data) return "-"
      const [year, month, day] = data.split("-")
      return `${day}/${month}/${year}`
    },
    playPreview(index) {
      this.audioPlayers.forEach((player) => player.pause())
      this.audioPlayers[index].play()
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/detailsAlbum.scss";
</style>