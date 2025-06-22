export function formatHours(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const formattedHours = String(hours).padStart(2)
  const formattedMinutes = String(minutes).padStart(2, "0")
  return `${formattedHours} hrs ${formattedMinutes}`
}