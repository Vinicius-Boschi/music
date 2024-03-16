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
          </div>
        </div>
      </article>
      <article class="accordion__about-content">
        <div
          class="accordion__content"
          id="about"
          v-show="activeTab === 'discography'"
        >
          <div class="accordion__about-text">
            <h1 class="accordion__title">Top Músicas</h1>
            <button @click="switchToTopMusics">Vizualizar tudo</button>
          </div>
          <div class="accordion__container">
            <div class="accordion__info">
              <img
                class="accordion__picture"
                src="https://placehold.co/50x50"
                alt=""
              />
              <h1 class="accordion__track-name">1. Estado Civil(Ao Vivo)</h1>
            </div>
            <div class="accordion__info">
              <img
                class="accordion__picture"
                src="https://placehold.co/50x50"
                alt=""
              />
              <h1 class="accordion__track-name">1. Estado Civil(Ao Vivo)</h1>
            </div>
            <div class="accordion__info">
              <img
                class="accordion__picture"
                src="https://placehold.co/50x50"
                alt=""
              />
              <h1 class="accordion__track-name">1. Estado Civil(Ao Vivo)</h1>
            </div>
            <div class="accordion__info">
              <img
                class="accordion__picture"
                src="https://placehold.co/50x50"
                alt=""
              />
              <h1 class="accordion__track-name">1. Estado Civil(Ao Vivo)</h1>
            </div>
          </div>
        </div>
        <div
          class="accordion__content"
          id="about"
          v-show="activeTab === 'top_track'"
        >
          <div class="accordion__track">
            <div class="accordion__track-title">
              <h1 class="accordion__title">Top Músicas</h1>
            </div>
            <div class="accordion__track-input">
              <input
                type="search"
                name="search"
                id=""
                placeholder="Buscar nas faixas"
              />
            </div>
            <table class="accordion__track-list">
              <thead>
                <tr class="accordion__track-bottom">
                  <th>Música</th>
                  <th>Álbum</th>
                  <th>
                    <img src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da" alt="" />
                  </th>
                  <th>Rank</th>
                </tr>
              </thead>
              <tbody class="accordion__track-container"  
              >
                <tr v-for="(track, index) in tracks" :key="index"
                @mouseover="highlightedRow  = index"
                @mouseleave="highlightedRow  = null" 
                ref="trackRows"
                :class="{ 'highlighted': highlightedRow === index }"
                >
                  <audio ref="audioPlayers" :src="track.preview"></audio>
                  <td class="accordion__track-group">
                    <img :src="track.album.cover_small" :alt="track.title" @click="playPreview(index)" @mouseover="currentTrackIndex = index"
                  @mouseleave="currentTrackIndex = null"/>
                    <h1> {{ index + 1 }} - {{ track.title }}</h1>
                  </td>
                  <td>{{ track.album.title }}</td>
                  <td>{{ formatDuration(track.duration) }}</td>
                  <td>{{ formatNumber(track.rank) }}</td>
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
      currentTrackIndex: null,
      highlightedRow: null,
    }
  },
  mounted() {
    this.getTopTracks().then(() => {
      this.audioPlayers = this.$refs.audioPlayers;
    })
  },
  methods: {
    switchToTopMusics() {
      this.activeTab = "top_track"
    },
    async getTopTracks() {
      try {
          const id = this.$route.params.id
          const response = await fetch(`http://localhost:3000/artist/${id}/top?limit=100`)
          const data = await response.json()
          this.tracks = data.data
      } catch (error) {
        console.error("Erro ao buscar o artista", error)
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, '0'); 
      const formattedSeconds = String(remainingSeconds).padStart(2, '0'); 
      return `${formattedMinutes}:${formattedSeconds}`;
    },
    formatNumber(number) {
      if (number !== undefined && number !== null) {
        return number.toLocaleString('pt-BR');
      } else {
        return '0';
      }
    },
    playPreview(index) {
      this.audioPlayers.forEach(player => player.pause())
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