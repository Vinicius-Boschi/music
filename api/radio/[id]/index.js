export default async function handler(req, res) {
  try {
    const { id } = req.query
    const response = await fetch(`https://api.deezer.com/radio/${id}`)
    const data = await response.json()
    res.status(200).json(data)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Erro ao buscar a rádio específica." })
  }
}