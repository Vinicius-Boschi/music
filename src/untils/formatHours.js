export function formatHours(seconds) {
  if (!seconds) return "0 min";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}`;
}