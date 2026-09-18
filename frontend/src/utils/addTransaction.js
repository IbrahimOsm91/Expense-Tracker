import dayjs from "dayjs"


export function getOrCreateCategoryId({newTransaction, categories, setCategories}) {
  const categoryName = newTransaction.category.trim()

  // if the category input is empty, return the "Other" category ID.
  if (categoryName === '') { return '3' }

  const existingCategory = categories.find(
    cat => cat.name.toLowerCase() === categoryName.toLowerCase()
  )
  if (existingCategory) { return existingCategory.id }

  const newCategory = {
    id: crypto.randomUUID(),
    name: categoryName
  }

  setCategories(previousCategories => [
    ...previousCategories,
    newCategory
  ])

  return newCategory.id
}


export function addTransaction({ newTransaction, setNewTransaction, categories, setCategories, setItems }) {

  if (newTransaction.amount < 0 || newTransaction.amount === '') {
    alert('Please enter a valid amount!')
    return
  }

  const selectedCategoryId = getOrCreateCategoryId({newTransaction, categories, setCategories})

  setItems(prev => ([{
    description: newTransaction.description || 'Undefined',
    amount: Number(newTransaction.amount) || 0,
    categoryId: selectedCategoryId,
    time: newTransaction.time === ''
      ? dayjs().format('HH:mm')
      : newTransaction.time,
    date: newTransaction.date === ''
      ? dayjs().format('YYYY-MM-DD')
      : newTransaction.date,
    id: crypto.randomUUID()
  },
  ...prev
  ]))

  setNewTransaction({ description: '', amount: '', category: '', time: '', date: '' })
}