<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        Item removido dos favoritos.
      </div>

      <!-- Artistas -->
      <div class="page__title" v-if="favoriteArtists.length">
        <h1>Favoritos.</h1>
      </div>
      <div v-else class="page__empty">
        <img
          class="page__empty-img"
          src="../assets/notfound.png"
          alt="Sem artistas favoritos"
        />
        <p class="page__empty-message">
          🎧 Você ainda não adicionou nenhum artista aos favoritos. 🎧
        </p>
      </div>

      <transition-group name="fade" tag="div" appear class="page__container">
        <div
          class="page__content"
          v-for="artist in favoriteArtists"
          :key="`artist-${artist.id}`"
        >
          <router-link :to="{ name: 'Details', params: { id: artist.id } }">
            <img
              class="page__img"
              :src="artist.picture_medium"
              :alt="artist.name"
            />
          </router-link>

          <div class="page__infos">
            <p class="page__name">{{ artist.name }}</p>
            <p class="page__artist-followers">
              {{
                artist.nb_fan
                  ? `${numberReformed(artist.nb_fan)} fãs`
                  : "Popular agora"
              }}
            </p>
            <div class="page__remove-wrapper">
              <button class="page__remove" @click="removeFavorite(artist.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 6h18v2H3V6zm2 3h14v13H5V9zm5 2v9h2v-9H10zm4 0v9h2v-9h-2zM9 4h6v2H9V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Músicas -->
      <div class="page__title" v-if="favoriteTracks.length">
        <h1>Músicas.</h1>
      </div>
      <div v-else class="page__empty">
        <img
          class="page__empty-img"
          src="../assets/notfound.png"
          alt="Sem músicas favoritas"
        />
        <p class="page__empty-message">
          🎶 Você ainda não adicionou nenhuma música aos favoritos. 🎶
        </p>
      </div>

      <transition-group name="fade" tag="div" appear class="page__container">
        <div
          class="page__content"
          v-for="track in favoriteTracks"
          :key="`track-${track.id}`"
        >
          <router-link :to="{ name: 'DetailsTrack', params: { id: track.id } }">
            <img
              class="page__img"
              :src="track.album.cover_medium"
              :alt="track.title"
            />
          </router-link>

          <div class="page__infos">
            <p class="page__name">{{ track.title }}</p>
            <p class="page__artist-followers">{{ track.artist.name }}</p>
            <div class="page__remove-wrapper">
              <button class="page__remove" @click="removeTrack(track.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 6h18v2H3V6zm2 3h14v13H5V9zm5 2v9h2v-9H10zm4 0v9h2v-9h-2zM9 4h6v2H9V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Albuns -->
      <div class="page__title" v-if="favoriteAlbuns.length">
        <h1>Álbuns.</h1>
      </div>
      <div v-else class="page__empty">
        <img
          class="page__empty-img"
          src="../assets/notfound.png"
          alt="Sem albuns favoritas"
        />
        <p class="page__empty-message">
          🎶 Você ainda não adicionou nenhuma album aos favoritos. 🎶
        </p>
      </div>

      <transition-group name="fade" tag="div" appear class="page__container">
        <div
          class="page__content"
          v-for="album in favoriteAlbuns"
          :key="`album-${album.id}`"
        >
          <router-link :to="{ name: 'DetailsAlbum', params: { id: album.id } }">
            <img
              class="page__img"
              :src="album.cover_medium"
              :alt="album.title"
            />
          </router-link>

          <div class="page__infos">
            <p class="page__name">{{ album.title }}</p>
            <p class="page__artist-followers">{{ album.artist.name }}</p>
            <div class="page__remove-wrapper">
              <button class="page__remove" @click="removeAlbum(album.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 6h18v2H3V6zm2 3h14v13H5V9zm5 2v9h2v-9H10zm4 0v9h2v-9h-2zM9 4h6v2H9V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Playlists -->
      <div class="page__title" v-if="favoritePlaylists.length">
        <h1>Playlists.</h1>
      </div>
      <div v-else class="page__empty">
        <img
          class="page__empty-img"
          src="../assets/notfound.png"
          alt="Sem playlists favoritas"
        />
        <p class="page__empty-message">
          🎶 Você ainda não adicionou nenhuma playlist aos favoritos. 🎶
        </p>
      </div>

      <transition-group name="fade" tag="div" appear class="page__container">
        <div
          class="page__content"
          v-for="playlist in favoritePlaylists"
          :key="`playlist-${playlist.id}`"
        >
          <router-link
            :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
          >
            <img
              class="page__img"
              :src="playlist.picture_medium"
              :alt="playlist.title"
            />
          </router-link>

          <div class="page__infos">
            <p class="page__name">{{ playlist.title }}</p>
            <span class="page__artist-followers">
              {{ playlist.nb_tracks }} faixas -
              {{ numberReformed(playlist.fans) }} fãs
            </span>
            <div class="page__remove-wrapper">
              <button
                class="page__remove"
                @click="removePlaylists(playlist.id)"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 6h18v2H3V6zm2 3h14v13H5V9zm5 2v9h2v-9H10zm4 0v9h2v-9h-2zM9 4h6v2H9V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </transition-group>

      <!-- Podcasts -->
      <div class="page__title" v-if="favoritePodcasts.length">
        <h1>Podcasts.</h1>
      </div>
      <div v-else class="page__empty">
        <img
          class="page__empty-img"
          src="../assets/notfound.png"
          alt="Sem podcasts favoritas"
        />
        <p class="page__empty-message">
          🎶 Você ainda não adicionou nenhum podcast aos favoritos. 🎶
        </p>
      </div>

      <transition-group name="fade" tag="div" appear class="page__container">
        <div
          class="page__content"
          v-for="podcast in favoritePodcasts"
          :key="`podcast-${podcast.id}`"
        >
          <router-link
            :to="{ name: 'DetailsPodcasts', params: { id: podcast.id } }"
          >
            <img
              class="page__img"
              :src="podcast.picture_medium"
              :alt="podcast.title"
            />
          </router-link>

          <div class="page__infos">
            <p class="page__name">{{ podcast.title }}</p>
            <p class="page__artist-followers">
              {{ numberReformed(podcast.fans) }} fãs
            </p>
            <div class="page__remove-wrapper">
              <button class="page__remove" @click="removePodcasts(podcast.id)">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M3 6h18v2H3V6zm2 3h14v13H5V9zm5 2v9h2v-9H10zm4 0v9h2v-9h-2zM9 4h6v2H9V4z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
  <Footer />
