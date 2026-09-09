<template>
  <section class="accordion">
    <div class="accordion__about-center">
      <article class="accordion__about">
        <div class="accordion__btn-container">
          <div class="accordion__btn-container-content">
            <button
              class="accordion__tab-btn"
              :class="{ active: activeTab === 'discography' }"
              @click="activeTab = 'discography'"
            >
              Discografia
            </button>
            <button
              class="accordion__tab-btn"
              :class="{ active: activeTab === 'top_track' }"
              @click="activeTab = 'top_track'"
            >
              Top Músicas
            </button>
            <button
              class="accordion__tab-btn"
              :class="{ active: activeTab === 'top_albums' }"
              @click="activeTab = 'top_albums'"
            >
              Top Albums
            </button>
            <button
              class="accordion__tab-btn"
              :class="{ active: activeTab === 'related' }"
              @click="activeTab = 'related'"
            >
              Artistas Semelhantes
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
              :class="{ active: activeTab === 'radio' }"
              @click="activeTab = 'radio'"
            >
              Radio
            </button>
          </div>
        </div>
      </article>
      <article class="accordion__about-content">
        <div class="accordion__content" v-show="activeTab === 'discography'">
          <div class="accordion__about-text">
            <h1 class="accordion__title">Top Músicas</h1>
            <button @click="switchToTopMusics">Vizualizar tudo</button>
          </div>
          <div class="accordion__container">
            <div
              class="accordion__info"
              v-for="(track, index) in tracks?.slice(0, 4) || []"
              :key="track.id"
              @mouseover="highlightedRow = index"
              @mouseleave="highlightedRow = null"
              ref="trackRows"
              :class="{ highlighted: highlightedRow === index }"
            >
              <img
                class="accordion__picture"
                :src="track.album.cover_small"
                :alt="track.title"
                @click="playTrack(index)"
                @mouseover="currentTrackIndex = index"
                @mouseleave="currentTrackIndex = null"
              />
              <h1 class="accordion__track-name">
                <router-link
                  :to="{ name: 'DetailsTrack', params: { id: track.id } }"
                >
                  {{ track.title }}
                </router-link>
              </h1>
            </div>
          </div>
        </div>
        <div class="accordion__content" v-show="activeTab === 'top_track'">
          <div class="accordion__track">
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
                  v-for="(track, index) in tracks || []"
                  :key="track.id"
                  @mouseover="highlightedRow = index"
                  @mouseleave="highlightedRow = null"
                  ref="trackRows"
                  :class="{ highlighted: highlightedRow === index }"
                >
                  <td class="accordion__track-group">
                    <img
                      :src="track.album.cover_small"
                      :alt="track.title"
                      @click="playTrack(index)"
                      @mouseover="currentTrackIndex = index"
                      @mouseleave="currentTrackIndex = null"
                    />
                    <div class="accordion__track-title">
                      <h1>
                        <router-link
                          :to="{
                            name: 'DetailsTrack',
                            params: { id: track.id },
                          }"
                        >
                          {{ track.title }}
                        </router-link>
                      </h1>
                      <button
                        class="accordion__favorite"
                        :class="{
                          'is-favorite': isFavorite('tracks', track.id),
                        }"
                        @click.stop="toggleFavorite('tracks', track)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
        C13.09 3.81 14.76 3 16.5 3
        19.58 3 22 5.42 22 8.5
        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                      </button>
                    </div>
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
        </div>
        <div class="accordion__content" v-show="activeTab === 'top_albums'">
          <div class="accordion__playlist">
            <div
              class="accordion__playlist-container"
              v-for="(album, index) in albums || []"
              :key="index"
            >
              <div class="accordion__image-container">
                <router-link
                  :to="{ name: 'DetailsAlbum', params: { id: album.id } }"
                >
                  <img
                    class="accordion__picture"
                    :src="album.cover_medium"
                    :alt="album.title"
                  />
                </router-link>

                <button
                  class="accordion__favorite"
                  :class="{ 'is-favorite': isFavorite('albuns', album.id) }"
                  @click.stop="toggleFavorite('albuns', album)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
        2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
        C13.09 3.81 14.76 3 16.5 3
        19.58 3 22 5.42 22 8.5
        c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </button>
              </div>
              <h1 class="accordion__playlist-text">{{ album.title }}</h1>
            </div>
          </div>
        </div>
        <div class="accordion__content" v-show="activeTab === 'related'">
          <div class="accordion__related">
            <div
              class="accordion__related-container"
              v-for="(related, index) in relateds || []"
              :key="index"
            >
              <div class="accordion__image-container">
                <router-link
                  :to="{ name: 'Details', params: { id: related.id } }"
                >
                  <img
                    class="accordion__picture"
                    :src="related.picture_medium"
                    :alt="related.name"
                  />
                </router-link>
                <button
                  class="accordion__favorite"
                  :class="{
                    'is-favorite': isFavorite('artists', related.id),
                  }"
                  @click.stop="toggleFavorite('artists', related)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
      C13.09 3.81 14.76 3 16.5 3
      19.58 3 22 5.42 22 8.5
      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </button>
              </div>
              <h1 class="accordion__related-text">{{ related.name }}</h1>
              <p class="accordion__related-fan">
                {{ numberReformed(related.nb_fan) }} fãs
              </p>
              <p class="accordion__related-album">
                {{ related.nb_album }} álbuns
              </p>
            </div>
          </div>
        </div>
        <div class="accordion__content" v-show="activeTab === 'playlists'">
          <div class="accordion__playlist">
            <div
              class="accordion__playlist-container"
              v-for="(playlist, index) in playlists || []"
              :key="index"
            >
              <div class="accordion__image-container">
                <router-link
                  :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
                >
                  <img
                    class="accordion__picture"
                    :src="playlist.picture_medium"
                    :alt="playlist.title"
                  />
                </router-link>
                <button
                  class="accordion__favorite"
                  :class="{
                    'is-favorite': isFavorite('playlists', playlist.id),
                  }"
                  @click.stop="toggleFavorite('playlists', playlist)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
      C13.09 3.81 14.76 3 16.5 3
      19.58 3 22 5.42 22 8.5
      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                    />
                  </svg>
                </button>
              </div>
              <h1 class="accordion__playlist-text">{{ playlist.title }}</h1>
            </div>
          </div>
        </div>
        <div class="accordion__content" v-show="activeTab === 'radio'">
          <div class="accordion__track">
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
                  v-for="(radio, index) in radios || []"
                  :key="radio.id"
                  @mouseover="highlightedRow = index"
                  @mouseleave="highlightedRow = null"
                  ref="trackRows"
                  :class="{ highlighted: highlightedRow === index }"
                >
                  <td class="accordion__track-group">
                    <img
                      :src="radio.album.cover_small"
                      :alt="radio.title"
                      @click="playRadio(index)"
                      @mouseover="currentTrackIndex = index"
                      @mouseleave="currentTrackIndex = null"
                    />
                    <div class="accordion__track-title">
                      <h1>
                        <router-link
                          :to="{
                            name: 'DetailsTrack',
                            params: { id: radio.id },
                          }"
                        >
                          {{ radio.title }}
                        </router-link>
                      </h1>
                      <button
                        class="accordion__favorite"
                        :class="{
                          'is-favorite': isFavorite('tracks', radio.id),
                        }"
                        @click.stop="toggleFavorite('tracks', radio)"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
      2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09
      C13.09 3.81 14.76 3 16.5 3
      19.58 3 22 5.42 22 8.5
      c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td>
                    <router-link
                      :to="{
                        name: 'DetailsAlbum',
                        params: { id: radio.album.id },
                      }"
                    >
                      {{ radio.album.title }}
                    </router-link>
                  </td>
                  <td>{{ durationReformed(radio.duration) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
import { formatDuration } from "../untils/formatDuration.js"
import { formatNumber } from "../untils/formatNumber.js"
import { API_BASE } from "../services/api.js"

export default {
  name: "Accordion",
  data() {
    return {
      activeTab: "discography",
      tracks: [],
      relateds: [],
      playlists: [],
      albums: [],
      radios: [],
      currentTrackIndex: null,
      highlightedRow: null,
      favorites: {
        tracks: [],
        albuns: [],
        artists: [],
        playlists: [],
      },
    }
  },
  mounted() {
    this.getTopTracks()
    this.getRelated()
    this.getPlaylists()
    this.getTopAlbums()
    this.getRadio()
    this.loadFavorites()
  },
  watch: {
    "$route.params.id": {
      async handler() {
        this.tracks = []
        this.relateds = []
        this.playlists = []
        this.albums = []
        this.radios = []

        await this.getTopTracks()
        await this.getRelated()
        await this.getPlaylists()
        await this.getTopAlbums()
        await this.getRadio()
      },
    },
  },
  methods: {
    switchToTopMusics() {
      this.activeTab = "top_track"
    },
    async getTopTracks() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `${API_BASE}/deezer/artist/${id}/top?limit=100`,
        )
        const data = await response.json()
        this.tracks = data?.data || []
      } catch (error) {
        console.error("Erro ao buscar as músicas.", error)
        this.tracks = []
      }
    },
    async getTopAlbums() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `${API_BASE}/deezer/artist/${id}/albums?limit=50`,
        )
        const data = await response.json()
        this.albums = data?.data || []
      } catch (error) {
        console.error("Erro ao buscar os albuns.", error)
        this.albums = []
      }
    },
    async getRelated() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`${API_BASE}/deezer/artist/${id}/related`)
        const data = await response.json()
        this.relateds = data?.data || []
      } catch (error) {
        console.error("Erro ao buscar os artistas semelhantes.", error)
        this.relateds = []
      }
    },
    async getPlaylists() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `${API_BASE}/deezer/artist/${id}/playlists?limit=50`,
        )
        const data = await response.json()
        this.playlists = data?.data || []
      } catch (error) {
        console.error("Erro ao buscar as playlists.", error)
        this.playlists = []
      }
    },
    async getRadio() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `${API_BASE}/deezer/artist/${id}/radio?limit=50`,
        )
        const data = await response.json()
        this.radios = data?.data || []
      } catch (error) {
        console.error("Erro ao buscar a rádio.", error)
        this.radios = []
      }
    },
    getFavorites(type) {
      return JSON.parse(localStorage.getItem(`favorites_${type}`)) || []
    },
    isFavorite(type, id) {
      return this.favorites[type].some((item) => {
        return typeof item === "object" ? item.id === id : item === id
      })
    },
    toggleFavorite(type, item) {
      const key = `favorites_${type}`
      const favorites = [...this.favorites[type]]

      const index = favorites.findIndex((favorite) => {
        return typeof favorite === "object"
          ? favorite.id === item.id
          : favorite === item.id
      })

      if (index !== -1) {
        favorites.splice(index, 1)
      } else {
        favorites.push(item)
      }

      this.favorites[type] = favorites

      localStorage.setItem(key, JSON.stringify(favorites))
      window.dispatchEvent(new Event("favorites-updated"))
    },
    loadFavorites() {
      this.favorites.tracks =
        JSON.parse(localStorage.getItem("favorite_tracks")) || []
      this.favorites.albuns =
        JSON.parse(localStorage.getItem("favorite_albuns")) || []
      this.favorites.playlists =
        JSON.parse(localStorage.getItem("favorite_playlists")) || []
      this.favorites.artists =
        JSON.parse(localStorage.getItem("favorite_artists")) || []
    },
    durationReformed(seconds) {
      return formatDuration(seconds)
    },
    numberReformed(number) {
      return formatNumber(number)
    },
    playTrack(index) {
      const track = this.tracks[index]

      if (!track || !track.preview) return

      window.dispatchEvent(
        new CustomEvent("track-changed", {
          detail: {
            track,
            queue: this.tracks,
            index,
          },
        }),
      )
    },

    playRadio(index) {
      const radio = this.radios[index]

      if (!radio || !radio.preview) return

      window.dispatchEvent(
        new CustomEvent("track-changed", {
          detail: {
            track: radio,
            queue: this.radios,
            index,
          },
        }),
      )
    },
  },
}
</script>