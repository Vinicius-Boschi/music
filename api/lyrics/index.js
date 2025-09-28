import * as Genius from "genius-lyrics"

export default async function handler(req, res) {
  try {
    const { query } = req.query
    if (!query) return res.status(400).json({ error: "Query não informada" })

    const client = new Genius.Client(process.env.GENIUS_API_KEY)
    const searches = await client.songs.search(query)

    if (!searches.length)
      return res.status(404).json({ error: "Letra não encontrada" })

    const song = searches[0]
    const lyrics = await song.lyrics()

    res.status(200).json({ lyrics })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message })
  }
}