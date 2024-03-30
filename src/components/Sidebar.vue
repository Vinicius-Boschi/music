<template>
  <div class="sidebar">
    <div class="sidebar__logo">
      <span class="sidebar__logo-name"> Deezer </span>

      <ul class="sidebar__list">
        <li>
          <a href="#" class="sidebar__hover active">
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/5554d011-9384-419c-938b-81edd1f3cbde"
              alt="icon sidebar"
            />
            <p class="sidebar__link-text">Início</p>
          </a>
        </li>
        <li>
          <a href="#" class="sidebar__hover">
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/637008bf-4f5f-4dc4-9e05-5fa14e912ada"
              alt="icon sidebar"
            />
            <p class="sidebar__link-text">Explorar</p>
          </a>
        </li>

        <li>
          <a href="#" class="sidebar__hover">
            <img
              class="sidebar__icon"
              src="https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/84ae12a9-2b9f-44f9-b81e-2283432f3d08"
              alt="icon sidebar"
            />
            <p class="sidebar__link-text">Favoritos</p>
          </a>
        </li>
      </ul>
    </div>

    <div class="sidebar__photo">
      <a href="#" class="sidebar__photo-link">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          class="sidebar__user-photo"
        />

        <div>
          <p class="sidebar__name">
            <strong class="sidebar__name-strong">Eric Frusciante</strong>
            <span> eric@frusciante.com </span>
          </p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      home: "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/cca4a60a-03c9-410e-84bd-7e831bd58f13",
      explore:
        "https://github.com/Vinicius-Boschi/Star-Wars/assets/74377158/17df5b60-6e2e-4b32-899c-d5ba9f99e653",
    };
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/sidebar.scss";
</style>
