<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <span class="sidebar__logo-name"> Deezer </span>
      <ul class="sidebar__list">
        <li>
          <router-link
            to="/"
            class="sidebar__hover"
            :class="{ active: isHomePage }"
          >
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/5554d011-9384-419c-938b-81edd1f3cbde"
              alt="icon sidebar"
            />
            <p class="sidebar__link-text">Início</p>
          </router-link>
        </li>
        <li>
          <a href="#" class="sidebar__hover">
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/637008bf-4f5f-4dc4-9e05-5fa14e912ada"
              alt="icon sidebar"
            />
            <p class="sidebar__link-text">Explorar</p>
          </a>
        </li>

        <li>
          <a href="#" class="sidebar__hover">
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/84ae12a9-2b9f-44f9-b81e-2283432f3d08"
              alt="icon sidebar"
            />
            <p class="sidebar__link-text">Favoritos</p>
          </a>
        </li>
      </ul>
      <div class="sidebar__announcement">
        <p class="sidebar__announcement-text">
          Você está na versão Deezer Free. Faça o upgrade e pule os anúncios, de
          graça, por 1 mês.
        </p>
        <button class="sidebar__announcement-button">Assinar</button>
      </div>
      <div class="sidebar__playlist">
        <h1 class="sidebar__playlist-title">Playlists</h1>
        <div class="sidebar__playlist-content">
          <a href="#" class="sidebar__hover">
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/4d23b271-0954-48e3-af60-dea71a52b445"
              alt="icon sidebar"
            />
            <p class="sidebar__playlist-text">Mais queridas</p>
          </a>
        </div>
        <div class="sidebar__playlist-content">
          <a href="#" class="sidebar__hover">
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/02d57893-885a-4bf0-b847-c529bae5e71d"
              alt="icon sidebar"
            />
            <p class="sidebar__playlist-text">Criar uma playlist</p>
          </a>
        </div>
      </div>
    </div>
    <div class="sidebar__photo">
      <a href="#" class="sidebar__photo-link">
        <img
          alt="user photo"
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="sidebar__user-photo"
        />
        <div>
          <p class="sidebar__name">
            <strong class="sidebar__name-strong">Eric Frusciante</strong>
            <span> eric@frusciante.com </span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      home: "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/cca4a60a-03c9-410e-84bd-7e831bd58f13",
      explore:
        "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/17df5b60-6e2e-4b32-899c-d5ba9f99e653",
    }
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/"
    },
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/sidebar.scss";
</style>