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
  ],
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    }
  },
})

export default router