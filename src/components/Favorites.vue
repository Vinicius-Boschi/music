<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        Artista removido dos favoritos.
      </div>
      <div class="page__title">
        <h1>Seus artistas favoritos.</h1>
      </div>
      <div v-if="favoriteArtists.length === 0" class="page__empty">
        <img
          class="page__empty-img"
          src="../assets/notfound.png"
          alt="Sem artistas favoritos"
        />
        <p v-if="favoriteArtists.length === 0" class="page__empty-message">
          🎧 Você ainda não adicionou nenhum artista aos favoritos. 🎧
        </p>
      </div>
      <div class="page__container">
        <div
          class="page__content"
          v-for="artist in favoriteArtists"
          :key="artist.id"
        >
          <transition-group name="fade" tag="div" appear>
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
                    ? `${artist.nb_fan.toLocaleString()} fãs`
                    : "Popular agora"
                }}
              </p>
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
          </transition-group>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "FavoriteArtists",

  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      favoriteArtists: [],
      snackbarVisible: false,
    }
  },
  mounted() {
    this.loadFavoriteArtists()
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

        this.favoriteArtists = await Promise.all(requests)
      } catch (error) {
        console.error("Erro ao carregar os favoritos.", error)
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
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/allArtists.scss";
</style>