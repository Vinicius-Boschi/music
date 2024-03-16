<template>
  <header class="header" role="banner">
    <div class="header__logo">
      <h1>deezer</h1>
    </div>
    <div class="header__nav-wrap">
      <div class="header__nav" role="navigation">
        <ul class="header__list hover">
          <li>
            <router-link to="/" class="header__link link">
              <span class="active">
                <p>início</p>
                <img :src="home" alt="início" />
              </span>
            </router-link>
          </li>
          <li>
            <router-link to="/" class="header__link link">
              <span>
                <p>explorar</p>
                <img :src="explore" alt="explorar" />
              </span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      home: "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/cca4a60a-03c9-410e-84bd-7e831bd58f13",
      explore:
        "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/17df5b60-6e2e-4b32-899c-d5ba9f99e653",
    }
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/header.scss";
</style>