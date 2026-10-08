import dayjs from "dayjs"



// Returns the items that belong to the same month and year as the given date.
export function filterItemsByMonth({items, date}) {
  return items.filter(item => dayjs(item.date).isSame(date, 'month'))
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
