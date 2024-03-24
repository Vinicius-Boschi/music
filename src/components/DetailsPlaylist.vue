<template>
  <Sidebar />
  <div class="details">
    <img :src="playlist.picture_medium" :alt="playlist.title" />
    <div class="details__container">
      <h1>{{ playlist.title }}</h1>
      <div
        class="details__singer"
        v-if="playlist.tracks && playlist.tracks.data"
      ></div>
      <div class="details__info">
        <p>{{ playlist.nb_tracks }} faixas</p>
        <p>{{ formatHours(playlist.duration) }} minutos</p>
        <p>{{ formatNumber(playlist.fans) }} fãs</p>
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
        <th>Rank</th>
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
          <h1>{{ index + 1 }} - {{ playlist.title }}</h1>
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
            :to="{ name: 'DetailsAlbum', params: { id: playlist.album.id } }"
          >
            {{ playlist.album.title }}
          </router-link>
        </td>
        <td>{{ formatDate(playlist.time_add) }}</td>
        <td>{{ formatDuration(playlist.duration) }}</td>
        <td>{{ formatNumber(playlist.rank) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import Sidebar from "./Header.vue"

export default {
  name: "DetailsPlaylist",
  data() {
    return {
      playlist: [],
      date: new Date(),
      currentTrackIndex: null,
      highlightedRow: null,
      audioPlayers: [],
    };
  },
  components: {
    Sidebar,
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
        const response = await fetch(`http://localhost:3000/playlist/${id}`)
        const data = await response.json()
        this.playlist = data
      } catch (error) {
        console.error("Erro ao buscar o album", error)
      }
    },
    formatNumber(number) {
      if (number !== undefined && number !== null) {
        return number.toLocaleString("pt-BR")
      } else {
        return "0"
      }
    },
    formatHours(seconds) {
      const hours = Math.floor(seconds / 3600)
      const minutes = Math.floor((seconds % 3600) / 60)
      const formattedHours = String(hours).padStart(2)
      const formattedMinutes = String(minutes).padStart(2, "0")
      return `${formattedHours} hrs ${formattedMinutes}`
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      const formattedMinutes = String(minutes).padStart(2, "0")
      const formattedSeconds = String(remainingSeconds).padStart(2, "0")
      return `${formattedMinutes}:${formattedSeconds}`
    },
    getAlbumImageUrl(imageId) {
      const baseUrl = `https://e-cdns-images.dzcdn.net/images/artist/${imageId}/250x250-000000-80-0-0.jpg`;
      return `${baseUrl}`
    },
    formatDate(data) {
      const milliseconds = data * 1000
      const dateObject = new Date(milliseconds)
      return dateObject.toLocaleDateString("pt-BR")
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