import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { ItemComponent } from '../ItemComponent/ItemComponent'
import './Expense.css'
import './Income.css'





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


  function addTransaction() {
    if (newTransaction.amount === '') {
      alert('Please fill the informations!')
      return
    }

    const newCategory = {
      id: crypto.randomUUID(),
      name: newTransaction.category
    }

    // If there is no same category in database, create a new category.
    if (!categories.some(
      cat => cat.name.toLowerCase() === newCategory.name.toLocaleLowerCase()
    )) {
      setCategories([
        ...categories,
        newCategory
      ])
    }

    const existingCategory = categories.find(
      cat => cat.name.toLowerCase() === newCategory.name.toLocaleLowerCase()
    )


    setItems([
      {
        description: newTransaction.description || 'Undefined',
        amount: Number(newTransaction.amount) || 0,
        categoryId: existingCategory?.id || newCategory.id || 'undefined',
        time: newTransaction.time === ''
          ? dayjs().format('h:mm A')
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
    <div className={`${type}-container`}>
      <div className={`${type}-header`}>
        <h2>{title}: ${total}</h2>
      </div>

      <div className={`add-item-form add-${type}-form`}>

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

      <div className={`${type}-list`}>
        <div className={`${type}-list-header`}>
          <span className={`${type}-description`}>Description</span>
          <span className={`${type}-amount`}>Amount</span>
          <span className={`${type}-category`}>Category</span>
          <span className={`${type}-time`}>Time</span>
          <span className={`${type}-date`}>Date</span>
        </div>

        {items.map(item => {
          return (
            <ItemComponent key={item.id} {...item} type={type} categories={categories} />
          )
        })}
      </div>
    </div>
  )
}