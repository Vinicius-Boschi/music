<template>
  <div class="content">
    <Header />
    <Sidebar />
    <h1 class="chart__genre">{{ genre }}</h1>
    <div class="chart__text">
      <!-- Top Playlists -->
      <div class="chart__container">
        <div class="chart__header">
          <h2 class="chart__title genre">Top playlists {{ genre }}</h2>
          <div class="chart__navigation">
            <div
              :class="[
                'swiper-button-prev',
                `swiper-button-prev-${carouselId.playlists}`,
              ]"
            ></div>
            <div
              :class="[
                'swiper-button-next',
                `swiper-button-next-${carouselId.playlists}`,
              ]"
            ></div>
          </div>
        </div>
        <swiper
          v-if="navigationReady"
          :navigation="{
            nextEl: `.swiper-button-next-${carouselId.playlists}`,
            prevEl: `.swiper-button-prev-${carouselId.playlists}`,
          }"
          :slidesPerView="4"
          :spaceBetween="20"
          :modules="modules"
          class="chart__swiper"
        >
          <swiper-slide v-for="(playlist, index) in playlists" :key="index">
            <div class="chart__content__item">
              <router-link
                :to="{ name: 'DetailsPlaylist', params: { id: playlist.id } }"
              >
                <img
                  class="chart__img"
                  :src="playlist.picture_big"
                  :alt="playlist.title"
                />
                <p class="chart__name">{{ playlist.title }}</p>
              </router-link>
              <p class="chart__followers">
                {{ playlist.nb_tracks }} faixas -
                {{ numberReformed(playlist.fans) }} fãs
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Artistas -->
      <div class="chart__container">
        <div class="chart__header">
          <h2 class="chart__title genre">Artistas {{ genre }} do momento</h2>
          <div class="chart__navigation">
            <div
              :class="[
                'swiper-button-prev',
                `swiper-button-prev-${carouselId.artists}`,
              ]"
            ></div>
            <div
              :class="[
                'swiper-button-next',
                `swiper-button-next-${carouselId.artists}`,
              ]"
            ></div>
          </div>
        </div>
        <swiper
          v-if="navigationReady"
          :navigation="{
            nextEl: `.swiper-button-next-${carouselId.artists}`,
            prevEl: `.swiper-button-prev-${carouselId.artists}`,
          }"
          :slidesPerView="4"
          :spaceBetween="20"
          :modules="modules"
          class="chart__swiper"
        >
          <swiper-slide v-for="(artist, index) in artists" :key="index">
            <div class="chart__content__item">
              <router-link :to="{ name: 'Details', params: { id: artist.id } }">
                <img
                  class="chart__img rounded"
                  :src="artist.picture"
                  :alt="artist.name"
                />
              </router-link>
              <p class="chart__name center">{{ artist.name }}</p>
              <p class="chart__followers center">
                {{ numberReformed(artist.fans) }} fãs
              </p>
              <p class="chart__followers center">{{ artist.album }} álbuns</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Álbuns -->
      <div class="chart__container">
        <div class="chart__header">
          <h2 class="chart__title genre">Vá mais fundo</h2>
          <div class="chart__navigation">
            <div
              :class="[
                'swiper-button-prev',
                `swiper-button-prev-${carouselId.albums}`,
              ]"
            ></div>
            <div
              :class="[
                'swiper-button-next',
                `swiper-button-next-${carouselId.albums}`,
              ]"
            ></div>
          </div>
        </div>
        <swiper
          v-if="navigationReady"
          :navigation="{
            nextEl: `.swiper-button-next-${carouselId.albums}`,
            prevEl: `.swiper-button-prev-${carouselId.albums}`,
          }"
          :slidesPerView="4"
          :spaceBetween="20"
          :modules="modules"
          class="chart__swiper"
        >
          <swiper-slide v-for="(album, index) in albuns" :key="index">
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
              <p class="chart__name">{{ album.title }}</p>
              <p class="chart__followers">{{ album.nb_tracks }} faixas</p>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- Lançamentos -->
      <div class="chart__container">
        <div class="chart__header">
          <h2 class="chart__title genre">Lançamentos do {{ genre }}</h2>
          <div class="chart__navigation">
            <div
              :class="[
                'swiper-button-prev',
                `swiper-button-prev-${carouselId.releases}`,
              ]"
            ></div>
            <div
              :class="[
                'swiper-button-next',
                `swiper-button-next-${carouselId.releases}`,
              ]"
            ></div>
          </div>
        </div>
        <swiper
          v-if="navigationReady"
          :navigation="{
            nextEl: `.swiper-button-next-${carouselId.releases}`,
            prevEl: `.swiper-button-prev-${carouselId.releases}`,
          }"
          :slidesPerView="4"
          :spaceBetween="20"
          :modules="modules"
          class="chart__swiper"
        >
          <swiper-slide v-for="(release, index) in releases" :key="index">
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
              <p class="chart__name">{{ release.title }}</p>
              <p class="chart__followers">por {{ release.artist.name }}</p>
              <p class="chart__followers">
                Lançado em {{ dateReformed(release.release_date) }}
              </p>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header.vue"
