import dayjs from "dayjs"



export function filterWithDate(items, date) {
  return items.filter(item => dayjs(item.date).isSame(date, 'month'))
}

export function getTotal(items) {
  return items.reduce((acc, item) => acc + item.amount, 0)
}



export function filterTransactions({ items, filters, selectedCategories }) {
  const { description, minAmount, maxAmount, startDate, endDate } = filters
  const noCategorySelected = selectedCategories.length === 0


  const filtered = items.filter(item => {
    const categoryOk = noCategorySelected || selectedCategories.includes(item.categoryId)
    const descriptionOk = description === '' || item.description.includes(description)
    const amountOk = (minAmount === '' || item.amount >= minAmount) && (maxAmount === '' || item.amount <= maxAmount)
    const dateOk = (startDate === '' || item.date >= startDate) && (endDate === '' || item.date <= endDate)

    return categoryOk && descriptionOk && amountOk && dateOk
  })
  return filtered
}



export function categoryFinder(categories, id) {
  return categories.find(category => category.id === id)
}