<template>
  <div class="content">
    <Header />
    <Sidebar />
    <div>
      <h1 class="chart__genre">{{ genre }}</h1>
      <div class="chart__text">
        <h2 class="chart__title genre">Top playlists {{ genre }}</h2>
      </div>
      <swiper
        :navigation="true"
        :slidesPerView="5"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(playlist, index) in playlists" :key="index">
          <div class="chart__content">
            <div class="chart__content__item">
              <router-link
                :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
              >
                <img
                  class="chart__img"
                  :src="playlist.picture_big"
                  :alt="playlist.title"
                />
                <p class="chart__name left">{{ playlist.title }}</p>
              </router-link>
              <p class="chart__tracks">{{ playlist.nb_tracks }} faixas</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div>
      <div class="chart__text">
        <h2 class="chart__title genre">Artistas {{ genre }} do momento</h2>
      </div>
      <swiper
        :navigation="true"
        :slidesPerView="5"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(artist, index) in artists" :key="index">
          <div class="chart__content">
            <div class="chart__content__item">
              <router-link :to="{ name: 'Details', params: { id: artist.id } }">
                <img
                  class="chart__img rounded"
                  :src="artist.picture"
                  :alt="artist.name"
                />
              </router-link>
              <p class="chart__name">{{ artist.name }}</p>
              <p class="chart__tracks center">
                {{ numberReformed(artist.fans) }} fãs
              </p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>

    <div>
      <div class="chart__text">
        <h2 class="chart__title genre">Vá mais fundo</h2>
      </div>
      <swiper
        :navigation="true"
        :slidesPerView="5"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(album, index) in albums" :key="index">
          <div class="chart__content">
            <div class="chart__content__item">
              <router-link
                :to="{ name: 'DetailsAlbum', params: { id: album.id } }"
              >
                <img
                  class="chart__img"
                  :src="album.cover_big"
                  :alt="album.title"
                />
              </router-link>
              <p class="chart__name left">{{ album.title }}</p>
              <p class="chart__tracks">{{ album.nb_tracks }} faixas</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <div>
      <div class="chart__text">
        <h2 class="chart__title genre">Lançamentos do {{ genre }}</h2>
      </div>
      <swiper
        :navigation="true"
        :slidesPerView="5"
        :spaceBetween="30"
        :modules="modules"
        class="mySwiper"
      >
        <swiper-slide v-for="(release, index) in releases" :key="index">
          <div class="chart__content">
            <div class="chart__content__item">
              <router-link
                :to="{ name: 'DetailsPlaylist', params: { id: release.id } }"
              >
                <img
                  class="chart__img"
                  :src="release.album.cover_big"
                  :alt="release.title"
                />
              </router-link>
              <p class="chart__name left">{{ release.title }}</p>
              <p class="chart__tracks">por {{ release.artist.name }}</p>
              <p class="chart__date">Lançado em {{ release.time_add }}</p>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue";
import Sidebar from "./Sidebar.vue";
import { formatNumber } from "../untils/formatNumber.js";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";

