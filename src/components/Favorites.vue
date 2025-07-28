<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        Item removido dos favoritos.
      </div>
      <!-- Accordion -->
      <article class="accordion">
        <div class="accordion__about-center">
          <article class="accordion__about">
            <div class="accordion__btn-container">
              <div class="accordion__btn-container-content">
                <button
                  class="accordion__tab-btn"
                  :class="{ active: activeTab === 'artists' }"
                  @click="activeTab = 'artists'"
                >
                  Artistas
                </button>
                <button
                  class="accordion__tab-btn"
                  :class="{ active: activeTab === 'tracks' }"
                  @click="activeTab = 'tracks'"
                >
                  Músicas
                </button>
                <button
                  class="accordion__tab-btn"
                  :class="{ active: activeTab === 'albums' }"
                  @click="activeTab = 'albums'"
                >
                  Álbuns
                </button>
                <button
                  class="accordion__tab-btn"
                  :class="{ active: activeTab === 'playlists' }"
                  @click="activeTab = 'playlists'"
                >
                  Playlists
                </button>
                <button
                  class="accordion__tab-btn"
                  :class="{ active: activeTab === 'podcasts' }"
                  @click="activeTab = 'podcasts'"
                >
                  Podcasts
                </button>
              </div>
            </div>

            <!-- ARTISTAS -->
            <transition name="accordion-fade">
              <div class="accordion__content" v-show="activeTab === 'artists'">
                <div v-if="favoriteArtists.length" class="accordion__related">
                  <div
                    v-for="artist in favoriteArtists"
                    :key="artist.id"
                    class="accordion__related-container"
                  >
                    <img
                      :src="artist.picture_medium"
                      :alt="artist.name"
                      class="accordion__related-picture"
                    />
                    <h1 class="accordion__related-text">{{ artist.name }}</h1>
                    <p class="accordion__related-fan">
                      {{ numberReformed(artist.nb_fan) }}
                    </p>
                    <p class="accordion__related-album">
                      {{ numberReformed(artist.nb_album) }} álbuns
                    </p>
                    <button @click="removeFavorite(artist.id)">
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
              </div>
            </transition>

            <!-- MÚSICAS -->
            <transition name="accordion-fade">
              <transition name="accordion-fade">
                <div class="accordion__content" v-show="activeTab === 'tracks'">
                  <div v-if="favoriteTracks.length" class="accordion__track">
                    <table class="accordion__track-list">
                      <thead>
                        <tr class="accordion__track-bottom">
                          <th>Música</th>
                          <th>Álbum</th>
                          <th>
                            <img
                              src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
                              alt=""
                            />
                          </th>
                        </tr>
                      </thead>
                      <tbody class="accordion__track-container">
                        <tr
                          v-for="(track, index) in favoriteTracks"
                          :key="track.id"
                          @mouseover="highlightedRow = index"
                          @mouseleave="highlightedRow = null"
                          ref="trackRows"
                          :class="{ highlighted: highlightedRow === index }"
                        >
                          <audio
                            ref="audioPlayers"
                            :src="track.preview"
                          ></audio>

                          <td class="accordion__track-group">
                            <img
                              :src="track.album.cover_small"
                              :alt="track.title"
                              @click="playPreview(index)"
                              @mouseover="currentTrackIndex = index"
                              @mouseleave="currentTrackIndex = null"
                            />
                            <h1>
                              <router-link
                                :to="{
                                  name: 'DetailsTrack',
                                  params: { id: track.id },
                                }"
                              >
                                {{ index + 1 }} - {{ track.title }}
                              </router-link>
                            </h1>
                          </td>

                          <td>
                            <router-link
                              :to="{
                                name: 'DetailsAlbum',
                                params: { id: track.album.id },
                              }"
                            >
                              {{ track.album.title }}
                            </router-link>
                          </td>

                          <td>{{ durationReformed(track.duration) }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Caso não tenha músicas favoritas -->
                  <div v-else class="page__empty">
                    <img
                      class="page__empty-img"
                      src="../assets/notfound.png"
                      alt="Sem músicas favoritas"
                    />
                    <p class="page__empty-message">
                      🎧 Você ainda não adicionou nenhuma música aos favoritos.
                      🎧
                    </p>
                  </div>
                </div>
              </transition>
            </transition>

            <!-- ÁLBUNS -->
            <transition name="accordion-fade">
              <div class="accordion__content" v-show="activeTab === 'albums'">
                <div v-if="favoriteAlbuns.length" class="favorites-list">
                  <div v-for="album in favoriteAlbuns" :key="album.id">
                    <img :src="album.cover_medium" :alt="album.title" />
                    <p>{{ album.title }}</p>
                    <button @click="removeAlbum(album.id)">
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
                <div v-else class="page__empty">
                  <p>📀 Nenhum álbum favorito.</p>
                </div>
              </div>
            </transition>

            <!-- PLAYLISTS -->
            <transition name="accordion-fade">
              <div
                class="accordion__content"
                v-show="activeTab === 'playlists'"
              >
                <div v-if="favoritePlaylists.length" class="favorites-list">
                  <div v-for="playlist in favoritePlaylists" :key="playlist.id">
                    <img :src="playlist.picture_medium" :alt="playlist.title" />
                    <p>{{ playlist.title }}</p>
                    <button @click="removePlaylists(playlist.id)">
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
                <div v-else class="page__empty">
                  <p>📂 Nenhuma playlist favorita.</p>
                </div>
              </div>
            </transition>

            <!-- PODCASTS -->
            <transition name="accordion-fade">
              <div class="accordion__content" v-show="activeTab === 'podcasts'">
                <div v-if="favoritePodcasts.length" class="favorites-list">
                  <div v-for="podcast in favoritePodcasts" :key="podcast.id">
                    <img :src="podcast.picture_medium" :alt="podcast.title" />
                    <p>{{ podcast.title }}</p>
                    <button @click="removePodcasts(podcast.id)">
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
                <div v-else class="page__empty">
                  <p>🎙️ Nenhum podcast favorito.</p>
                </div>
              </div>
            </transition>
          </article>
        </div>
      </article>
    </div>
  </div>
  <Footer />
</template>

<script>
import { formatNumber } from "../untils/formatNumber.js"
import { formatDuration } from "../untils/formatDuration.js"
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import Footer from "./Footer.vue"

export default {
  name: "Favorites",
  components: { Header, Sidebar, Footer },
  data() {
    return {
      activeTab: "artists",
      favoriteArtists: [],
      favoriteTracks: [],
      favoriteAlbuns: [],
      favoritePlaylists: [],
      favoritePodcasts: [],
      audioPlayers: [],
      trackRows: [],
      snackbarVisible: false,
      highlightedRow: null,
      currentTrackIndex: null,
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
    durationReformed(seconds) {
      return formatDuration(seconds)
    },
  },
}
</script>