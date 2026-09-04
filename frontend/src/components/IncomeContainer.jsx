
import { useEffect, useState } from 'react'
import { IncomeItem } from './IncomeItem'
import dayjs from 'dayjs'
import './Income.css'

export function IncomeContainer({ incomes, setIncomes, totalIncomes }) {
  const [newIncome, setNewIncome] = useState({ description: '', amount: '', category: '' })
  const categories = ['Salary', 'Freelance', 'Sales', 'Other']

  function handleChange(e) {
    const { name, value } = e.target
    setNewIncome({
      ...newIncome,
      [name]: value,
    })
  }

  function addIncome() {
    if (newIncome.description === '' || newIncome.amount === '') {
      alert('Please fill the informations!')
      return
    }
    setIncomes([
      {
        description: newIncome.description,
        amount: Number(newIncome.amount),
        category: newIncome.category,
        time: dayjs().format('h:m A'),
        date: dayjs().format('YYYY-MM-DD'),
        id: crypto.randomUUID()
      },
      ...incomes
    ])
  }

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes))
    setNewIncome({ description: '', amount: '', category: '' })
  }, [incomes])


  return (
    <div className="income-container">
      <div className='income-header'>
        <h2>Incomes: ${totalIncomes}</h2>
      </div>

      <div className="add-item-form add-income-form">

        <input type="text"
          name="description"
          placeholder="Description"
          value={newIncome.description || ''}
          onChange={handleChange} />

        <input type="number"
          name="amount"
          placeholder="Amount"
          value={newIncome.amount || ''}
          onChange={handleChange} />

        <select
          name="category"
          value={newIncome.category || ''}
          onChange={handleChange}>
          <option value="">Kategori seç</option>
          {categories.map(cat => {
            return <option key={cat} value={cat}>{cat}</option>
          })}
        </select>

        <button onClick={addIncome}>Confirm</button>
      </div>

      <div className="income-list">
        <div className="income-list-header">
          <span className="income-description">Description</span>
          <span className="income-amount">Amount</span>
          <span className="income-category">Category</span>
          <span className="income-time">Time</span>
          <span className="income-date">Date</span>
        </div>

        {incomes.map(income => {
          return (
            <IncomeItem key={income.id} {...income} />
          )
        })}
      </div>
    </div>
  )
}