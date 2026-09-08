import { HomePage } from './pages/HomePage'
import { HistoryPage } from './pages/HistoryPage'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'


function App() {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expense')) || [])
  const [incomes, setIncomes] = useState(JSON.parse(localStorage.getItem('income')) || [])

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0)

  const [expenseCategories, setExpenseCategories] = useState(
    JSON.parse(localStorage.getItem('expenseCategories'))
    || [{ id: '1', name: 'Market' }, { id: '2', name: 'Rent' }, { id: '3', name: 'Other' }]
  )

  const [incomeCategories, setIncomeCategories] = useState(
    JSON.parse(localStorage.getItem('incomeCategories'))
    || [{ id: '1', name: 'Salary' }, { id: '2', name: 'Freelance' }, { id: '3', name: 'Other' }]
  )

  return (
    <Routes>
      <Route index element={<HomePage
        expenses={expenses}
        incomes={incomes}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        setExpenses={setExpenses}
        setIncomes={setIncomes}
        setExpenseCategories={setExpenseCategories}
        setIncomeCategories={setIncomeCategories}
        totalExpenses={totalExpenses}
        totalIncomes={totalIncomes} />} />

      <Route path="/history/:type" element={<HistoryPage
        expenses={expenses}
        incomes={incomes}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        setExpenses={setExpenses}
        setIncomes={setIncomes}
        setExpenseCategories={setExpenseCategories}
        setIncomeCategories={setIncomeCategories}
        totalExpenses={totalExpenses}
        totalIncomes={totalIncomes} />} />
    </Routes>
  )
}

export default App
