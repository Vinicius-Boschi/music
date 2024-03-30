<template>
  <header class="header">
    <label for="UserEmail" class="header__label">
      <input
        type="email"
        id="UserEmail"
        placeholder="Artistas, faixas, podcasts..."
        class="header__input"
      />
    </label>
    <div class="header__account">
      <div class="header__user-container">
        <img
          class="header__user-icon"
          src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/ddde9c36-3bed-4f13-989a-23e7f5972d5b"
          alt="icon ring"
        />
        <summary class="header__summary">
          <span class="header__text">
            <div class="header__icon-container">
              <img
                src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/236c34c5-1ba6-477d-88ba-a4e8d8c2d1d5"
                alt="user photo"
                class="header__user"
                @click="toggleModal"
              />
            </div>
          </span>

          <span class="header__arrow">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="header__arrow-icon"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"
              />
            </svg>
          </span>
        </summary>
      </div>

      <ul v-if="showModal" class="header__user-menu">
        <li>
          <details class="header__details">
            <summary class="header__summary">
              <span class="header__text">User Info</span>
            </summary>
            <ul class="header__details-hide">
              <li>
                <a href="#" class="header__hover"> Banned Users </a>
              </li>

              <li>
                <a href="#" class="header__hover"> Calendar </a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      showModal: false,
    }
  },
  methods: {
    toggleModal() {
      this.showModal = !this.showModal
    },
  },
}
</script>

<style>
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/header.scss";

.header__user-container:hover .header__user-menu {
  display: block;
}
</style>