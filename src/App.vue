<template>
  <router-view />
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
</style>