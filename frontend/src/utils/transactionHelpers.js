import dayjs from "dayjs"

// Returns the items that belong to the same month and year as the given date.
export function filterItemsByMonth(items, date) {
  return items.filter(item => dayjs(item.date).isSame(date, 'month'))
}

// Calculates total amount.
export function getTotal(items) {
  return items.reduce((acc, item) => acc + item.amount, 0)
}


// Consolidates search and filtering rules in a single place and filters the transactions and sort them.
export function filterTransactions({ items, filters, selectedCategories }) {
  const { description, minAmount, maxAmount, startDate, endDate } = filters
  const noCategorySelected = selectedCategories.length === 0

  const filtered = items.filter(item => {

    const categoryOk = noCategorySelected || selectedCategories.includes(item.categoryId)

    const descriptionOk = description === '' ||
      item.description.toLowerCase().includes(description.toLowerCase())

    const amountOk = (minAmount === '' || item.amount >= minAmount) && (maxAmount === '' || item.amount <= maxAmount)

    const dateOk = (startDate === '' || item.date >= startDate) && (endDate === '' || item.date <= endDate)

    return categoryOk && descriptionOk && amountOk && dateOk
  }).sort((a, b) => b.date.localeCompare(a.date))
  return filtered
}




// Calculates total amounts for each category.
export function calculateCategoryTotals({ items, categories }) {
  const categoryTotals = {}

  categories.forEach((cat) => {
    categoryTotals[cat.name] = 0
  })

  items.forEach(item => {
    const matchedCategory = categoryFinder(categories, item.categoryId)
    if (!matchedCategory) {
      console.log('Category could not be found!')
      return
    }

    categoryTotals[matchedCategory.name] += item.amount
  })
  return categoryTotals
}




// Groups pie chart data and combine small categories under "Rest".
export function calculatePieData({ items, categories }) {
  const categoryTotals = calculateCategoryTotals({ items, categories })

  const chartData = Object.entries(categoryTotals)
    .filter(([_, value]) => value > 0)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)

  if (chartData.length <= 6) {
    return chartData
  }

  const totalValue = chartData.reduce((sum, item) => sum + item.value, 0)
  const majorItems = chartData.filter((item) => (item.value / totalValue) >= 0.05)
  const minorItems = chartData.filter(item => (item.value / totalValue) < 0.05)
  const minorTotal = minorItems.reduce((sum, item) => sum + item.value, 0)

  return minorTotal > 0
    ? [...majorItems, { name: 'Rest', value: minorTotal }]
    : majorItems
}


export function categoryFinder(categories, id) {
  return categories.find(category => category.id === id)
}


// Finds the category with the highest total amount and returns a summary message.
export function getHighestCategoryMessage({ items, categories }) {
  const categoryTotals = calculateCategoryTotals({ items, categories })

  const highestCategory = Object.entries(categoryTotals).reduce((acc, category) => {
    return category[1] > acc[1]
      ? category : acc
  }, ['No item yet', 0])
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
    if (!dates[item.date]) { dates[item.date] = item.amount }
    else { dates[item.date] += item.amount }
  })

  const highestDay = Object.entries(dates).reduce((acc, current) => current[1] > acc[1] ? current : acc, ['No item yet', 0])
  return highestDay[1] === 0
    ? 'No item yet'
    : `${dayjs(highestDay[0]).format('MMM D')}: $${highestDay[1]}`
}

export function getThisMonthItems({ items, today }) {
  return items.filter(item => (
    item.date >= today.startOf('month').format('YYYY-MM-DD')
    &&
    item.date <= today.endOf('month').format('YYYY-MM-DD')
  ))
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

  if (noSpendDays.length === 0) { return '0 days' }
  if (noSpendDays.length === 1) { return `1 day (${dayjs(noSpendDays[0]).format('MMM D')})` }

  return noSpendDays.length + ' days'
}


export function getLastMonthItems(items, today) {
  const lastMonth = today.subtract(1, 'month')
  return items.filter(item => dayjs(item.date).isSame(lastMonth, 'month'))
}