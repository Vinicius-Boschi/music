<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        Músicas adicionada aos favoritos.
      </div>
      <div class="page__title">
        <h1>Músicas para você ouvir.</h1>
      </div>
      <div class="page__container">
        <SkeletonArtists v-if="loading" />
        <template v-else>
          <div
            class="page__content"
            v-for="(music, index) in musics"
            :key="index"
          >
            <router-link
              :to="{ name: 'DetailsTrack', params: { id: music.id } }"
            >
              <img
                class="page__img"
                :src="music.album.cover_medium"
                :alt="music.title"
              />
            </router-link>

            <div class="page__infos">
              <p class="page__name">{{ music.title }}</p>
              <p class="page__artist-followers">
                {{ music.nb_fan ? `${music.nb_fan.toLocaleString()} fãs` : "" }}
              </p>
              <button
                class="page__favorite-button"
                @click.prevent="toggleFavorite(music.id)"
                :class="{ active: isFavorite(music.id) }"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    :fill="isFavorite(music.id) ? '#e53935' : '#dfdfe2'"
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
const FAVORITE_MUSIC_KEY = "favorites_tracks"

export default {
  name: "AllMusics",

  data() {
    return {
      musics: [],
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
          "https://api.deezer.com/chart/0/tracks?limit=100"
        )
        const data = await response.json()

        setTimeout(() => {
          this.musics = data.data
          this.loading = false
        }, 1000)
      } catch (error) {
        console.error(error)
      }
    },
    toggleFavorite(musicsId) {
      if (this.favorites.has(musicsId)) {
        this.favorites.delete(musicsId)
      } else {
        this.favorites.add(musicsId)
      }
      this.saveFavorites()
    },
    isFavorite(musicsId) {
      return this.favorites.has(musicsId)
    },
    saveFavorites() {
      localStorage.setItem(
        FAVORITE_MUSIC_KEY,
        JSON.stringify([...this.favorites])
      )
      this.snackbarVisible = true
      setTimeout(() => {
        this.snackbarVisible = false
      }, 2000)
    },
    loadFavorites() {
      const saved = localStorage.getItem(FAVORITE_MUSIC_KEY)
      if (saved) {
        try {
          const parsed = JSON.parse(saved)
          this.favorites = new Set(parsed)
        } catch (e) {
          console.error("Erro ao carregar favoritos do localStorage.", e)
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