<template>
  <header class="header">
    <nav class="header__nav">
      <label for="text" class="header__label">
        <input
          type="text"
          id="text"
          placeholder="Artistas, faixas, podcasts..."
          class="header__input"
          v-model="searchQuery"
          @keyup.enter="performSearch"
          
        />
      </label>
      <div class="header__account">
        <div class="header__user-container">
          <img
            class="header__user-icon"
            src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/ddde9c36-3bed-4f13-989a-23e7f5972d5b"
            alt="icon ring"
            @click="toggleNotification"
          />
          <summary class="header__summary">
            <span class="header__text">
              <div class="header__icon-container">
                <img
                  src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                  alt="user photo"
                  class="header__user"
                  @click="toggleModal"
                />
              </div>
            </span>
          </summary>
        </div>

        <div v-if="showModal" class="header__user-menu">
          <ul class="header__details-hide">
            <li class="header__hover">
              <img
                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="user photo"
                class="header__user"
              />
              <a class="header__user-link" href="#">Eric Frusciante</a>
            </li>
            <li class="header__hover">
              <a class="header__announcement" href="#">
                <span class="header__announcement-text"
                  >Escolha oque você ouve. Sem anúncios.</span
                >
                <span class="header__announcement-description"
                  >1 mês grátis a partir daí R$ 24,90/mês. Experimente
                  agora.</span
                >
              </a>
            </li>
          </ul>

          <ul class="header__details-hide border">
            <li class="header__hover">
              <a class="header__user-link" href="#">Configurações da conta</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#"
                >Gerenciar minha assinatura</a
              >
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#"
                >Gerenciar minhas exclusões</a
              >
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Comprar um vale presente</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Ativar um código</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Desconectar</a>
            </li>
          </ul>

          <ul class="header__details-hide border">
            <li class="header__hover justify">
              <a class="header__user-link" href="#">Modo noturno</a>
              <label class="header__switch">
                <input type="checkbox" />
                <span class="header__slider round"></span>
              </label>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Suporte</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Community e feedback</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Planos</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Recursos</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Sobre nós</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Jobs</a>
            </li>
            <li class="header__hover">
              <a class="header__user-link" href="#">Legal</a>
            </li>
          </ul>
        </div>
        <div v-if="showNotification" class="header__user-menu">
          <h1 class="header__notification-title">Notificações</h1>
          <div class="header__notification">
            <img
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/43b34444-348d-4bb1-beab-7c4dfe86d8b7"
              alt=""
              class="header__notification-photo"
            />
            <p class="header__notification-text">Não fique sozinho.</p>
            <button class="header__notification-button">
              Adicione artistas
            </button>
          </div>
        </div>
      </div>
    </nav>
    <div class="header__modal">
      <div v-if="showConfirmModal" class="header__modal-alert">
      <div class="header__modal-content">
        <p class="header__modal-text">
          Um álbum e uma playlist foram encontrados. Você
          gostaria de ir para qual?
        </p>
        <div class="header__modal-buttons">
          <button @click="goToPlaylist">Playlist</button>
          <button @click="goToAlbum">Album</button>
        </div>
      </div>
    </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showModal: false,
      showNotification: false,
      searchQuery: "",
      searchResults: [],
      playlistResults: [],
      error: null,
      showConfirmModal: false,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
      this.showNotification = false
    },
    toggleNotification() {
      this.showNotification = !this.showNotification
      this.showModal = false
    },
    async performSearch() {
      try {
        const response = await fetch(
          `http://localhost:3000/search?q=${this.searchQuery}`
        )
        const playlistResponse = await fetch(
          `http://localhost:3000/search/playlist?q=${this.searchQuery}`
        )
        const data = await response.json()
        const playlistData = await playlistResponse.json()

        this.searchResults = data.data
        this.playlistResults = playlistData.data

        if (this.searchResults.length > 0) {
          const artistMatch = this.searchArtists()
          const playlistMatch = this.searchPlaylists()
          const albumMatch = this.searchAlbums()
          const trackMatch = this.searchTracks()

          if (artistMatch) {
            const url = `/artist/${artistMatch}`
            this.$router.push(url)
          } else if(trackMatch) {
            const url = `/track/${trackMatch}`
            this.$router.push(url)
          } else if (albumMatch && playlistMatch) {
            this.showConfirmationModal(albumMatch, playlistMatch)
          } else {
            console.log(
              "Nenhum resultado de artista, álbum ou playlist encontrado"
            )
          }
        } else {
          console.log("Nenhum resultado encontrado")
        }
      } catch (error) {
        console.error("Erro ao buscar resultados:", error)
        this.error = error.message
      }
    },
    searchArtists() {
      const searchQueryLowercase = this.searchQuery.toLowerCase()
      for (const track of this.searchResults) {
        if (
          track.artist &&
          track.artist.type === "artist" &&
          track.artist.name.toLowerCase() === searchQueryLowercase
        ) {
          return track.artist.id
        }
      }
      return null
    },
    searchPlaylists() {
      const searchQueryLowercase = this.searchQuery.toLowerCase()
      for (const playlist of this.playlistResults) {
        if (playlist.title.toLowerCase() === searchQueryLowercase) {
          return playlist.id
        }
      }
      return null
    },
    searchAlbums() {
      const searchQueryLowercase = this.searchQuery.toLowerCase()
      for (const track of this.searchResults) {
        if (
          track.album &&
          track.album.type === "album" &&
          track.album.title.toLowerCase() === searchQueryLowercase
        ) {
          return track.album.id
        }
      }
      return null
    },
    searchTracks() {
      const searchQueryLowercase = this.searchQuery.toLowerCase()
      for (const track of this.searchResults) {
        if (track.title.toLowerCase() === searchQueryLowercase) {
          return track.id
        }
      }
      return null
    },
    goToPlaylist() {
      const url = `/playlist/${this.playlistMatch}`
      this.$router.push(url)
      this.showConfirmModal = false
    },
    goToAlbum() {
      const url = `/album/${this.albumMatch}`
      this.$router.push(url)
      this.showConfirmModal = false
    },
    showConfirmationModal(albumMatch, playlistMatch) {
      this.showConfirmModal = true
      this.albumMatch = albumMatch
      this.playlistMatch = playlistMatch
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/header.scss";

.header__user-container:hover .header__user-menu {
  display: block;
}

.header__user-container:hover .header__notification {
  display: block;
}

a {
  text-decoration: none !important;
}
</style>