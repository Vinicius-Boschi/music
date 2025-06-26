<template>
  <template v-for="n in 8" :key="n">
    <div class="page__content">
      <div class="skeleton__img"></div>
      <div class="skeleton__line"></div>
      <div class="skeleton__line short"></div>
    </div>
  </template>
</template>

<script>
export default {
  name: "SkeletonArtists",
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/skeleton.scss";
</style>