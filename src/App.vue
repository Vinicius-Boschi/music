<template>
  <router-view :key="$route.fullPath" />
  <Player />
</template>

<script>  
import Player from "./components/Player.vue";
export default {
  name: "App",
  components: {
    Player
  }
}
</script>