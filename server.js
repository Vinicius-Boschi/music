import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import lyricsHandler from "./api/lyrics/index.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.get("/api/lyrics", (req, res) => lyricsHandler(req, res));

app.get("/api/test-deezer-chart", async (req, res) => {
  try {
    const urls = [
      "https://api.deezer.com/chart/0/artists",
      "https://api.deezer.com/chart/31/artists",
      "https://api.deezer.com/chart/BR/artists",
    ]

    const results = await Promise.all(
      urls.map(async (url) => {
        const response = await fetch(url)
        const data = await response.json()

        return {
          url,
          status: response.status,
          firstArtists: data?.data?.slice(0, 5).map((artist) => artist.name),
          error: data?.error || null,
        }
      })
    )

    res.json(results)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
})

app.get(/^\/api\/deezer\/(.+)/, async (req, res) => {
  try {
    const path = req.params[0];

    const queryString = new URLSearchParams(req.query).toString();

    const url = `https://api.deezer.com/${path}${
      queryString ? `?${queryString}` : ""
    }`;

    const response = await fetch(url);

    const data = await response.json();

    res.json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({ message: "API rodando!" });
});

app.listen(PORT, () => {
  console.log(`API rodando na porta ${PORT}`);
});
