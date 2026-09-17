import { HomePage } from './pages/HomePage'
import { HistoryPage } from './pages/HistoryPage'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { getStoredCategoryData, getStoredItemData, useLocalStorage } from './utils/storage'
import './App.css'
import { NotFound } from './pages/NotFoundPage'


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

  useLocalStorage('expenses', expenses)
  useLocalStorage('incomes', incomes)
  useLocalStorage('expenseCategories', expenseCategories)
  useLocalStorage('incomeCategories', incomeCategories)


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

        <Route path="*"  element={<NotFound />}/>
    </Routes>
  )
}

export default App
