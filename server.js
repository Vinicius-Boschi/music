import express from "express"
import dotenv from "dotenv"
import lyricsHandler from "./api/lyrics/index.js"

dotenv.config()

const app = express()
const PORT = 3001

app.get("/api/lyrics", (req, res) => lyricsHandler(req, res))

app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`)
})