const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
dayjs.extend(utc)

export default function toISOSubstring (date = new Date()) {
  return dayjs(date).format('YYYY-MM-DD')
}
