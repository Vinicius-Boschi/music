export function getRandomGenreColor() {
  const colors = [
    "#ff6b6b",
    "#6c5ce7",
    "#00cec9",
    "#fdcb6e",
    "#e17055",
    "#00b894",
    "#0984e3",
    "#e84393",
    "#FF8564",
    "#6C5B7B",
    "#355C7D",
    "#F67280",
    "#C06C84",
    "#6A0572",
    "#AB83A1",
    "#F8B195",
    "#AA3933",
  ]

  return colors[Math.floor(Math.random() * colors.length)]
}