export default async function handler(req, res) {
  const { path } = req.query
  const deezerPath = Array.isArray(path) ? path.join("/") : path

  try {
    const response = await fetch(`https://api.deezer.com/${deezerPath}`)
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Erro Deezer: ${response.statusText}` })
    }

    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error("Erro ao buscar Deezer API:", err)
    res.status(500).json({ error: "Erro ao buscar Deezer." })
  }
}