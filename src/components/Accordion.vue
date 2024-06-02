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
              v-for="(track, index) in tracks.slice(0, 4)"
              :key="index"
              @mouseover="highlightedRow = index"
              @mouseleave="highlightedRow = null"
              ref="trackRows"
              :class="{ highlighted: highlightedRow === index }"
            >
              <audio ref="audioPlayers" :src="track.preview"></audio>
              <img
                class="accordion__picture"
                :src="track.album.cover_small"
                :alt="track.title"
                @click="playPreview(index)"
                @mouseover="currentTrackIndex = index"
                @mouseleave="currentTrackIndex = null"
              />
              <h1 class="accordion__track-name">
                <router-link
                  :to="{ name: 'DetailsTrack', params: { id: track.id } }"
                >
                  {{ index + 1 }} - {{ track.title }}
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
                  v-for="(track, index) in tracks"
                  :key="index"
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
                        :to="{ name: 'DetailsTrack', params: { id: track.id } }"
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
                  <td>{{ formatDuration(track.duration) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="accordion__content" v-show="activeTab === 'top_albums'">
          <div class="accordion__playlist">
            <div
              class="accordion__playlist-container"
              v-for="(album, index) in albums"
              :key="index"
            >
              <router-link
                :to="{ name: 'DetailsAlbum', params: { id: album.id } }"
              >
                <img
                  class="accordion__playlist-picture"
                  :src="album.cover_medium"
                  :alt="album.title"
                />
              </router-link>
              <h1 class="accordion__playlist-text">{{ album.title }}</h1>
            </div>
          </div>
        </div>
        <div class="accordion__content" v-show="activeTab === 'related'">
          <div class="accordion__related">
            <div
              class="accordion__related-container"
              v-for="(related, index) in relateds"
              :key="index"
            >
              <router-link
                :to="{ name: 'Details', params: { id: related.id } }"
              >
                <img
                  class="accordion__related-picture"
                  :src="related.picture_medium"
                  :alt="related.name"
                />
              </router-link>
              <h1 class="accordion__related-text">{{ related.name }}</h1>
              <p class="accordion__related-fan">
                {{ formatNumber(related.nb_fan) }} fãs
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
              v-for="(playlist, index) in playlists"
              :key="index"
            >
              <router-link
                :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
              >
                <img
                  class="accordion__playlist-picture"
                  :src="playlist.picture_medium"
                  :alt="playlist.title"
                />
              </router-link>
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
                  v-for="(radio, index) in radios"
                  :key="index"
                  @mouseover="highlightedRow = index"
                  @mouseleave="highlightedRow = null"
                  ref="trackRows"
                  :class="{ highlighted: highlightedRow === index }"
                >
                  <audio ref="audioPlayers" :src="radio.preview"></audio>
                  <td class="accordion__track-group">
                    <img
                      :src="radio.album.cover_small"
                      :alt="radio.title"
                      @click="playPreview(index)"
                      @mouseover="currentTrackIndex = index"
                      @mouseleave="currentTrackIndex = null"
                    />
                    <h1>
                      <router-link
                        :to="{ name: 'DetailsTrack', params: { id: radio.id } }"
                      >
                        {{ index + 1 }} - {{ radio.title }}
                      </router-link>
                    </h1>
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
                  <td>{{ formatDuration(radio.duration) }}</td>
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
      audioPlayers: [],
      currentTrackIndex: null,
      highlightedRow: null,
    }
  },
  mounted() {
    this.getTopTracks().then(() => {
      this.audioPlayers = this.$refs.audioPlayers
    })
    this.getRelated()
    this.getPlaylists()
    this.getTopAlbums()
    this.getRadio()
  },
  methods: {
    switchToTopMusics() {
      this.activeTab = "top_track"
    },
    async getTopTracks() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`http://localhost:3000/artist/${id}/top?`)
        const data = await response.json()
        this.tracks = data.data
      } catch (error) {
        console.error("Erro ao buscar o artista.", error)
      }
    },
    async getTopAlbums() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `http://localhost:3000/artist/${id}/albums`
        )
        const data = await response.json()
        this.albums = data.data
      } catch (error) {
        console.error("Erro ao buscar o artista.", error)
      }
    },
    async getRelated() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `http://localhost:3000/artist/${id}/related`
        )
        const data = await response.json()
        this.relateds = data.data
      } catch (error) {
        console.error("Erro ao buscar os artistas semelhantes.", error)
      }
    },
    async getPlaylists() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `http://localhost:3000/artist/${id}/playlists?limit=100`
        )
        const data = await response.json()
        this.playlists = data.data
      } catch (error) {
        console.error("Erro ao buscar as playlists.", error)
      }
    },
    async getRadio() {
      try {
        const id = this.$route.params.id
        const response = await fetch(
          `http://localhost:3000/artist/${id}/radio`
        )
        const data = await response.json()
        this.radios = data.data
      } catch (error) {
        console.error("Erro ao buscar a rádio.", error)
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      const formattedMinutes = String(minutes).padStart(2, "0")
      const formattedSeconds = String(remainingSeconds).padStart(2, "0")
      return `${formattedMinutes}:${formattedSeconds}`
    },
    formatNumber(number) {
      if (number !== undefined && number !== null) {
        return number.toLocaleString("pt-BR")
      } else {
        return "0"
      }
    },
    playPreview(index) {
      this.audioPlayers.forEach((player) => player.pause())
      this.audioPlayers[index].play()
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/accordion.scss";
.highlighted {
  background-color: lightblue;
}
</style>