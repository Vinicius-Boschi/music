export function formatDate(data) {
  if (!data) return "-"
  const [datePart] = data.split("T")
  const [year, month, day] = datePart.split("-")
  return `${day}/${month}/${year}`
}