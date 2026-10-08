import dayjs from "dayjs"
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import { HomePage } from './pages/HomePage'
import { HistoryPage } from './pages/HistoryPage'
import { NotFound } from './pages/NotFoundPage'
import { getStoredCategoryData, getStoredItemData, useLocalStorage } from './utils/storage'
import { getTotal } from './utils/transactionCalculations'
import { filterItemsByMonth } from './utils/transactionFilters'
import './App.css'



function App() {
  const [today, setToday] = useState(dayjs())
  const [expenses, setExpenses] = useState(() => getStoredItemData('expenses'))
  const [incomes, setIncomes] = useState(() => getStoredItemData('incomes'))

  const expensesOfMonth = filterItemsByMonth({ items: expenses, date: today })
  const incomesOfMonth = filterItemsByMonth({ items: incomes, date: today })

  const [expenseCategories, setExpenseCategories] = useState(
    () => getStoredCategoryData('expenseCategories')
    || [{ id: '1', name: 'Market' }, { id: '2', name: 'Rent' }, { id: '3', name: 'Other' }]
  )

  const [incomeCategories, setIncomeCategories] = useState(
    () => getStoredCategoryData('incomeCategories')
    || [{ id: '1', name: 'Salary' }, { id: '2', name: 'Freelance' }, { id: '3', name: 'Other' }]
  )

 
  const totalExpensesOfMonth = getTotal(expensesOfMonth)
  const totalIncomesOfMonth = getTotal(incomesOfMonth)
  const netBalance = totalIncomesOfMonth - totalExpensesOfMonth

  useLocalStorage('expenses', expenses)
  useLocalStorage('incomes', incomes)
  useLocalStorage('expenseCategories', expenseCategories)
  useLocalStorage('incomeCategories', incomeCategories)


  return (
    <Routes>
      <Route index element={<HomePage
        expenses={expensesOfMonth}
        incomes={incomesOfMonth}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        setExpenses={setExpenses}
        setIncomes={setIncomes}
        setExpenseCategories={setExpenseCategories}
        setIncomeCategories={setIncomeCategories}
        totalExpensesOfMonth={totalExpensesOfMonth}
        totalIncomesOfMonth={totalIncomesOfMonth}
        netBalance={netBalance}
        today={today}
        setToday={setToday} />} />

      <Route path="/history/:type" element={<HistoryPage
        expenses={expenses}
        incomes={incomes}
        expenseCategories={expenseCategories}
        incomeCategories={incomeCategories}
        setExpenses={setExpenses}
        setIncomes={setIncomes}
        setExpenseCategories={setExpenseCategories}
        setIncomeCategories={setIncomeCategories}
        netBalance={netBalance}
        today={today} />} />

        <Route path="*"  element={<NotFound />}/>
    </Routes>
  )
}

export default App
