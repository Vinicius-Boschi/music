export function formatNumber(number) {
  if (number !== undefined && number !== null) {
    return number.toLocaleString("pt-BR")
  } else {
    return "0"
  }
}