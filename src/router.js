import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home.vue"
import Details from "./components/Details.vue"
import Accordion from "./components/Accordion.vue"
import DetailsAlbum from "./components/DetailsAlbum.vue"
import DetailsPlaylist from "./components/DetailsPlaylist.vue"
import DetailsTrack from "./components/DetailsTrack.vue"
import DetailsPodcasts from "./components/DetailsPodcasts.vue"
import DetailsGenre from "./components/DetailsGenre.vue"
import AllPlaylists from "./components/AllPlaylists.vue"
import AllGenres from "./components/AllGenres.vue"
import AllArtists from "./components/AllArtists.vue"
import AllMusics from "./components/AllMusics.vue"
import AllAlbuns from "./components/AllAlbuns.vue"
import AllPodcasts from "./components/AllPodcasts.vue"
import Favorites from "./components/Favorites.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/artist/:id",
      name: "Details",
      component: Details,
      props: true,
    },
    {
      path: "/top/:id",
      name: "Accordion",
      component: Accordion,
      props: true,
    },
    {
      path: "/album/:id",
      name: "DetailsAlbum",
      component: DetailsAlbum,
      props: true,
    },
    {
      path: "/playlist/:id",
      name: "DetailsPlaylist",
      component: DetailsPlaylist,
      props: true,
    },
    {
      path: "/track/:id",
      name: "DetailsTrack",
      component: DetailsTrack,
      props: true,
    },
    {
      path: "/podcast/:id",
      name: "DetailsPodcasts",
      component: DetailsPodcasts,
      props: true,
    },
    {
      path: "/radio/:id",
      name: "DetailsGenre",
      component: DetailsGenre,
      props: true,
    },
    {
      path: "/all-playlists",
      name: "AllPlaylists",
      component: AllPlaylists,
      props: true,
    },
    {
      path: "/all-genres",
      name: "AllGenres",
      component: AllGenres,
      props: true,
    },
    {
      path: "/all-artists",
      name: "AllArtists",
      component: AllArtists,
      props: true,
    },
    {
      path: "/all-musics",
      name: "AllMusics",
      component: AllMusics,
      props: true,
    },
    {
      path: "/all-albuns",
      name: "AllAlbuns",
      component: AllAlbuns,
      props: true,
    },
    {
      path: "/all-podcasts",
      name: "AllPodcasts",
      component: AllPodcasts,
      props: true,
    },
    {
      path: "/favorites",
      name: "Favorites",
      component: Favorites,
      props: true,
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    }
  },
})

export default router
