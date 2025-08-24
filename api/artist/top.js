export default async function handler(req, res) {
  const { id, limit } = req.query
  try {
    const response = await fetch(
      `https://api.deezer.com/artist/${id}/top?limit=${limit || 100}`
    )
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao buscar top músicas." })
  }
}