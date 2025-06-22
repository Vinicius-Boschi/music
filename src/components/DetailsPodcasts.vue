<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
      <img :src="podcast.picture_medium" :alt="podcast.title" />
      <div class="details__container">
        <h1>{{ podcast.title }}</h1>
        <div class="details__info">
          <p>{{ numberReformed(podcast.fans) }} fãs</p>
        </div>
        <div class="details__description">
          <p>{{ podcast.description }}</p>
        </div>
      </div>
    </div>
    <table class="accordion__track-list">
      <thead>
        <tr class="accordion__track-bottom">
          <th>Episódio</th>
          <th>Adicionada</th>
          <th>
            <img
              src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
              alt="icon watch"
            />
          </th>
        </tr>
      </thead>
      <tbody class="accordion__track-container">
        <tr
          v-for="(detail, index) in episodes"
          :key="index"
          @mouseover="highlightedRow = index"
          @mouseleave="highlightedRow = null"
          ref="trackRows"
          :class="{ highlighted: highlightedRow === index }"
        >
          <td class="accordion__track-group">
            <img
              :src="detail.picture"
              :alt="detail.title"
              @mouseover="currentTrackIndex = index"
              @mouseleave="currentTrackIndex = null"
              class="accordion__img"
            />
            <h1>{{ detail.title }}</h1>
          </td>
          <td>{{ dateReformed(detail.release_date) }}</td>
          <td>{{ hoursReformed(detail.duration) }} min</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Footer />
</template>

<script>
import { formatDate } from "../untils/formatDate.js"
import { formatNumber } from "../untils/formatNumber.js"
import { formatHours } from "../untils/formatHours.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "DetailsPodcasts",
  data() {
    return {
      podcast: [],
      episodes: [],
      date: new Date(),
      currentTrackIndex: null,
      highlightedRow: null,
      showModal: false,
      nextUrl: "https://api.deezer.com/podcast/1950252/episodes",
    }
  },
  components: {
    Header,
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
    this.getDetailsPodcast(), this.getDetailsEpisodes(), this.loadEpisodes()
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
    async getDetailsPodcast() {
      try {
        const id = this.id
        const response = await fetch(`http://localhost:3000/podcast/${id}`)
        const data = await response.json()
        this.podcast = data
      } catch (error) {
        console.error("Erro ao buscar o podcast", error)
      }
    },
    async getDetailsEpisodes() {
      try {
        const id = this.id
        const response = await fetch(
          `http://localhost:3000/podcast/${id}/episodes`
        )
        const data = await response.json()
        this.episodes = data.data
      } catch (error) {
        console.error("Erro ao buscar o podcast", error)
      }
    },
    async loadEpisodes() {
      if (!this.nextUrl) return
      try {
        const response = await fetch(this.nextUrl)
        const data = await response.json()
        this.episodes = this.episodes.concat(data.data)
        this.nextUrl = data.next
        if (this.nextUrl) {
          this.loadEpisodes()
        }
      } catch (error) {
        console.error("Erro ao carregar episódios", error)
      }
    },
    numberReformed(number) {
      return formatNumber(number)
    },
    hoursReformed(seconds) {
      return formatHours(seconds)
    },
    dateReformed(data) {
      console.log("Data original:", data);
      const formattedDate = formatDate(data);
      console.log("Data formatada:", formattedDate);
      return formatDate(data)
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/detailsAlbum.scss";

.accordion__img {
  width: 56px;
  height: auto;
}
</style>