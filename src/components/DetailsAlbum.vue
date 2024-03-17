<template>
  <Sidebar />
  <div class="detail">
    <div v-if="details.length > 0">
      <div class="detail__text" v-for="(album, index) in details" :key="index">
        <img class="detail__profile" :src="getAlbumImageUrl(album.md5_image)" :alt="album.title">
        <h1 class="detail__name-artist">{{ album && album.title !== undefined ? album.title : "Álbum não encontrado" }}</h1>
      </div>
    </div>
    <div v-else>
      <p>Nenhum álbum encontrado com o ID informado!!!</p>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Header.vue"

export default {
  name: "DetailsAlbum",
  data() {
    return {
      details: [],
    }
  },
  components: {
    Sidebar,
  },
  mounted() {
    this.getDetailsAlbum()
  },
  methods: {
    async getDetailsAlbum() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`http://localhost:3000/album/${id}/tracks`)
        const data = await response.json()
        this.details = data.data
        console.log(data.data)
      } catch (error) {
        console.error("Erro ao buscar o album", error)
      }
    },
    formatNumber(number) {
      if (number !== undefined && number !== null) {
        return number.toLocaleString('pt-BR');
      } else {
        return '0';
      }
    },
    getAlbumImageUrl(imageId) {
    const baseUrl = `https://e-cdns-images.dzcdn.net/images/artist/${imageId}/250x250-000000-80-0-0.jpg`;
    return `${baseUrl}`;
  }
  },
}
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";
@import "../assets/scss/styles/details.scss";
</style>