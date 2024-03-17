import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home.vue"
import Details from "./components/Details.vue"
import Accordion from "./components/Accordion.vue"

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
  ],
})

export default router;