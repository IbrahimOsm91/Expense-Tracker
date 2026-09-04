import {ExpenseContainer} from './components/ExpenseContainer'
import {IncomeContainer} from './components/IncomeContainer'
import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expenses')) || [])
  const [incomes, setIncomes] = useState(JSON.parse(localStorage.getItem('incomes')) || [])

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0)

  return (
    <>
      <h1>Expense Tracker</h1>
      <h2>Net Balance</h2>
      <span>${totalIncomes - totalExpenses}</span>

      <ExpenseContainer expenses={expenses} setExpenses={setExpenses} totalExpenses={totalExpenses} />

      <IncomeContainer incomes={incomes} setIncomes={setIncomes} totalIncomes={totalIncomes} />
    </>
  )
}

export default App
