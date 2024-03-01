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
      <!-- <ul class="header__social-links list-inline hover">
        <li>
          <a
            href="https://github.com/Vinicius-Boschi"
            target="_blank"
            class="header__link social"
          >
            <img :src="github" alt="github" />
          </a>
        </li>
        <li>
          <a
            href="https://portfolioviniciusboschi.vercel.app/"
            target="_blank"
            class="header__link social"
          >
            <img :src="portfolio" alt="portfolio" />
          </a>
        </li>
        <li>
          <a
            href="mailto:vinicius.yg@gmail.com"
            target="_blank"
            class="header__link social"
          >
            <img :src="email" alt="email" />
          </a>
        </li>
        <li>
          <a
            href="https://www.linkedin.com/in/viniciusboschi/"
            target="_blank"
            class="header__link social"
          >
            <img :src="linkedin" alt="linkedin" />
          </a>
        </li>
      </ul> -->
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
      github:
        "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/22c390a5-3547-4178-b4b8-0432de713134",
      portfolio:
        "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/a17b00f8-b488-4f7d-8663-01b95860f75c",
      email:
        "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/3553fd36-3540-4548-bcbc-85d553cf61aa",
      linkedin:
        "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/8229a463-2a8f-48d2-a6ec-15314687d807",
    }
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/header.scss";
</style>