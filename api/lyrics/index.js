import Genius from "genius-lyrics"
const client = new Genius.Client(
  "k9I8sEt0VO5kqb1U-KpF_AJ2ZbfCgwxJaA5Y422oZ6HGaR2SiQ770QmFEigBPEMv"
)

export default async function handler(req, res) {
  const { title, artist } = req.query
  if (!title || !artist)
    return res.status(400).json({ error: "Título e artista são obrigatórios" })

  try {
    const searches = await client.songs.search(`${title} ${artist}`)
    const song =
      searches.find(
        (s) => s.artist.name.toLowerCase() === artist.toLowerCase()
      ) || searches[0]
    if (!song) return res.status(404).json({ error: "Letra não encontrada" })

    const lyrics = await song.lyrics()
    if (!lyrics || !lyrics.trim())
      return res.status(404).json({ error: "Letra não encontrada" })

    return res.status(200).json({ lyrics })
  } catch (err) {
    console.error("Erro Genius API:", err)
    return res.status(500).json({ error: "Erro ao buscar letra." })
  }
}