import Sidebar from "./Sidebar.vue"
import { formatNumber } from "../untils/formatNumber.js"
import { formatDate } from "../untils/formatDate.js"
import { API_BASE } from "../services/api.js"
import { Swiper, SwiperSlide } from "swiper/vue"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"

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
      genreId: null,
      artists: [],
      playlists: [],
      albuns: [],
      releases: [],
      navigationReady: false,
      carouselId: {
        playlists: "playlists",
        artists: "artists",
        albums: "albums",
        releases: "releases",
      },
    }
  },
  computed: {
    navigation() {
      return {
        nextEl: `.swiper-button-next-${this.carouselId}`,
        prevEl: `.swiper-button-prev-${this.carouselId}`,
      }
    },
  },
  setup() {
    return {
      modules: [Navigation],
    }
  },
  mounted() {
    this.initializePageData()
  },
  watch: {
    "$route.params.id": {
      async handler(newId, oldId) {
        if (newId !== oldId) {
          await this.initializePageData()
        }
      },
    },
  },
  methods: {
    async initializePageData() {
      try {
        this.navigationReady = false

        this.genre = ""
        this.genreId = null
        this.artists = []
        this.playlists = []
        this.albuns = []
        this.releases = []

        await this.getGenreName()

        await Promise.all([
          this.getArtistsBySelectedGenre(),
          this.getPlaylistsByGenre(),
          this.getAlbuns(),
          this.getReleases(),
        ])

        this.navigationReady = true
      } catch (error) {
        console.error("Erro na inicialização:", error)
        this.navigationReady = true
      }
    },
    async getGenreName() {
      try {
        const res = await fetch(`${API_BASE}/deezer/genre`)

        if (!res.ok) {
          throw new Error(`Erro HTTP ${res.status}`)
        }

        const data = await res.json()

        const selectedGenre = (data?.data || []).find(
          (genre) => String(genre.id) === String(this.id),
        )

        if (!selectedGenre) {
          throw new Error(`Gênero com ID ${this.id} não encontrado`)
        }

        this.genreId = selectedGenre.id
        this.genre = selectedGenre.name
      } catch (error) {
        console.error("Erro ao buscar nome do gênero:", error)
        this.genre = "Gênero"
      }
    },

    async getPlaylistsByGenre() {
      try {
        const res = await fetch(
          `${API_BASE}/deezer/search/playlist?q=${encodeURIComponent(this.genre)}`,
        )
        const data = await res.json()
        const playlists = data.data?.slice(0, 12) || []

        const detailsPlaylists = await Promise.all(
          playlists.map(async (playlist) => {
            const details = await fetch(
              `${API_BASE}/deezer/playlist/${playlist.id}`,
            )
            const detailsData = await details.json()
            return {
              ...playlist,
              fans: detailsData.fans,
            }
          }),
        )
        this.playlists = detailsPlaylists
      } catch (error) {
        console.error("Erro ao buscar playlists:", error)
      }
    },
    async getArtistsBySelectedGenre() {
      try {
        this.artists = []

        if (!this.genre) {
          return
        }

        const res = await fetch(
          `${API_BASE}/deezer/search/track?q=${encodeURIComponent(this.genre)}`,
        )

        if (!res.ok) {
          throw new Error(`Erro HTTP ${res.status}`)
        }

        const data = await res.json()
        const tracks = data?.data || []

        const uniqueArtists = new Set()
        const artistPromises = []

        for (const track of tracks) {
          const artistId = track?.artist?.id

          if (!artistId) continue
          if (uniqueArtists.has(artistId)) continue

          uniqueArtists.add(artistId)
          artistPromises.push(this.getArtistDetails(artistId))
        }

        const artistDetails = await Promise.all(artistPromises)

        this.artists = artistDetails
          .filter(
            (artist) =>
              artist &&
              artist.id &&
              artist.name &&
              (artist.picture_big || artist.picture_medium || artist.picture),
          )
          .map((artist) => ({
            id: artist.id,
            name: artist.name,
            picture:
              artist.picture_big || artist.picture_medium || artist.picture,
            fans: artist.nb_fan || 0,
            album: artist.nb_album || 0,
          }))
          .slice(0, 12)
      } catch (error) {
        console.error("Erro ao buscar artistas do gênero:", error)
        this.artists = []
      }
    },

    async getArtistDetails(id) {
      try {
        if (!id) return null

        const res = await fetch(`${API_BASE}/deezer/artist/${id}`)

        if (!res.ok) {
          console.warn(
            `Erro ao buscar detalhes do artista com ID ${id}, status: ${res.status}`,
          )
          return null
        }

        const data = await res.json()

        if (!data?.id || !data?.name) {
          return null
        }

        return data
      } catch (error) {
        console.error(`Erro ao buscar detalhes do artista: ${id}`, error)
        return null
      }
    },

    async getAlbuns() {
      try {
        const res = await fetch(
          `${API_BASE}/deezer/search/album?q=${this.genre}`,
        )
        const data = await res.json()
        this.albuns = data.data?.slice(0, 12) || []
      } catch (error) {
        console.error("Erro ao buscar álbuns:", error)
      }
    },

    async getReleases() {
      try {
        const res = await fetch(
          `${API_BASE}/deezer/search/track?q=${this.genre}`,
        )
        const data = await res.json()
        const tracks = data.data || []

        const seen = new Set()
        const filtered = tracks
          .filter((track) => {
            if (seen.has(track.title)) return false
            seen.add(track.title)
            return true
          })
          .slice(0, 12)

        const releasesWithDate = await Promise.all(
          filtered.map(async (track) => {
            const albumId = track.album.id

            let releaseDate = "Data desconhecida"
            try {
              const resAlbum = await fetch(
                `${API_BASE}/deezer/album/${albumId}`,
              )
              const albumData = await resAlbum.json()
              releaseDate = albumData.release_date || "Data desconhecida"
            } catch (e) {
              console.warn("Erro ao buscar álbum:", e)
            }

            return {
              ...track,
              release_date: releaseDate,
            }
          }),
        )
        this.releases = releasesWithDate
      } catch (error) {
        console.error("Erro ao buscar lançamentos:", error)
      }
    },
    numberReformed(num) {
      return formatNumber(num)
    },
    dateReformed(date) {
      return formatDate(date)
    },
  },
}
</script>