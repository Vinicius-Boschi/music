<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="page">
      <div v-if="snackbarVisible" class="page__snackbar">
        {{ snackbarMessage }}
      </div>
      <!-- Accordion -->
      <article class="accordion">
        <div class="accordion__about-center">
          <article class="accordion__about">
            <div class="accordion__about-title">
              <h1 class="accordion__title-fav">Favoritos</h1>
              <p class="accordion__subtitle">0 seguidor | 0 seguindo</p>
              <button class="accordion__btn-fav" @click="playRandomFavorite">
                <img
                  src="../assets/icons/shuffle-solid-full.png"
                  alt="icone de aleatório"
                />
                <p>Minha música - aleatório</p>
              </button>
            </div>
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
                  :class="{ active: activeTab === 'albuns' }"
                  @click="activeTab = 'albuns'"
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
                <div class="accordion__content-search">
                  <h1 class="accordion__content-title">
                    {{ favoriteArtists.length }} artistas
                  </h1>
                  <div class="accordion__content-btns">
                    <div class="accordion__btn-search">
                      <img
                        src="../assets/icons/search-solid-full.png"
                        alt="search"
                      />
                      <input
                        v-model="search"
                        type="text"
                        placeholder="Buscar nas faixas"
                      />
                    </div>
                    <div class="accordion__sort">
                      <button @click="isOpen = !isOpen" class="accordion__drop">
                        {{ selected.label }}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path fill="currentColor" d="M7 10l5 5 5-5z" />
                        </svg>
                      </button>
                      <ul v-if="isOpen" class="accordion__menu">
                        <li
                          :class="{ active: sortOption === option.value }"
                          v-for="option in sortOptions"
                          :key="option.value"
                          @click="selectOption(option)"
                        >
                          {{ option.label }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion__related" v-if="favoriteArtists.length">
                  <div
                    v-for="artist in sortedArtists"
                    :key="artist.id"
                    class="accordion__related-container"
                  >
                    <router-link
                      :to="{
                        name: 'Details',
                        params: { id: artist.id },
                      }"
                    >
                      <img
                        :src="artist.picture_medium"
                        :alt="artist.name"
                        class="accordion__picture rounded"
                      />
                    </router-link>
                    <h1 class="accordion__related-text">{{ artist.name }}</h1>
                    <p class="accordion__related-fan">
                      {{ numberReformed(artist.nb_fan) }}
                    </p>
                    <p class="accordion__related-album">
                      {{ numberReformed(artist.nb_album) }} álbuns
                    </p>
                    <button
                      class="accordion__remove"
                      @click="removeFavorite(artist.id)"
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
                <div v-else class="page__empty">
                  <img
                    class="page__empty-img"
                    src="../assets/icons/notfound.png"
                    alt="Sem artistas favoritos"
                  />
                  <p class="page__empty-message">
                    🙍‍♂️ Você ainda não adicionou nenhum artista aos favoritos. 🙍‍♂️
                  </p>
                </div>
              </div>
            </transition>

            <!-- MÚSICAS -->
            <transition name="accordion-fade">
              <div class="accordion__content" v-show="activeTab === 'tracks'">
                <div class="accordion__header">
                  <h1 class="accordion__content-title">
                    {{ favoriteTracks.length }} mais queridas
                  </h1>
                  <div class="accordion__buttons">
                    <div class="accordion__btns">
                      <button
                        class="accordion__btn-play"
                        @click="startSequentialPlayback"
                      >
                        <img
                          src="../assets/icons/play-solid-full.png"
                          alt="play"
                        />
                      </button>
                      <button class="accordion__btn-share">
                        <img
                          src="../assets/icons/share-solid-full.png"
                          alt="share"
                        />
                      </button>
                    </div>
                    <div class="accordion__btn-search">
                      <img
                        src="../assets/icons/search-solid-full.png"
                        alt="search"
                      />
                      <input
                        v-model="search"
                        type="text"
                        placeholder="Buscar nas faixas"
                      />
                    </div>
                  </div>
                </div>
                <div v-if="favoriteTracks.length" class="accordion__track">
                  <table class="accordion__track-list">
                    <thead>
                      <tr class="accordion__track-bottom">
                        <th>Música</th>
                        <th></th>
                        <th>Artista</th>
                        <th>Álbum</th>
                        <th>Adicionada</th>
                        <th>
                          <img
                            src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
                            alt="clock"
                          />
                        </th>
                      </tr>
                    </thead>
                    <tbody class="accordion__track-container">
                      <tr
                        v-for="(track, index) in sortedTracks"
                        :key="track.id"
                        @mouseover="highlightedRow = index"
                        @mouseleave="highlightedRow = null"
                        ref="trackRows"
                        :class="{ highlighted: highlightedRow === index }"
                      >
                        <audio ref="audioPlayers" :src="track.preview"></audio>
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
                          <button
                            class="accordion__remove"
                            @click="removeTrack(track.id)"
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
                        </td>
                        <td>
                          <router-link
                            :to="{
                              name: 'Details',
                              params: { id: track.artist.id },
                            }"
                          >
                            {{ track.artist.name }}
                          </router-link>
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
                        <td>{{ dateReformed(track.addedAt) }}</td>
                        <td>{{ durationReformed(track.duration) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div v-else class="page__empty">
                  <img
                    class="page__empty-img"
                    src="../assets/icons/notfound.png"
                    alt="Sem músicas favoritas"
                  />
                  <p class="page__empty-message">
                    🎧 Você ainda não adicionou nenhuma música aos favoritos. 🎧
                  </p>
                </div>
              </div>
            </transition>

            <!-- ÁLBUNS -->
            <transition name="accordion-fade">
              <div class="accordion__content" v-show="activeTab === 'albuns'">
                <div class="accordion__content-search">
                  <h1 class="accordion__content-title">
                    {{ favoriteAlbuns.length }} álbuns
                  </h1>
                  <div class="accordion__content-btns">
                    <div class="accordion__btn-search">
                      <img
                        src="../assets/icons/search-solid-full.png"
                        alt="search"
                      />
                      <input
                        v-model="search"
                        type="text"
                        placeholder="Buscar nas faixas"
                      />
                    </div>
                    <div class="accordion__sort">
                      <button @click="isOpen = !isOpen" class="accordion__drop">
                        {{ selected.label }}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path fill="currentColor" d="M7 10l5 5 5-5z" />
                        </svg>
                      </button>
                      <ul v-if="isOpen" class="accordion__menu">
                        <li
                          :class="{ active: sortOption === option.value }"
                          v-for="option in sortOptions"
                          :key="option.value"
                          @click="selectOption(option)"
                        >
                          {{ option.label }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion__related" v-if="favoriteAlbuns.length">
                  <div
                    class="accordion__related-container"
                    v-for="album in sortedAlbuns"
                    :key="album.id"
                  >
                    <img
                      class="accordion__picture"
                      :src="album.cover_medium"
                      :alt="album.title"
                    />
                    <p class="accordion__related-text">{{ album.title }}</p>
                    <button
                      class="accordion__remove"
                      @click="removeAlbum(album.id)"
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
                <div v-else class="page__empty">
                  <img
                    class="page__empty-img"
                    src="../assets/icons/notfound.png"
                    alt="Sem músicas favoritas"
                  />
                  <p class="page__empty-message">
                    📀 Você ainda não adicionou nenhuma música aos favoritos. 📀
                  </p>
                </div>
              </div>
            </transition>

            <!-- PLAYLISTS -->
            <transition name="accordion-fade">
              <div
                class="accordion__content"
                v-show="activeTab === 'playlists'"
              >
                <div class="accordion__content-search">
                  <h1 class="accordion__content-title">
                    {{ favoritePlaylists.length }} playlists
                  </h1>
                  <div class="accordion__content-btns">
                    <div class="accordion__btn-search">
                      <img
                        src="../assets/icons/search-solid-full.png"
                        alt="search"
                      />
                      <input
                        v-model="search"
                        type="text"
                        placeholder="Buscar nas faixas"
                      />
                    </div>
                    <div class="accordion__sort">
                      <button @click="isOpen = !isOpen" class="accordion__drop">
                        {{ selected.label }}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path fill="currentColor" d="M7 10l5 5 5-5z" />
                        </svg>
                      </button>
                      <ul v-if="isOpen" class="accordion__menu">
                        <li
                          :class="{ active: sortOption === option.value }"
                          v-for="option in sortOptions"
                          :key="option.value"
                          @click="selectOption(option)"
                        >
                          {{ option.label }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion__related" v-if="favoritePlaylists.length">
                  <div
                    class="accordion__related-container"
                    v-for="playlist in sortedPlaylists"
                    :key="playlist.id"
                  >
                    <img
                      class="accordion__picture"
                      :src="playlist.picture_medium"
                      :alt="playlist.title"
                    />
                    <p class="accordion__related-text">{{ playlist.title }}</p>
                    <button
                      class="accordion__remove"
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
                <div v-else class="page__empty">
                  <img
                    class="page__empty-img"
                    src="../assets/icons/notfound.png"
                    alt="Sem músicas favoritas"
                  />
                  <p class="page__empty-message">
                    📂 Você ainda não adicionou nenhuma playlist aos favoritos.
                    📂
                  </p>
                </div>
              </div>
            </transition>

            <!-- PODCASTS -->
            <transition name="accordion-fade">
              <div class="accordion__content" v-show="activeTab === 'podcasts'">
                <div class="accordion__content-search">
                  <h1 class="accordion__content-title">
                    {{ favoritePodcasts.length }} podcast
                  </h1>
                  <div class="accordion__content-btns">
                    <div class="accordion__btn-search">
                      <img
                        src="../assets/icons/search-solid-full.png"
                        alt="search"
                      />
                      <input
                        v-model="search"
                        type="text"
                        placeholder="Buscar nas faixas"
                      />
                    </div>
                    <div class="accordion__sort">
                      <button @click="isOpen = !isOpen" class="accordion__drop">
                        {{ selected.label }}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                        >
                          <path fill="currentColor" d="M7 10l5 5 5-5z" />
                        </svg>
                      </button>
                      <ul v-if="isOpen" class="accordion__menu">
                        <li
                          :class="{ active: sortOption === option.value }"
                          v-for="option in sortOptions"
                          :key="option.value"
                          @click="selectOption(option)"
                        >
                          {{ option.label }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div class="accordion__related" v-if="favoritePodcasts.length">
                  <div
                    class="accordion__related-container"
                    v-for="podcast in sortedPodcasts"
                    :key="podcast.id"
                  >
                    <img
                      class="accordion__picture"
                      :src="podcast.picture_medium"
                      :alt="podcast.title"
                    />
                    <p class="accordion__related-text">{{ podcast.title }}</p>
                    <button
                      class="accordion__remove"
                      @click="removePodcasts(podcast.id)"
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
                <div v-else class="page__empty">
                  <img
                    class="page__empty-img"
                    src="../assets/icons/notfound.png"
                    alt="Sem músicas favoritas"
                  />
                  <p class="page__empty-message">
                    🎙️ Você ainda não adicionou nenhum podcast aos favoritos. 🎙️
                  </p>
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
import { formatDate } from "../untils/formatDate.js"
import { ref, nextTick } from "vue"
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
      snackbarMessage: "",
      highlightedRow: null,
      currentTrackIndex: null,
      currentTrack: null,
      audioPlayer: null,
      sortOption: "recent",
      isOpen: false,
      search: "",
      selected: { label: "Adicionados recentemente", value: "recent" },
      sortOptions: [
        { label: "Ordem alfabética", value: "alphabetical" },
        { label: "Adicionados recentemente", value: "recent" },
      ],
    }
  },
  mounted() {
    this.loadFavoriteArtists()
    this.loadFavoriteAlbuns()
    this.loadFavoritePlaylists()
    this.loadFavoritePodcasts()
    this.loadFavoriteTracks().then(() => {
      this.audioPlayers = this.$refs.audioPlayers
      this.trackRows = this.$refs.trackRows
    })
  },
  computed: {
    sortedArtists() {
      const searchTerm = this.search.trim().toLowerCase()
      let filtered = this.favoriteArtists

      if (searchTerm) {
        filtered = filtered.filter((artist) =>
          artist.name.toLowerCase().includes(searchTerm)
        )
      }

      if (this.sortOption === "alphabetical") {
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
      } else {
        return [...filtered].sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        )
      }
    },
    sortedAlbuns() {
      const searchTerm = this.search.trim().toLowerCase()
      let filtered = this.favoriteAlbuns

      if (searchTerm) {
        filtered = filtered.filter((album) =>
          album.title.toLowerCase().includes(searchTerm)
        )
      }

      if (this.sortOption === "alphabetical") {
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      } else {
        return [...filtered].sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        )
      }
    },
    sortedPlaylists() {
      const searchTerm = this.search.trim().toLowerCase()
      let filtered = this.favoritePlaylists

      if (searchTerm) {
        filtered = filtered.filter((playlist) =>
          playlist.title.toLowerCase().includes(searchTerm)
        )
      }

      if (this.sortOption === "alphabetical") {
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      } else {
        return [...filtered].sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        )
      }
    },
    sortedPodcasts() {
      const searchTerm = this.search.trim().toLowerCase()
      let filtered = this.favoritePodcasts

      if (searchTerm) {
        filtered = filtered.filter((podcast) =>
          podcast.title.toLowerCase().includes(searchTerm)
        )
      }

      if (this.sortOption === "alphabetical") {
        return [...filtered].sort((a, b) => a.title.localeCompare(b.title))
      } else {
        return [...filtered].sort(
          (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
        )
      }
    },
    sortedTracks() {
      return this.favoriteTracks
        .filter((track) =>
          track.title.toLowerCase().includes(this.search.toLowerCase())
        )
        .sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt))
    },
  },
  filteredArtists() {
    const searchTerm = this.search.trim().toLowerCase()
    if (!searchTerm) return this.artists

    return this.artists.filter((artist) =>
      artist.name.toLowerCase().includes(searchTerm)
    )
  },
  methods: {
    async loadFavoriteArtists() {
      const saved = localStorage.getItem("favorites_artists")
      if (!saved) return

      try {
        const parsed = JSON.parse(saved)
        const favoriteIds = parsed.map((item) => ({
          id: item.id,
          addedAt: item.addedAt,
        }))

        const requests = favoriteIds.map((entry) =>
          fetch(`https://api.deezer.com/artist/${entry.id}`)
            .then((res) => res.json())
            .then((artist) => ({ ...artist, addedAt: entry.addedAt }))
        )

        const results = await Promise.all(requests)
        this.favoriteArtists = results.filter((artist) => artist && artist.id)
      } catch (e) {
        console.error("Erro ao carregar artistas:", e)
      }
    },
    async loadFavoriteTracks() {
      const saved = localStorage.getItem("favorites_tracks")
      if (!saved) return

      try {
        let favoriteIds = JSON.parse(saved)

        if (
          typeof favoriteIds[0] === "string" ||
          typeof favoriteIds[0] === "number"
        ) {
          favoriteIds = favoriteIds.map((id) => ({
            id,
            addedAt: new Date().toISOString(),
          }))
          localStorage.setItem("favorites_tracks", JSON.stringify(favoriteIds))
        }

        const requests = favoriteIds.map((item) =>
          fetch(`https://api.deezer.com/track/${item.id}`)
            .then((res) => res.json())
            .then((track) => ({
              ...track,
              addedAt: item.addedAt,
            }))
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
        const parsed = JSON.parse(saved)
        const favoriteIds = parsed.map((item) => ({
          id: item.id,
          addedAt: item.addedAt,
        }))

        const requests = favoriteIds.map((entry) =>
          fetch(`https://api.deezer.com/album/${entry.id}`)
            .then((res) => res.json())
            .then((album) => ({
              ...album,
              addedAt: entry.addedAt,
            }))
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
        const parsed = JSON.parse(saved)
        const favoriteIds = parsed.map((item) => ({
          id: item.id,
          addedAt: item.addedAt,
        }))
        const requests = favoriteIds.map((entry) =>
          fetch(`https://api.deezer.com/playlist/${entry.id}`)
            .then((res) => res.json())
            .then((playlist) => ({
              ...playlist,
              addedAt: entry.addedAt,
            }))
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
        const parsed = JSON.parse(saved)
        const favoriteIds = parsed.map((item) => ({
          id: item.id,
          addedAt: item.addedAt,
        }))

        const requests = favoriteIds.map((entry) =>
          fetch(`https://api.deezer.com/podcast/${entry.id}`)
            .then((res) => res.json())
            .then((podcast) => ({
              ...podcast,
              addedAt: entry.addedAt,
            }))
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

      try {
        const parsed = JSON.parse(saved)
        const updated = parsed.filter((item) => item.id !== id)
        localStorage.setItem("favorites_artists", JSON.stringify(updated))
        this.favoriteArtists = this.favoriteArtists.filter(
          (artist) => artist.id !== id
        )

        this.snackbarMessage = "Artista removido dos favoritos."
        this.snackbarVisible = true
        setTimeout(() => {
          this.snackbarVisible = false
        }, 2000)
      } catch (e) {
        console.error("Erro ao remover favorito:", e)
      }
    },
    removeTrack(id) {
      const saved = localStorage.getItem("favorites_tracks")
      if (!saved) return

      try {
        const parsed = JSON.parse(saved)
        const update = parsed.filter((item) => item.id !== id)
        localStorage.setItem("favorites_tracks", JSON.stringify(update))
        this.favoriteTracks = this.favoriteTracks.filter(
          (track) => track.id !== id
        )

        this.snackbarMessage = "Música removida dos favoritos."
        this.snackbarVisible = true
        setTimeout(() => {
          this.snackbarVisible = false
        }, 2000)
      } catch (e) {
        console.error("Erro ao remover música favorita:", e)
      }
    },
    removeAlbum(id) {
      const saved = localStorage.getItem("favorites_albuns")
      if (!saved) return

      try {
        const parsed = JSON.parse(saved)
        const updated = parsed.filter((item) => item.id !== id)
        localStorage.setItem("favorites_albuns", JSON.stringify(updated))
        this.favoriteAlbuns = this.favoriteAlbuns.filter(
          (album) => album.id !== id
        )

        this.snackbarMessage = "Album removido dos favoritos."
        this.snackbarVisible = true
        setTimeout(() => {
          this.snackbarVisible = false
        }, 2000)
      } catch (e) {
        console.error("Erro ao remover álbum favorito:", e)
      }
    },
    removePlaylists(id) {
      const saved = localStorage.getItem("favorites_playlists")
      if (!saved) return

      try {
        const parsed = JSON.parse(saved)
        const updated = parsed.filter((item) => item.id !== id)
        localStorage.setItem("favorites_playlists", JSON.stringify(updated))
        this.favoritePlaylists = this.favoritePlaylists.filter(
          (playlist) => playlist.id !== id
        )

        this.snackbarMessage = "Playlist removido dos favoritos."
        this.snackbarVisible = true
        setTimeout(() => {
          this.snackbarVisible = false
        }, 2000)
      } catch (e) {
        console.error("Erro ao remover favorito:", e)
      }
    },
    removePodcasts(id) {
      const saved = localStorage.getItem("favorites_podcast")
      if (!saved) return

      try {
        const parsed = JSON.parse(saved)
        const updated = parsed.filter((item) => item.id !== id)
        localStorage.setItem("favorites_podcast", JSON.stringify(updated))
        this.favoritePodcasts = this.favoritePodcasts.filter(
          (podcast) => podcast.id !== id
        )

        this.snackbarMessage = "Podcast removido dos favoritos."
        this.snackbarVisible = true
        setTimeout(() => {
          this.snackbarVisible = false
        }, 2000)
      } catch (e) {
        console.error("Erro ao remover podcast favorito:", e)
      }
    },
    getRandomTracks(tracks) {
      const randomIndex = Math.floor(Math.random() * tracks.length)
      return tracks[randomIndex]
    },
    playTrack(track) {
      if (!track || !track.preview) return

      const audio = new Audio(track.preview)
      audio.play()
    },
    async playRandomFavorite() {
      const favsRaw = localStorage.getItem("favorites_tracks")
      const favoriteTracks = favsRaw ? JSON.parse(favsRaw) : []

      if (favoriteTracks.length === 0) {
        alert("Você não tem músicas favoritas para tocar.")
        return
      }

      const random = this.getRandomTracks(favoriteTracks)
      const trackId = random.id

      try {
        const response = await fetch(`https://api.deezer.com/track/${trackId}`)
        const track = await response.json()

        if (!track.preview) {
          alert("Esta música não tem preview disponível.")
          return
        }

        const audio = new Audio(track.preview)
        audio.play()
      } catch (error) {
        console.error("Erro ao buscar dados da música:", error)
      }
    },
    async startSequentialPlayback() {
      const favsRaw = localStorage.getItem("favorites_tracks")
      const favoriteTracks = favsRaw ? JSON.parse(favsRaw) : []

      if (favoriteTracks.length === 0) {
        alert("Você não tem músicas favoritas para tocar.")
        return
      }

      const tracks = await Promise.all(
        favoriteTracks.map((track) =>
          fetch(`https://api.deezer.com/track/${track.id}`).then((res) =>
            res.json()
          )
        )
      )

      this.favoriteTracks = tracks.filter((track) => track && track.preview)

      if (this.favoriteTracks.length === 0) {
        alert("Nenhuma das músicas favoritas tem preview disponível.")
        return
      }

      this.currentTrackIndex = 0
      this.currentTrack = this.favoriteTracks[0]

      this.playCurrent()
    },
    playCurrent() {
      const track = this.favoriteTracks[this.currentTrackIndex]

      if (!track || !track.preview) {
        console.warn("Esta música não tem preview disponível.")
        return
      }

      if (this.audioPlayer) {
        this.audioPlayer.pause()
        this.audioPlayer = null
      }

      this.audioPlayer = new Audio(track.preview)
      this.audioPlayer.addEventListener("ended", this.playNextTrack)
      this.audioPlayer.play().catch((e) => {
        console.error("Erro ao tocar: ", e)
        this.playNextTrack()
      })
    },
    playNextTrack() {
      this.currentTrackIndex++
      if (this.currentTrackIndex >= this.favoriteTracks.length) {
        this.currentTrack = null
        return
      }

      this.currentTrack = this.favoriteTracks[this.currentTrackIndex]
      this.playCurrent()
    },
    playPreview(index) {
      this.audioPlayers.forEach((player) => player.pause())
      this.audioPlayers[index].play()
    },
    numberReformed(number) {
      return formatNumber(number)
    },
    durationReformed(seconds) {
      return formatDuration(seconds)
    },
    dateReformed(dateString) {
      return formatDate(dateString)
    },
    selectOption(option) {
      this.sortOption = option.value
      this.selected = option
      this.isOpen = false
    },
  },
}
</script>
<style lang="scss" scoped>
li.active {
  border: none;
}
</style>