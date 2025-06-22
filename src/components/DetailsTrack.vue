<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
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
        <audio ref="audioPlayers" :src="track.preview"></audio>
        <button @click="playPreview(index)">
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
      <div class="details__wrapper">
        <button @click="toggleModal">
          <img
            src="https://github.com/Vinicius-Boschi/music/assets/74377158/212cefc2-22fd-487b-8c36-44cbd4f4af49"
            alt=""
          />
        </button>
      </div>
      <div v-if="showModal" class="details__modal">
        <div class="details__items">
          <ul class="details__list">
            <li
              class="details__lists"
              v-for="(item, index) in items"
              :key="index"
              @mouseover="highlightedRow = index"
              @mouseleave="highlightedRow = null"
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
    <div class="details__lyrics" v-html="lyrics"></div>
  </div>
  <Footer />
</template>

<script>
import { formatDuration } from "../untils/formatDuration.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "DetailsTrack",
  props: ["id"],
  data() {
    return {
      track: {},
      audioPlayers: [],
      showModal: false,
      highlightedRow: null,
      lyrics: "",
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
    this.getDetailsTrack().then(() => {
      this.audioPlayers = this.$refs.audioPlayers
    })
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    async getLyrics(title, artist) {
      const response = await fetch(
        `http://localhost:3000/lyrics/${encodeURIComponent(
          title
        )}/${encodeURIComponent(artist)}`
      )
      const data = await response.json()
      if (data && data.lyrics) {
        const lines = data.lyrics
          .split("\n")
          .filter((line) => line.trim() !== "")
        this.lyrics = this.processLyrics(lines)
      } else {
        console.error("Nenhuma letra foi encontrada", title)
      }
    },
    async getDetailsTrack() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`http://localhost:3000/track/${id}`)
        const data = await response.json()
        this.track = data
        if (this.track.id) {
          await this.getLyrics(this.track.title, this.track.artist.name)
        }
      } catch (error) {
        console.error("Erro ao buscar a música", error)
      }
    },
    processLyrics(lyrics) {
      let sections = []
      let section = []

      lyrics.forEach((line) => {
        if (line) {
          section.push(line)
        } else if (section.length) {
          sections.push(section)
          section = []
        }
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
      this.audioPlayers.pause()
      this.audioPlayers.play()
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/detailsTrack.scss";
</style>