import { HomePage } from './pages/HomePage'
import { HistoryPage } from './pages/HistoryPage'
import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getStoredCategoryData, getStoredItemData } from './utils/storage'
import './App.css'


function App() {
  const [expenses, setExpenses] = useState(() => getStoredItemData('expenses'))
  const [incomes, setIncomes] = useState(() => getStoredItemData('incomes'))

  const [expenseCategories, setExpenseCategories] = useState(
    getStoredCategoryData('expenseCategories')
    || [{ id: '1', name: 'Market' }, { id: '2', name: 'Rent' }, { id: '3', name: 'Other' }]
  )

  const [incomeCategories, setIncomeCategories] = useState(
    getStoredCategoryData('incomeCategories')
    || [{ id: '1', name: 'Salary' }, { id: '2', name: 'Freelance' }, { id: '3', name: 'Other' }]
  )


  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0)

  useEffect(() => {
    localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories))
  }, [expenseCategories])

  useEffect(() => {
    localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories))
  }, [incomeCategories])

  useEffect(() => {
    localStorage.setItem('expenses', JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem('incomes', JSON.stringify(incomes))
  }, [incomes])

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
