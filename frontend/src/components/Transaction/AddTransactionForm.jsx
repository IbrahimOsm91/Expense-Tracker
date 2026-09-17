import { useState } from 'react'
import { addTransaction } from '../../utils/addTransaction'

export function AddTransactionForm({
  type,
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

        <button onClick={() => addTransaction({newTransaction, setNewTransaction, categories, setCategories, setItems})}>Confirm</button>
      </div>
    </div>
  )
}