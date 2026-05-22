<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        {{ snackbarMessage }}
      </div>
      <div class="page__title">
        <h1>Artistas para você ouvir.</h1>
      </div>
      <div class="page__container">
        <SkeletonArtists v-if="loading" />
        <template v-else>
          <div
            class="page__content"
            v-for="(artist, index) in artists"
            :key="index"
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
                  artist.nb_fan ? `${artist.nb_fan.toLocaleString()} fãs` : ""
                }}
              </p>
              <div class="page__remove-wrapper">
                <button
                  class="page__favorite-button"
                  @click.prevent="toggleFavorite(artist.id)"
                  :class="{ active: isFavorite(artist.id) }"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      :fill="isFavorite(artist.id) ? '#e53935' : '#dfdfe2'"
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
const FAVORITE_KEY = "favorites_artists"

export default {
  name: "AllArtists",
  data() {
    return {
      artists: [],
      favorites: [],
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
        const response = await fetch("/api/deezer/chart/0/artists?limit=100")
        const data = await response.json()

        setTimeout(() => {
          this.artists = data.data
          this.loading = false
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    },
    toggleFavorite(artistId) {
      const index = this.favorites.findIndex((item) => item.id === artistId)
      if (index !== -1) {
        this.favorites.splice(index, 1)
        this.showSnackbar("Artista removido dos favoritos.")
      } else {
        this.favorites.push({
          id: artistId,
          addedAt: new Date().toISOString(),
        })
        this.showSnackbar("Artista adicionado aos favoritos.")
      }
      localStorage.setItem("favorites_artists", JSON.stringify(this.favorites))
    },
    isFavorite(artistId) {
      return this.favorites.some((item) => item.id === artistId)
    },
    saveFavorites(id) {
      const current = JSON.parse(localStorage.getItem(FAVORITE_KEY)) || []
      const alreadyExists = current.some((item) => item.id === id)

      if (!alreadyExists) {
        current.push({ id, addedAt: new Date().toISOString() })
      }

      localStorage.setItem(FAVORITE_KEY, JSON.stringify(current))
      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 3000)
    },
    loadFavorites() {
      const saved = localStorage.getItem(FAVORITE_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          if (Array.isArray(parsed)) {
            this.favorites = parsed
          } else {
            this.favorites = []
          }
        } catch (e) {
          console.error("Erro ao carregar favoritos do localStorage.", e)
          this.favorites = []
        }
      } else {
        this.favorites = []
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