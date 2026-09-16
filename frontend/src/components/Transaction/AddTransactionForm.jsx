import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export function AddTransactionForm({
  type,
  items,
  setItems,
  categories,
  setCategories,
  isFormVisible
}) {
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', category: '', time: '', date: '' })

  function handleChange(e) {
    const { name, value } = e.target
    setNewTransaction({
      ...newTransaction,
      [name]: value
    })
  }

  function getOrCreateCategoryId() {
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

  function addTransaction() {
    if (newTransaction.amount === '') {
      alert('Please fill the informations!')
      return
    }

    const selectedCategoryId = getOrCreateCategoryId()

    setItems(prev => ([{
      description: newTransaction.description || 'Undefined',
      amount: Number(newTransaction.amount) || 0,
      categoryId: selectedCategoryId || 'undefined',
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
  }

  useEffect(() => {
    localStorage.setItem(type, JSON.stringify(items))
    setNewTransaction({ description: '', amount: '', category: '', time: '', date: '' })
  }, [items, type])

  return (
    isFormVisible &&
    <div className="add-item-form add-transaction-form">

      <div>
        <input type="text"
          name="description"
          placeholder="Description"
          value={newTransaction.description || ''}
          onChange={handleChange} />

        <input type="number"
          className='input-amount'
          name="amount"
          placeholder="Amount"
          value={newTransaction.amount || ''}
          onChange={handleChange} />
      </div>

      <div>
        <input className='category-input' list={`${type}-categories`} name="category" value={newTransaction.category}
          placeholder='Category'
          onChange={handleChange} />

        <datalist id={`${type}-categories`}>
          {categories.map(cat => {
            return <option key={cat.id} value={cat.name} />
          })}
        </datalist>

        <input type="time"
          name='time'
          value={newTransaction.time}
          onChange={handleChange} />

        <input type="date"
          name='date'
          value={newTransaction.date}
          onChange={handleChange} />

        <button onClick={addTransaction}>Confirm</button>
      </div>
    </div>
  )
}