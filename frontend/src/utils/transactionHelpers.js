import dayjs from "dayjs"

// Date based filtering: returns transactions for the specified date.
export function filterWithDate(items, date) {
  return items.filter(item => dayjs(item.date).isSame(date, 'month'))
}

// Calculates total amount.
export function getTotal(items) {
  return items.reduce((acc, item) => acc + item.amount, 0)
}

// Arama ve filtreleme kurallarını tek noktada toplar.
// Consolidates search and filtering rules in a single place and filters the transactions.
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
  })
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
    : `${highestDay[0]}: $${highestDay[1]}`
}

// Pasta grafiğinde gösterilecek veriyi gruplayıp küçük kategorileri "Rest" olarak birleştirir.
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