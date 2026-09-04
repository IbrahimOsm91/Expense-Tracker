import { ExpenseItem } from './ExpenseItem'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import './Expense.css'



export function ExpenseContainer({ expenses, setExpenses, totalExpenses }) {
  const [newExpense, setNewExpense] = useState({ description: '', amount: '', category: '' })
  const categories = ['Market', 'Kira', 'Ulaşım', 'Diğer']

  function handleChange(e) {
    const { name, value } = e.target
    setNewExpense({
      ...newExpense,
      [name]: value
    })
  }

  function addExpense() {
    if (newExpense.description === '' || newExpense.amount === '') {
      alert('Please fill the informations!')
      return
    }
    setExpenses([
      {
        description: newExpense.description || 'Undefined',
        amount: Number(newExpense.amount) || 0,
        category: newExpense.category,
        time: dayjs().format('h:mm A'),
        date: dayjs().format('YYYY-MM-DD'),
        id: crypto.randomUUID()
      },
      ...expenses
    ])
  }

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
    setNewExpense({ description: '', amount: '', category: '' })
  }, [expenses])


  return (
    <div className="expense-container">
      <div className='expense-header'>
        <h2>Expenses: ${totalExpenses}</h2>
      </div>

      <div className="add-item-form add-expense-form">

        <input type="text"
          name="description"
          placeholder="Description"
          value={newExpense.description || ''}
          onChange={handleChange} />

        <input type="number"
          name="amount"
          placeholder="Amount"
          value={newExpense.amount || ''}
          onChange={handleChange} />

        <select
          name="category"
          value={newExpense.category || ''}
          onChange={handleChange}>
          <option value="">Kategori seç</option>
          {categories.map(cat => {
            return <option key={cat} value={cat}>{cat}</option>
          })}
        </select>

        <button onClick={addExpense}>Confirm</button>
      </div>

      <div className="expense-list">
        <div className="expense-list-header">
          <span className="expense-description">Description</span>
          <span className="expense-amount">Amount</span>
          <span className="expense-category">Category</span>
          <span className="expense-time">Time</span>
          <span className="expense-date">Date</span>
        </div>

        {expenses.map(expense => {
          return (
            <ExpenseItem key={expense.id} {...expense} />
          )
        })}
      </div>
    </div>
  )
}