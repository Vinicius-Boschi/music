import express from "express"
import fetch from "node-fetch"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 3000
app.use(express.json())
app.use(cors())

app.get("/genre", async (req, res) => {
  try {
    const response = await fetch("https://api.deezer.com/genre")
    const data = await response.json()
    res.send(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os gêneros")
  }
})

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

app.get("/artist/:id/playlists", async (req, res) => {
  try {
    const { id } = req.params
    const limit = req.query.limit || 100
    const response = await fetch(
      `https://api.deezer.com/artist/${id}/playlists?limit=${limit}`
    );
    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).send("Erro ao buscar os artistas semelhantes.")
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

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})