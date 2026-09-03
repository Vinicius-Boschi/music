<template>
  <div>
    <div class="sidebar">
      <div class="sidebar__logo">
        <span class="sidebar__logo-name">
          <router-link to="/">Deezer</router-link>
        </span>
        <ul class="sidebar__list">
          <li>
            <router-link
              to="/"
              class="sidebar__hover"
              :class="{ active: isHomePage }"
            >
              <img class="sidebar__icon" :src="home" alt="icon sidebar" />
              <p class="sidebar__link-text">Início</p>
            </router-link>
          </li>
          <li>
            <a href="#" class="sidebar__hover">
              <img class="sidebar__icon" :src="explore" alt="icon sidebar" />
              <p class="sidebar__link-text">Explorar</p>
            </a>
          </li>

          <li>
            <router-link
              to="/favorites"
              class="sidebar__hover"
              :class="{ active: isFavoritesPage }"
            >
              <img class="sidebar__icon" :src="favorites" alt="icon sidebar" />
              <p class="sidebar__link-text">Favoritos</p>
            </router-link>
          </li>
        </ul>
        <div class="sidebar__announcement">
          <p class="sidebar__announcement-text">
            Você está na versão Deezer Free. Faça o upgrade e pule os anúncios,
            de graça, por 1 mês.
          </p>
          <button class="sidebar__announcement-button">Assinar</button>
        </div>
        <div class="sidebar__playlist">
          <h1 class="sidebar__playlist-title">Playlists</h1>
          <div class="sidebar__playlist-content">
            <a href="#" class="sidebar__hover">
              <img class="sidebar__icon" :src="loved" alt="icon sidebar" />
              <p class="sidebar__playlist-text">Mais queridas</p>
            </a>
          </div>
          <div class="sidebar__playlist-content">
            <a href="#" class="sidebar__hover">
              <img class="sidebar__icon" :src="playlist" alt="icon sidebar" />
              <p class="sidebar__playlist-text">Criar uma playlist</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import homeIcon from "../assets/icons/house-regular-full.png";
import exploreIcon from "../assets/icons/compass-regular-full.png";
import favoritesIcon from "../assets/icons/heart-regular-full.png";
import lovedIcon from "../assets/icons/heart-solid-full.png";
import playlistIcon from "../assets/icons/plus-solid-full.png";

export default {
  name: "Sidebar",
  data() {
    return {
      home: homeIcon,
      explore: exploreIcon,
      favorites: favoritesIcon,
      loved: lovedIcon,
      playlist: playlistIcon,
    };
  },
  computed: {
    isHomePage() {
      return this.$route.path === "/";
    },
    isFavoritesPage() {
      return this.$route.path === "/favorites";
    },
  },
};
</script>