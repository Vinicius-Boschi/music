export function formatDate(data) {
  if (!data) return "-"

  const date = new Date(data)

  // Se for uma data inválida, retorna o original
  if (isNaN(date.getTime())) return data

  const day = String(date.getDate()).padStart(2, "0")
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}