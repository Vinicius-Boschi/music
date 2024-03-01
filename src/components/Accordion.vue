<template>
<section class="accordion">
    <div class="accordion__about-center">
      <article class="accordion__about">
        <div class="accordion__btn-container">
          <div class="accordion__btn-container-content">
            <button
            class="accordion__tab-btn"
            :class="{ active: activeTab === 'album' }"
            @click="activeTab = 'album'"
          >
            Album
          </button>
          <button
            class="accordion__tab-btn"
            :class="{ active: activeTab === 'top_track' }"
            @click="activeTab = 'top_track'"
          >
            Top Músicas
          </button>
          </div>
        </div>
      </article>
      <article class="accordion__about-content">
        <div
          class="accordion__content"
          id="about"
          v-show="activeTab === 'album'"
        >
            <div class="accordion__about-text">
                <h1>Album:</h1>
                <p>Teste</p>
            </div>
        </div>
        <div
          class="accordion__content"
          id="about"
          v-show="activeTab === 'top_track'"
        >
            <div class="accordion__about-text">
               <div>
                <h1>Top Músicas:</h1>
               </div>
               <div>
                <input type="search" name="search" id="" placeholder="search">
               </div>
                <div>
                    <h1>Música</h1>
                    <img src="https://placehold.co/20x20" alt="">
                </div>
                <div class="accordion__container">
                    <img src="https://placehold.co/50x50" alt="">
                    <h1 class="accordion__track-name">1. Estado Civil(Ao Vivo)</h1>
                    <span class="accordion__track-time">02:26</span>
                </div>
            </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script>
export default {
    name: "Accordion",
    data() {
        return {
            activeTab: "album",
        }
    },
    methods: {

    },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/accordion.scss";
</style>