export default {
  props: {
    id: String,
  },
  components: {
    Swiper,
    SwiperSlide,
    Header,
    Sidebar,
  },
  data() {
    return {
      genre: "",
      genres: [],
      artists: [],
      playlists: [],
      albums: [],
      releases: [],
    };
  },
  setup() {
    return {
      modules: [Navigation],
    };
  },
  mounted() {
    this.initializePageData();
  },
  watch: {
    $route(to, from) {
      if (to.params.id !== from.params.id) {
        this.initializePageData();
      }
    },
  },
  methods: {
    async initializePageData() {
      try {
        await this.getGenres();
        await this.getGenreName();
        await Promise.all([
          this.getArtistsBySelectedGenre(),
          this.getPlaylistsByGenre(),
          this.getAlbums(),
          this.getReleases(),
        ]);
      } catch (error) {
        console.error("Erro na inicialização:", error);
      }
    },

    async getGenres() {
      try {
        const response = await fetch("http://localhost:3000/radio/top");
        if (!response.ok) throw new Error("Erro ao buscar gêneros");
        const data = await response.json();
        this.genres = data.data || [];
      } catch (error) {
        console.error("Erro ao carregar gêneros:", error);
      }
    },

    async getGenreName() {
      try {
        const response = await fetch(`http://localhost:3000/radio/${this.id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar o nome do gênero com ID ${this.id}`);
        }
        const data = await response.json();
        this.genre = data.title;
      } catch (error) {
        console.error("Erro:", error);
      }
    },
    async getPlaylistsByGenre() {
      try {
        if (!this.genre) {
          console.error("Erro: Gênero não definido");
          return;
        }
        const response = await fetch(
          `http://localhost:3000/search/playlist?q=${this.genre}`
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar playlists de ${this.genre}`);
        }
        const data = await response.json();
        this.playlists = data.data || [];
      } catch (error) {
        console.error("Erro:", error);
      }
    },
    async getArtistsBySelectedGenre() {
      try {
        if (!this.genre) {
          console.error("Erro: Gênero não definido");
          return;
        }
        const response = await fetch(
          `http://localhost:3000/search/playlist?q=${this.genre}`
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar playlists de ${this.genre}`);
        }
        const data = await response.json();
        const playlists = data.data || [];

        let artistPromises = [];
        for (const playlist of playlists) {
          artistPromises.push(this.getArtistsFromPlaylist(playlist.id));
        }

        const artistResults = await Promise.all(artistPromises);
        let artists = [];
        artistResults.forEach((result) => {
          artists = artists.concat(result);
        });

        this.artists = artists;
      } catch (error) {
        console.error("Erro:", error);
      }
    },
    async getArtistsFromPlaylist(id) {
      try {
        const response = await fetch(
          `http://localhost:3000/playlist/${id}/tracks`
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar faixas da playlist ${id}`);
        }
        const data = await response.json();
        const tracks = data.data || [];
        let uniqueArtists = new Set();
        let artistPromises = [];

        for (const track of tracks) {
          const artistName = track.artist.name;
          if (!uniqueArtists.has(artistName)) {
            uniqueArtists.add(artistName);
            artistPromises.push(this.getArtistDetails(track.artist.id));
          }
        }

        const artistDetails = await Promise.all(artistPromises);
        let artists = artistDetails.map((details) => ({
          name: details.name,
          picture: details.picture_big,
          id: details.id,
          fans: details.nb_fan,
        }));

        return artists;
      } catch (error) {
        console.error("Erro:", error);
        return [];
      }
    },
    async getArtistDetails(id) {
      try {
        const response = await fetch(`http://localhost:3000/artist/${id}`);
        if (!response.ok) {
          throw new Error(`Erro ao buscar detalhes do artista com ID ${id}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Erro:", error);
        return {};
      }
    },
    async getAlbums() {
      try {
        if (!this.genre) {
          console.error("Erro: Album não encontrado");
          return;
        }
        const response = await fetch(
          `http://localhost:3000/search/album?q=${this.genre}`
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar álbuns de ${this.genre}`);
        }
        const data = await response.json();
        this.albums = data.data || [];
      } catch (error) {
        console.error("Erro:", error);
      }
    },
    async getReleases() {
      try {
        if (!this.genre || this.genre.trim() === "") {
          console.error("Erro: Gênero não definido");
          return;
        }

        if (!this.genres || this.genres.length === 0) {
          console.error("Erro: Lista de gêneros não carregada");
          return;
        }

        const genreData = this.genres.find(
          (g) => g.name.trim().toLowerCase() === this.genre.trim().toLowerCase()
        );

        if (!genreData) {
          console.error(
            "Erro: Não foi possível encontrar o gênero correspondente.",
            "Gênero selecionado:",
            this.genre,
            "Lista de gêneros:",
            this.genres.map((g) => g.name)
          );
          return;
        }

        const id = genreData.id;

        const response = await fetch(
          `http://localhost:3000/playlist/${id}/tracks`
        );
        if (!response.ok) {
          throw new Error(`Erro ao buscar músicas para o gênero ${this.genre}`);
        }

        const data = await response.json();
        this.releases = data.data || [];
      } catch (error) {
        console.error("Erro ao buscar lançamentos:", error);
      }
    },
    numberReformed(number) {
      return formatNumber(number);
    },
  },
};
</script>

<style></style>
