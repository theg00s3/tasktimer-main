export default function toISOSubstring (date = new Date()) {
  date = new Date(date)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  month = month < 10 ? `0${month}` : month
  let day = date.getDate()
  day = day < 10 ? `0${day}` : day
  return `${year}-${month}-${day}`
}
