<template>
  <div class="content">
    <Header />
    <Sidebar />
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
          <h1>Album não encontrado</h1>
        </div>
        <div class="details__info">
          <p>{{ details.nb_tracks }} faixas</p>
          <p>{{ hoursReformed(details.duration) }} minutos</p>
          <p>{{ dateReformed(details.release_date) }}</p>
          <p>{{ numberReformed(details.fans) }} fãs</p>
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
          <td class="accordion__track-group">
            <img
              :src="detail.album.cover_small"
              :alt="detail.title"
              @click="playPreview(index)"
              @mouseover="currentTrackIndex = index"
              @mouseleave="currentTrackIndex = null"
            />
            <router-link
              :to="{ name: 'DetailsTrack', params: { id: detail.id } }"
            >
              <h1>{{ detail.title }}</h1>
            </router-link>
          </td>
          <td>{{ detail.album.title }}</td>
          <td>
            {{ details.genres?.data?.[0]?.name || "-" }}
          </td>
          <td>{{ durationReformed(detail.duration) }}</td>
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
import { API_BASE } from "../services/api.js"
import Header from "./Header.vue"
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
  async mounted() {
    await this.getDetailsAlbum()
  },
  methods: {
    async getDetailsAlbum() {
      try {
        const id = this.id
        const response = await fetch(
          `${API_BASE}/deezer/album/${id}}`,
        )

        if (!response.ok) {
          throw new Error(`Erro HTTP: ${response.status}`)
        }

        const data = await response.json()
        this.details = data
      } catch (error) {
        console.error("Erro ao buscar o álbum", error)
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
      const tracks = this.details?.tracks?.data || []
      const track = tracks[index]

      if (!track || !track.preview) return

      window.dispatchEvent(
        new CustomEvent("track-changed", {
          detail: {
            track,
            queue: tracks,
            index,
          },
        }),
      )
    },
  },
}
</script>