<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
      <img
        class="details__img"
        src="https://github.com/Vinicius-Boschi/music/assets/74377158/5bfbd304-0a9f-45cb-9b47-3390f3fe8b8a"
        alt="top hits do momento"
      />
      <div class="details__container">
        <h1>Top músicas</h1>
      </div>
    </div>
    <table class="accordion__track-list">
      <thead>
        <tr class="accordion__track-bottom">
          <th>Música</th>
          <th>Artista</th>
          <th>Álbum</th>
          <th>
            <img
              src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
              alt=""
            />
          </th>
        </tr>
      </thead>
      <tbody class="accordion__track-container">
        <tr
          v-for="(radio, index) in radio"
          :key="index"
          @mouseover="highlightedRow = index"
          @mouseleave="highlightedRow = null"
          ref="trackRows"
          :class="{ highlighted: highlightedRow === index }"
        >
          <audio ref="audioPlayers" :src="radio.preview"></audio>
          <td class="accordion__track-group">
            <img
              :src="radio.album.cover_small"
              :alt="radio.title"
              @click="playPreview(index)"
              @mouseover="currentTrackIndex = index"
              @mouseleave="currentTrackIndex = null"
            />
            <h1>
              <router-link
                :to="{ name: 'DetailsTrack', params: { id: radio.id } }"
              >
                {{ index + 1 }} - {{ radio.title }}
              </router-link>
            </h1>
          </td>
          <td>
            <router-link
              :to="{ name: 'Details', params: { id: radio.artist.id } }"
            >
              {{ radio.artist.name }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="{
                name: 'DetailsAlbum',
                params: { id: radio.album.id },
              }"
            >
              {{ radio.album.title }}
            </router-link>
          </td>
          <td>{{ formatDuration(radio.duration) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Footer />
</template>

<script>
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "DetailsRadio",
  props: ["id"],
  data() {
    return {
      radio: [],
      date: new Date(),
      currentTrackIndex: null,
      highlightedRow: null,
      audioPlayers: [],
    }
  },
  components: {
    Header,
    Sidebar,
    Footer,
  },
  mounted() {
    this.getDetailsRadio().then(() => {
      this.audioPlayers = this.$refs.audioPlayers
    })
  },
  methods: {
    async getDetailsRadio() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `http://localhost:3000/radio/${id}/tracks`
        )
        const data = await response.json()
        this.radio = data.data
      } catch (error) {
        console.error("Erro ao buscar a radio", error)
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      const formattedMinutes = String(minutes).padStart(2, "0")
      const formattedSeconds = String(remainingSeconds).padStart(2, "0")
      return `${formattedMinutes}:${formattedSeconds}`
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

a {
  &:hover {
    text-decoration: underline;
  }
}
</style>