</template>

<script>
import { formatNumber } from "../untils/formatNumber.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "Favorites",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      favoriteArtists: [],
      favoriteTracks: [],
      favoriteAlbuns: [],
      favoritePlaylists: [],
      favoritePodcasts: [],
      snackbarVisible: false,
    }
  },
  mounted() {
    this.loadFavoriteArtists()
    this.loadFavoriteTracks()
    this.loadFavoriteAlbuns()
    this.loadFavoritePlaylists()
    this.loadFavoritePodcasts()
  },
  methods: {
    async loadFavoriteArtists() {
      const saved = localStorage.getItem("favorites_artists")
      if (!saved) return

      try {
        const favoriteIds = JSON.parse(saved)

        const requests = favoriteIds.map((id) =>
          fetch(`https://api.deezer.com/artist/${id}`).then((res) => res.json())
        )

        const results = await Promise.all(requests)
        this.favoriteArtists = results.filter((artist) => artist && artist.id)
      } catch (error) {
        console.error("Erro ao carregar os artistas favoritos.", error)
      }
    },
    async loadFavoriteTracks() {
      const saved = localStorage.getItem("favorites_tracks")
      if (!saved) return

      try {
        const favoriteIds = JSON.parse(saved)

        const requests = favoriteIds.map((id) =>
          fetch(`https://api.deezer.com/track/${id}`).then((res) => res.json())
        )

        const results = await Promise.all(requests)
        this.favoriteTracks = results.filter((track) => track && track.id)
      } catch (error) {
        console.error("Erro ao carregar as músicas favoritas.", error)
      }
    },
    async loadFavoriteAlbuns() {
      const saved = localStorage.getItem("favorites_albuns")
      if (!saved) return

      try {
        const favoriteIds = JSON.parse(saved)

        const requests = favoriteIds.map((id) =>
          fetch(`https://api.deezer.com/album/${id}`).then((res) => res.json())
        )

        const results = await Promise.all(requests)
        this.favoriteAlbuns = results.filter((album) => album && album.id)
      } catch (error) {
        console.error("Erro ao carregar os albuns favoritos.", error)
      }
    },
    async loadFavoritePlaylists() {
      const saved = localStorage.getItem("favorites_playlists")
      if (!saved) return

      try {
        const favoriteIds = JSON.parse(saved)

        const requests = favoriteIds.map((id) =>
          fetch(`https://api.deezer.com/playlist/${id}`).then((res) =>
            res.json()
          )
        )

        const results = await Promise.all(requests)
        this.favoritePlaylists = results.filter(
          (playlist) => playlist && playlist.id
        )
      } catch (error) {
        console.error("Erro ao carregar as playlists favoritas.", error)
      }
    },
    async loadFavoritePodcasts() {
      const saved = localStorage.getItem("favorites_podcast")
      if (!saved) return

      try {
        const favoriteIds = JSON.parse(saved)

        const requests = favoriteIds.map((id) =>
          fetch(`https://api.deezer.com/podcast/${id}`).then((res) =>
            res.json()
          )
        )

        const results = await Promise.all(requests)
        this.favoritePodcasts = results.filter(
          (podcast) => podcast && podcast.id
        )
      } catch (error) {
        console.error("Erro ao carregar os podcasts favoritos.", error)
      }
    },
    removeFavorite(id) {
      const saved = localStorage.getItem("favorites_artists")
      if (!saved) return

      const parsed = JSON.parse(saved)
      const update = parsed.filter((artistId) => artistId !== id)
      localStorage.setItem("favorites_artists", JSON.stringify(update))
      this.favoriteArtists = this.favoriteArtists.filter(
        (artist) => artist.id !== id
      )

      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 2000)
    },
    removeTrack(id) {
      const saved = localStorage.getItem("favorites_tracks")
      if (!saved) return

      const parsed = JSON.parse(saved)
      const update = parsed.filter((trackId) => trackId !== id)
      localStorage.setItem("favorites_tracks", JSON.stringify(update))
      this.favoriteTracks = this.favoriteTracks.filter(
        (track) => track.id !== id
      )

      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 2000)
    },
    removeAlbum(id) {
      const saved = localStorage.getItem("favorites_albuns")
      if (!saved) return

      const parsed = JSON.parse(saved)
      const update = parsed.filter((albumId) => albumId !== id)
      localStorage.setItem("favorites_albuns", JSON.stringify(update))
      this.favoriteAlbuns = this.favoriteAlbuns.filter(
        (album) => album.id !== id
      )

      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 2000)
    },
    removePlaylists(id) {
      const saved = localStorage.getItem("favorites_playlists")
      if (!saved) return

      const parsed = JSON.parse(saved)
      const update = parsed.filter((playlistId) => playlistId !== id)
      localStorage.setItem("favorites_playlists", JSON.stringify(update))
      this.favoritePlaylists = this.favoritePlaylists.filter(
        (playlist) => playlist.id !== id
      )

      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 2000)
    },
    removePodcasts(id) {
      const saved = localStorage.getItem("favorites_podcast")
      if (!saved) return

      const parsed = JSON.parse(saved)
      const update = parsed.filter((podcastId) => podcastId !== id)
      localStorage.setItem("favorites_podcast", JSON.stringify(update))
      this.favoritePodcasts = this.favoritePodcasts.filter(
        (podcast) => podcast.id !== id
      )

      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 2000)
    },
    numberReformed(number) {
      return formatNumber(number)
    },
  },
}
</script>