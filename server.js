import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import lyricsHandler from "./api/lyrics/index.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.get("/api/lyrics", (req, res) => lyricsHandler(req, res))

app.get("/api/deezer/*", async (req, res) => {
  try {
    const path = req.params[0]

    const response = await fetch(
      `https://api.deezer.com/${path}`
    )

    const data = await response.json()

    res.json(data)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: err.message,
    })
  }
})

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`)
})