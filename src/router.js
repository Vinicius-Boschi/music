import { createRouter, createWebHistory } from "vue-router"
import Home from "./components/Home.vue"
import Details from "./components/Details.vue"

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
  ],
})

export default router