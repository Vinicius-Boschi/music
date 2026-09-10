export function formatDate(data) {
  if (!data) return "-"

  // Timestamp Unix em segundos
  if (typeof data === "number" || /^\d+$/.test(String(data))) {
    const timestamp = Number(data)

    // Converte segundos para milissegundos
    const date = new Date(
      timestamp < 10000000000 ? timestamp * 1000 : timestamp,
    )

    if (isNaN(date.getTime())) return String(data)

    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0")
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  // Data no formato YYYY-MM-DD
  const match = String(data).match(/^(\d{4})-(\d{2})-(\d{2})$/)

  if (match) {
    const [, year, month, day] = match
    return `${day}/${month}/${year}`
  }

  // Outros formatos de data
  const date = new Date(data)

  if (isNaN(date.getTime())) return data

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}