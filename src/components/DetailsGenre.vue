<template>
  <div>
    <h2>{{ genre }}</h2>
    <swiper
      :navigation="true"
      :slidesPerView="6"
      :spaceBetween="30"
      :modules="modules"
      class="mySwiper"
    >
      <swiper-slide v-for="(artist, index) in artists" :key="index">
        <div class="chart__content">
          <div class="chart__content__item">
            <router-link :to="{ name: 'Details', params: { id: artist.id } }">
              <img
                class="chart__img"
                :src="artist.picture"
                :alt="artist.name"
              />
            </router-link>
            <p class="chart__name">{{ artist.name }}</p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/scss"
import "swiper/scss/navigation"

export default {
  props: {
    id: String,
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      genre: "",
      artists: [],
    }
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.getGenreName().then(() => {
      this.getArtistsBySelectedGenre()
    })
  },
  watch: {
    $route(to, from) {
      this.getArtistsBySelectedGenre()
    },
  },
  methods: {
    async getGenreName() {
      try {
        const response = await fetch(`http://localhost:3000/genre/${this.id}`)
        if (!response.ok) {
          throw new Error(`Erro ao buscar o nome do gênero com ID ${this.id}`)
        }
        const data = await response.json()
        this.genre = data.name
        this.getArtistsBySelectedGenre()
      } catch (error) {
        console.error("Erro:", error)
      }
    },

    async getArtistsBySelectedGenre() {
      try {
        if (!this.genre) {
          console.error("Erro: Gênero não definido")
          return
        }

        const response = await fetch(
          `http://localhost:3000/search/playlist?q=${this.genre}`
        )
        if (!response.ok) {
          throw new Error(`Erro ao buscar playlists de ${this.genre}`)
        }
        const data = await response.json()
        const playlists = data.data || []

        let artists = []
        for (const playlist of playlists) {
          const playlistArtists = await this.getArtistsFromPlaylist(
            playlist.id
          )
          artists = artists.concat(playlistArtists)
        }

        this.artists = artists
      } catch (error) {
        console.error("Erro:", error)
      }
    },
    async getArtistsFromPlaylist(id) {
      try {
        const response = await fetch(
          `http://localhost:3000/playlist/${id}/tracks`
        )
        if (!response.ok) {
          throw new Error(`Erro ao buscar faixas da playlist ${id}`)
        }
        const data = await response.json()
        const tracks = data.data || []
        let uniqueArtists = new Set()
        let artists = []

        for (const track of tracks) {
          const artistName = track.artist.name
          if (!uniqueArtists.has(artistName)) {
            uniqueArtists.add(artistName)
            const artist = {
              name: artistName,
              picture: track.artist.picture,
            }
            artists.push(artist)
          }
        }
        return artists
      } catch (error) {
        console.error("Erro:", error)
        return []
      }
    },
  },
}
</script>

<style></style>