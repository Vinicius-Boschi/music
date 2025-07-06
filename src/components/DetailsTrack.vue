<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
      <div v-if="snackbarVisible" class="details__snackbar">
        {{ snackbarMessage }}
      </div>
      <img
        v-if="track && track.album"
        :src="track.album.cover_medium"
        :alt="track.title"
      />
      <div class="details__container">
        <h1>{{ track.title }}</h1>
        <div class="details__singer" v-if="track.artist">
          <img :src="track.artist.picture" :alt="track.artist.name" />
          <router-link
            :to="{ name: 'Details', params: { id: track.artist.id } }"
          >
            {{ track.artist.name }}
          </router-link>
        </div>
        <div v-else>
          <h1>Artista não encontrado</h1>
        </div>
        <div class="details__info">
          <img
            class="details__watch"
            src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
            alt="icon watch"
          />
          <p>{{ durationReformed(track.duration) }} minutos</p>
        </div>
      </div>
    </div>
    <div class="details__group">
      <div class="details__button">
        <audio ref="audioPlayer" :src="track.preview"></audio>
        <button @click="playPreview">
          <span>
            <img
              src="https://github.com/Vinicius-Boschi/music/assets/74377158/1a2d6fe5-7258-472d-b786-56f2eb12019b"
              alt="play button"
            />
          </span>
          <div>
            <p>Ouvir</p>
          </div>
        </button>
      </div>
      <div class="details__remove-wrapper">
        <button
          class="details__favorite-button"
          @click.stop.prevent="toggleFavorite(track.id)"
          :class="{ active: isFavorite(track.id) }"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              :fill="isFavorite(track.id) ? '#e53935' : '#dfdfe2'"
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41
                 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5
                 2.09C13.09 3.81 14.76 3 16.5
                 3 19.58 3 22 5.41 22 8.5c0
                 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            />
          </svg>
        </button>
      </div>
      <div class="details__wrapper">
        <button @click.stop.prevent="toggleModal">
          <img
            src="https://github.com/Vinicius-Boschi/music/assets/74377158/212cefc2-22fd-487b-8c36-44cbd4f4af49"
            alt=""
          />
        </button>
      </div>
      <div
        v-if="showModal"
        class="details__modal-overlay"
        @click="showModal = false"
      >
        <div class="details__modal" @click.stop>
          <div class="details__items">
            <ul class="details__list">
              <li
                class="details__lists"
                v-for="(item, index) in items"
                :key="index"
                :class="{ highlighted: highlightedRow === index }"
              >
                <button class="details__buttons">
                  <img class="details__icon" :src="item.icon" :alt="item.alt" />
                  <span class="details__listen">{{ item.text }}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="details__lyrics">
      <template v-if="loadingLyrics">Carregando letra...</template>
      <template v-else-if="lyricsError">{{ lyricsError }}</template>
      <div v-else v-html="lyrics"></div>
    </div>
  </div>
  <Footer />
</template>

<script>
import { formatDuration } from "../untils/formatDuration.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"
import axios from "axios"

export default {
  name: "DetailsTrack",
  props: ["id"],
  data() {
    return {
      track: {},
      showModal: false,
      highlightedRow: null,
      lyrics: "",
      loadingLyrics: false,
      lyricsError: null,
      favorites: [],
      snackbarVisible: false,
      snackbarMessage: "",
      items: [
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/d1950296-7fb2-485b-b5f7-d5c4132685e9",
          alt: "forward",
          text: "Ouvir em seguida",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/bbc28eab-9627-4e25-b386-df3ec4ef22e4",
          alt: "backward",
          text: "Adicionar à fila de espera",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/e19cec38-e5c0-4281-a458-8aaff4a46b11",
          alt: "mix",
          text: "Lançar o mix da faixa",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/e20aa51e-818b-45ee-be35-faa81d191032",
          alt: "heart",
          text: "Adicionar aos favoritos",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/578c752c-880a-473d-8716-d35bf06de8b9",
          alt: "block",
          text: "Não recomende esta faixa",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/71c4befb-8f04-430a-a3e4-c5570b668a22",
          alt: "add",
          text: "Adicionar à playlist...",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/4f7be94b-8a2a-4f47-ad05-d5115e9c97f7",
          alt: "microphone",
          text: "Tocar com as letras",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/af867db8-675d-4158-a490-9cc6e99aa77f",
          alt: "people",
          text: "Consulte créditos musicais",
        },
        {
          icon: "https://github.com/Vinicius-Boschi/music/assets/74377158/3c343867-de24-4281-a13d-3ba9a4dca5ac",
          alt: "report",
          text: "Reportar um problema",
        },
      ],
    }
  },
  components: {
    Header,
    Sidebar,
    Footer,
  },
  mounted() {
    this.loadFavoritesFromStorage()
    this.getDetailsTrack()
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    cleanTitle(title) {
      return title
        .replace(/\(.*?\)/g, "")
        .replace(/[-–]/g, "")
        .trim()
    },
    async getLyrics(title, artist) {
      this.loadingLyrics = true
      this.lyricsError = null

      try {
        const response = await axios.get("http://localhost:3000/lyrics", {
          params: { title, artist },
        })

        const lines = response.data.lyrics.split("\n")
        lines.shift()
        this.lyrics = this.processLyrics(lines)
      } catch (error) {
        this.lyricsError = "Letra não encontrada"
      } finally {
        this.loadingLyrics = false
      }
    },
    async getDetailsTrack() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`http://localhost:3000/track/${id}`)
        const data = await response.json()
        this.track = data

        if (this.track && this.track.title && this.track.artist) {
          const cleanTitle = this.cleanTitle(this.track.title)
          await this.getLyrics(cleanTitle, this.track.artist.name)
        }
      } catch (error) {
        console.error("Erro ao buscar a música", error)
      }
    },
    processLyrics(lyrics) {
      let sections = []
      let section = []

      lyrics.forEach((line) => {
        if (line.startsWith("[") && line.endsWith("]")) {
          if (section.length) {
            sections.push(section)
            section = []
          }
        }
        section.push(line)
      })

      if (section.length) {
        sections.push(section)
      }

      return sections
        .map((section) => {
          return `<div class="section">${section
            .map((line) => {
              if (line.startsWith("[") && line.endsWith("]")) {
                return `<p class="details__lyrics-background">${line}</p>`
              } else {
                return `<p class="details__lyrics-paragraph">${line}</p>`
              }
            })
            .join("")}</div>`
        })
        .join("")
    },
    durationReformed(seconds) {
      return formatDuration(seconds)
    },
    playPreview() {
      const player = this.$refs.audioPlayer
      if (!player) return

      if (!player.paused) {
        player.pause()
      }
      player.play()
    },

    loadFavoritesFromStorage() {
      const saved = localStorage.getItem("favorites_tracks")
      this.favorites = saved ? JSON.parse(saved) : []
    },
    toggleFavorite(trackId) {
      const index = this.favorites.indexOf(trackId)

      if (index === -1) {
        this.favorites.push(trackId)
        this.showSnackbar("Música adicionada aos favoritos.")
      } else {
        this.favorites.splice(index, 1)
        this.showSnackbar("Música removida dos favoritos.")
      }

      localStorage.setItem("favorites_tracks", JSON.stringify(this.favorites))
    },
    isFavorite(trackId) {
      return this.favorites.includes(trackId)
    },
    showSnackbar(message) {
      this.snackbarMessage = message
      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 3000)
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/detailsTrack.scss";
</style>