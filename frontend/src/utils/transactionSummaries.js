import dayjs from 'dayjs'
import { calculateCategoryTotals } from './transactionCalculations'


// Finds the category with the highest total amount and returns a summary message.
export function getHighestCategoryMessage({ items, categories }) {
  const categoryTotals = calculateCategoryTotals({ items, categories })

  const highestCategory = Object.entries(categoryTotals).reduce((acc, category) => {
    return category[1] > acc[1]
      ? category : acc
  }, ['', 0])

  return highestCategory[1] === 0
    ? 'No item yet'
    : `${highestCategory[0]}: $${highestCategory[1]}`
}



// Finds the transaction with the highest amount and returns a summary message.
export function getHighestItemMessage({ items }) {
  const highestItem = items.reduce((acc, item) => item.amount >= acc.amount ? item : acc, { amount: 0 })
  return highestItem.amount === 0
    ? 'No item yet'
    : `${highestItem.description}: $${highestItem.amount}`
}



// Finds the day with the highest total amount and returns a summary message.
export function getHighestDayMessage({ items }) {
  const dates = {}

  items.forEach(item => {
    dates[item.date] = (dates[item.date] || 0) + item.amount
  })

  const highestDay = Object.entries(dates).reduce((acc, current) => current[1] > acc[1] ? current : acc, ['', 0])
  return highestDay[1] === 0
    ? 'No item yet'
    : `${dayjs(highestDay[0]).format('MMM D')}: $${highestDay[1]}`
}



// Finds the days with no expense and returns a summary message.
export function getNoSpendDaysMessage({ items, today }) {
  const firstDay = today.startOf('month')
  const noSpendDays = []
  const spendDays = []

  items.forEach(item => {
    if (item.amount === 0) return
    if (spendDays.includes(item.date)) return
    spendDays.push(item.date)
  })

  for (let i = 0; i < today.date(); i++) {
    const nextDay = firstDay.add(i, 'day').format('YYYY-MM-DD')
    if (!spendDays.includes(nextDay)) {
      noSpendDays.push(nextDay)
    }
  }

  if (noSpendDays.length === 1) { return `1 day (${dayjs(noSpendDays[0]).format('MMM D')})` }

  return noSpendDays.length + ' days'
}