import express from "express"
import fetch from "node-fetch"
import cors from "cors"
import Genius from "genius-lyrics"

const Client = new Genius.Client(
  "k9I8sEt0VO5kqb1U-KpF_AJ2ZbfCgwxJaA5Y422oZ6HGaR2SiQ770QmFEigBPEMv"
)
const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

app.get("/chart", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/chart")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar o card do artista.")
  }
})

app.get("/chart/0/albums", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/chart/0/albums")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os albums.")
  }
})

app.get("/chart/0/playlists", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/chart/0/playlists")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar as playlists.")
  }
})

app.get("/chart/0/podcasts", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/chart/0/podcasts")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar as playlists.")
  }
})

app.get("/chart/0/tracks", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/chart/0/tracks")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar as músicas.")
  }
})

app.get("/artist/:id", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/artist/${id}`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes do artista.")
  }
})

app.get("/artist/:id/top", async (req, res) => {
  try {
    const { id } = req.params
    const limit = req.query.limit || 100
    const response = await fetch(
      `https://api.deezer.com/artist/${id}/top?limit=${limit}`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar as top músicas dos artista.")
  }
})

app.get("/artist/:id/related", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/artist/${id}/related`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os artistas semelhantes.")
  }
})

app.get("/artist/:id/albums", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/artist/${id}/albums`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os albums semelhantes.")
  }
})

app.get("/artist/:id/playlists", async (req, res) => {
  try {
    const { id } = req.params
    const limit = req.query.limit || 100
    const response = await fetch(
      `https://api.deezer.com/artist/${id}/playlists?limit=${limit}`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os artistas semelhantes.")
  }
})

app.get("/artist/:id/radio", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/artist/${id}/radio`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar a rádio.")
  }
})

app.get("/album/:id", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/album/${id}`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes do artista.")
  }
})

app.get("/playlist/:id", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/playlist/${id}`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes do artista.")
  }
})

app.get("/playlist/:id/tracks", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(
      `https://api.deezer.com/playlist/${id}/tracks`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes do artista.")
  }
})

app.get("/track/:id", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/track/${id}`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes do artista.")
  }
})

app.get("/search", async (req, res) => {
  try {
    const searchQuery = req.query.q
    const response = await fetch(
      `https://api.deezer.com/search?q=${searchQuery}`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes do artista.")
  }
})

app.get("/search/playlist", async (req, res) => {
  try {
    const searchQuery = req.query.q
    const response = await fetch(
      `https://api.deezer.com/search/playlist?q=${searchQuery}`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes da playlist.")
  }
})

app.get("/search/track", async (req, res) => {
  try {
    const searchQuery = req.query.q
    const response = await fetch(
      `https://api.deezer.com/search/track?q=${searchQuery}`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os detalhes da playlist.")
  }
})

app.get("/lyrics/:title/:artist", async (req, res) => {
  try {
    const searches = await Client.songs.search(
      req.params.title,
      req.params.artist
    )
    const firstSong = searches[0]
    const lyrics = await firstSong.lyrics()
    res.json({ lyrics })
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar a letra da música.")
  }
})

app.get("/podcast/:id", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/podcast/${id}`)
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os podcasts.")
  }
})

app.get("/podcast/:id/episodes", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(
      `https://api.deezer.com/podcast/${id}/episodes`
    )
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os podcasts.")
  }
})

app.get("/radio", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/radio")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar a rádio.")
  }
})

app.get("/radio/top", async (req, res) => {
  try {
    const limit = req.query.limit || 100
    const response = await fetch(`https://api.deezer.com/radio/top?limit=${limit}`)
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar a rádio.")
  }
})

app.get("/radio/lists", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/radio/lists")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar a rádio.")
  }
})

app.get("/radio/:id", async (req, res) => {
  try {
    const { id } = req.params
    const response = await fetch(`https://api.deezer.com/radio/${id}`)
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar a top rádio.")
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})