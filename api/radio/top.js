export default async function handler(req, res) {
  const limit = req.query.limit || 100
  try {
    const response = await fetch(`https://api.deezer.com/radio/top?limit=${limit}`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao buscar top rádios." })
  }
}