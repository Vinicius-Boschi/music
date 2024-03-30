<template>
  <router-view :key="$route.fullPath" />
</template>

<script>
export default {
  name: "App",
}
</script>

<style lang="scss">
@import "./assets/scss/variables.scss";
@import "./assets/scss/styles/reset.scss";

#app {
  font-family: $font;
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-thumb {
  background: $light-gray; 
  border-radius: 10px;
}
</style>