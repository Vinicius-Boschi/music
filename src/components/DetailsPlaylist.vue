<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
      <img :src="playlist.picture_medium" :alt="playlist.title" />
      <div class="details__container">
        <h1>{{ playlist.title }}</h1>
        <div class="details__info">
          <p>{{ playlist.nb_tracks }} faixas</p>
          <p>{{ hoursReformed(playlist.duration) }} minutos</p>
          <p>{{ numberReformed(playlist.fans) }} fãs</p>
        </div>
        <div>
          <p>{{ playlist.description }}</p>
        </div>
      </div>
    </div>
    <table class="accordion__track-list">
      <thead>
        <tr class="accordion__track-bottom">
          <th>Música</th>
          <th>Artista</th>
          <th>Álbum</th>
          <th>Adicionada</th>
          <th>
            <img
              src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
              alt=""
            />
          </th>
        </tr>
      </thead>
      <tbody
        class="accordion__track-container"
        v-if="playlist.tracks && playlist.tracks.data"
      >
        <tr
          v-for="(playlist, index) in playlist.tracks.data"
          :key="index"
          @mouseover="highlightedRow = index"
          @mouseleave="highlightedRow = null"
          ref="trackRows"
          :class="{ highlighted: highlightedRow === index }"
        >
          <audio ref="audioPlayers" :src="playlist.preview"></audio>
          <td class="accordion__track-group">
            <img
              :src="playlist.album.cover_small"
              :alt="playlist.title"
              @click="playPreview(index)"
              @mouseover="currentTrackIndex = index"
              @mouseleave="currentTrackIndex = null"
            />
            <h1>
              <router-link
                :to="{ name: 'DetailsTrack', params: { id: playlist.id } }"
              >
                {{ index + 1 }} - {{ playlist.title }}
              </router-link>
            </h1>
          </td>
          <td>
            <router-link
              :to="{ name: 'Details', params: { id: playlist.artist.id } }"
            >
              {{ playlist.artist.name }}
            </router-link>
          </td>
          <td>
            <router-link
              :to="{
                name: 'DetailsAlbum',
                params: { id: playlist.album.id },
              }"
            >
              {{ playlist.album.title }}
            </router-link>
          </td>
          <td>{{ dateReformed(playlist.time_add) }}</td>
          <td>{{ durationReformed(playlist.duration) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Footer />
</template>

<script>
import { formatNumber } from "../untils/formatNumber.js"
import { formatHours } from "../untils/formatHours.js"
import { formatDuration } from "../untils/formatDuration.js"
import { formatDate } from "../untils/formatDate.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "DetailsPlaylist",
  props: ["id"],
  data() {
    return {
      playlist: [],
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
    this.getDetailsPlaylist().then(() => {
      this.audioPlayers = this.$refs.audioPlayers
    })
  },
  methods: {
    async getDetailsPlaylist() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`/api/deezer/playlist/${id}`)
        const data = await response.json()
        this.playlist = data
      } catch (error) {
        console.error("Erro ao buscar a playlist", error)
      }
    },
    numberReformed(number) {
      return formatNumber(number)
    },
    hoursReformed(seconds) {
      return formatHours(seconds)
    },
    durationReformed(seconds) {
      return formatDuration(seconds)
    },
    getAlbumImageUrl(imageId) {
      const baseUrl = `https://e-cdns-images.dzcdn.net/images/artist/${imageId}/250x250-000000-80-0-0.jpg`
      return `${baseUrl}`
    },
    dateReformed(data) {
      return formatDate(data)
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