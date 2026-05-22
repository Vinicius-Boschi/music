import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import lyricsHandler from "./api/lyrics/index.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.get("/api/lyrics", (req, res) => lyricsHandler(req, res))

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`)
})