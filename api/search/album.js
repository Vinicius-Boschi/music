export default async function handler(req, res) {
  const { q } = req.query
  try {
    const response = await fetch(`https://api.deezer.com/search/album?q=${q}`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao buscar álbuns." })
  }
}