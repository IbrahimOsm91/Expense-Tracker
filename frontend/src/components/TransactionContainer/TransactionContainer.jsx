import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ItemComponent } from '../ItemComponent/ItemComponent'
import './Transaction.css'





export function TransactionContainer({
  title,
  type,
  items,
  setItems,
  total,
  categories,
  setCategories,
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


    setItems([
      {
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
      ...items
    ])
  }

  useEffect(() => {
    localStorage.setItem(`${type}Categories`, JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem(type, JSON.stringify(items))
    setNewTransaction({ description: '', amount: '', category: '', time: '', date: '' })
  }, [items])


  return (
    <div className="transaction-container" data-type={type}>
      <div className="transaction-header">
        <h2>{title}: ${total}</h2>
      </div>

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

      <div className="transaction-list">
        <div className="transaction-list-header">
          <span className="transaction-description">Description</span>
          <span className="transaction-amount">Amount</span>
          <span className="transaction-category">Category</span>
          <span className="transaction-time">Time</span>
          <span className="transaction-date">Date</span>
        </div>

        {items.map(item => {
          return (
            <ItemComponent key={item.id}
              {...item}
              type={type}
              categories={categories}
              setCategories={setCategories}
              setItems={setItems} />
          )
        })}
      </div>
    </div>
  )
}