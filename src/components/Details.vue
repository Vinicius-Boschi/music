<template>
  <div class="artist-detail">
    <h1>
      {{ artist.name !== "UNDEFINED" ? artist.name : "Artista não encontrado" }}
    </h1>
  </div>
</template>

<script>
export default {
  name: "Details",
  data() {
    return {
      artist: {},
    }
  },
  mounted() {
    this.getDetails()
  },
  methods: {
    async getDetails() {
      try {
        const id = this.$route.params.id
        const response = await fetch(`http://localhost:3000/artist/${id}`)
        const data = await response.json()
        this.artist = data
      } catch (error) {
        console.error("Erro ao buscar o artista", error)
      }
    },
  },
}
</script>

<style>
.artist-detail {
  text-align: center;
}
</style>