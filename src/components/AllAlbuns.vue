<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        Álbuns adicionado aos favoritos.
      </div>
      <div class="page__title">
        <h1>Álbuns para você ouvir.</h1>
      </div>
      <div class="page__container">
        <SkeletonArtists v-if="loading" />
        <template v-else>
          <div
            class="page__content"
            v-for="(album, index) in albuns"
            :key="index"
          >
            <router-link
              :to="{ name: 'DetailsAlbum', params: { id: album.id } }"
            >
              <img
                class="page__img"
                :src="album.cover_medium"
                :alt="album.title"
              />
            </router-link>

            <div class="page__infos">
              <p class="page__name">{{ album.title }}</p>
              <p class="page__artist-followers">
                {{ album.nb_fan ? `${album.nb_fan.toLocaleString()} fãs` : "" }}
              </p>
              <button
                class="page__favorite-button"
                @click.prevent="toggleFavorite(album.id)"
                :class="{ active: isFavorite(album.id) }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    :fill="isFavorite(album.id) ? '#e53935' : '#dfdfe2'"
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
const FAVORITE_ALBUM_KEY = "favorites_albuns"

export default {
  name: "AllAlbuns",

  data() {
    return {
      albuns: [],
      favorites: new Set(),
      snackbarVisible: false,
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
          "https://api.deezer.com/chart/0/albums?limit=100"
        )
        const data = await response.json()

        setTimeout(() => {
          this.albuns = data.data
          this.loading = false
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    },
    toggleFavorite(albunsId) {
      if (this.favorites.has(albunsId)) {
        this.favorites.delete(albunsId)
      } else {
        this.favorites.add(albunsId)
      }
      this.saveFavorites()
    },
    isFavorite(albunsId) {
      return this.favorites.has(albunsId)
    },
    saveFavorites() {
      localStorage.setItem(
        FAVORITE_ALBUM_KEY,
        JSON.stringify([...this.favorites])
      )
      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 2000)
    },
    loadFavorites() {
      const saved = localStorage.getItem(FAVORITE_ALBUM_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          this.favorites = new Set(parsed)
        } catch (e) {
          console.error("Erro ao carregar albuns do localStorage.", e)
        }
      }
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/allArtists.scss";
</style>