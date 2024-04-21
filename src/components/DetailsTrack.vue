<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div class="details">
      <img
        v-if="track && track.album"
        :src="track.album.cover_medium"
        :alt="track.title"
      />
      <div class="details__container">
        <h1>{{ track.title }}</h1>
        <div class="details__singer" v-if="track.artist">
          <img :src="track.artist.picture" :alt="track.artist.name" />
          <router-link
            :to="{ name: 'Details', params: { id: track.artist.id } }"
          >
            {{ track.artist.name }}
          </router-link>
        </div>
        <div v-else>
          <h1>Artista não encontrado</h1>
        </div>
        <div class="details__info">
          <img
            class="details__watch"
            src="https://github.com/Vinicius-Boschi/music/assets/74377158/8cf18291-ad74-4476-8288-12ef0a90e1da"
            alt="icon watch"
          />
          <p>{{ formatDuration(track.duration) }} minutos</p>
        </div>
      </div>
    </div>
    <div class="details__button">
      <audio ref="audioPlayers" :src="track.preview"></audio>
      <button @click="playPreview(index)">
        <span>
          <img
            src="https://github.com/Vinicius-Boschi/music/assets/74377158/1a2d6fe5-7258-472d-b786-56f2eb12019b"
            alt="play button"
          />
        </span>
        <div>
          <p>Ouvir</p>
        </div>
      </button>
    </div>
  </div>
  <Footer />
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import Footer from "./Footer.vue";

export default {
  name: "DetailsTrack",
  props: ["id"],
  data() {
    return {
      track: {},
      audioPlayers: [],
    };
  },
  components: {
    Header,
    Sidebar,
    Footer,
  },
  mounted() {
    this.getDetailsTrack().then(() => {
      this.audioPlayers = this.$refs.audioPlayers;
    });
  },
  methods: {
    async getDetailsTrack() {
      try {
        const id = this.$route.params.id;
        const response = await fetch(`http://localhost:3000/track/${id}`);
        const data = await response.json();
        this.track = data;
      } catch (error) {
        console.error("Erro ao buscar a música", error);
      }
    },
    formatDuration(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      const formattedMinutes = String(minutes).padStart(2, "0");
      const formattedSeconds = String(remainingSeconds).padStart(2, "0");
      return `${formattedMinutes}:${formattedSeconds}`;
    },
    playPreview() {
      this.audioPlayers.pause();
      this.audioPlayers.play();
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/detailsTrack.scss";
</style>
