import { filterItemsByMonth } from "./transactionFilters"




export function categoryFinder(categories, id) {
  return categories.find(category => category.id === id)
}


// Calculates total amount.
export function getTotal(items) {
  return items.reduce((acc, item) => acc + item.amount, 0)
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
    .filter(([, value]) => value > 0)
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




// Calculates net balance (incomes minus expenses) for the given month
export function calculateNetBalanceByMonth({ incomes, expenses, date }) {
  const incomeTotal = getTotal(filterItemsByMonth({ items: incomes, date }))
  const expenseTotal = getTotal(filterItemsByMonth({ items: expenses, date }))

  return incomeTotal - expenseTotal
}