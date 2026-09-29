import dayjs from "dayjs"



export function filterWithDate(items, date) {
  return items.filter(item => dayjs(item.date).isSame(date, 'month'))
}

export function getTotal(items) {
  return items.reduce((acc, item) => acc + item.amount, 0)
}