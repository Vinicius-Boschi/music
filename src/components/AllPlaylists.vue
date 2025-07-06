<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        {{ snackbarMessage }}
      </div>
      <div class="page__title">
        <h1>Playlists que você vai amar.</h1>
      </div>
      <div class="page__container">
        <SkeletonArtists v-if="loading" />
        <template v-else>
          <div
            class="page__content"
            v-for="(playlist, index) in playlists"
            :key="index"
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
              <p class="page__artist-followers">
                {{ playlist.nb_tracks }} faixas
              </p>
              <div class="page__remove-wrapper">
                <button
                  class="page__favorite-button"
                  @click.prevent="toggleFavorite(playlist.id)"
                  :class="{ active: isFavorite(playlist.id) }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      :fill="isFavorite(playlist.id) ? '#e53935' : '#dfdfe2'"
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41
               4.42 3 7.5 3c1.74 0 3.41 0.81 4.5
               2.09C13.09 3.81 14.76 3 16.5
               3 19.58 3 22 5.41 22 8.5c0
               3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"
import SkeletonArtists from "./SkeletonArtists.vue"
const FAVORITE_PLAYLIST_KEY = "favorites_playlists"

export default {
  name: "AllPlaylists",
  data() {
    return {
      playlists: [],
      favorites: new Set(),
      snackbarVisible: false,
      snackbarMessage: "",
      loading: true,
    }
  },
  components: {
    Header,
    Sidebar,
    Footer,
    SkeletonArtists,
  },
  mounted() {
    this.getAllInfos()
    this.loadFavorites()
  },
  methods: {
    async getAllInfos() {
      try {
        const response = await fetch(
          "https://api.deezer.com/chart/0/playlists?limit=100"
        )
        const data = await response.json()

        setTimeout(() => {
          this.playlists = data.data
          this.loading = false
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    },
    toggleFavorite(playlistId) {
      if (this.favorites.has(playlistId)) {
        this.favorites.delete(playlistId)
        this.showSnackbar("Playlist removida dos favoritos.")
      } else {
        this.favorites.add(playlistId)
        this.showSnackbar("Playlist adicionada aos favoritos.")
      }
      this.saveFavorites()
    },
    isFavorite(playlistId) {
      return this.favorites.has(playlistId)
    },
    saveFavorites() {
      localStorage.setItem(
        FAVORITE_PLAYLIST_KEY,
        JSON.stringify([...this.favorites])
      )
      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 3000)
    },
    loadFavorites() {
      const saved = localStorage.getItem(FAVORITE_PLAYLIST_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          this.favorites = new Set(parsed)
        } catch (e) {
          console.error("Erro ao carregar playlists do localStorage.", e)
        }
      }
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
@import "../assets/scss/styles/allInfos.scss";
</style>