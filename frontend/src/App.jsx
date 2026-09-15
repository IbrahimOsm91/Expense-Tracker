import { HomePage } from './pages/HomePage'
import { HistoryPage } from './pages/HistoryPage'
import { Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import './App.css'


function App() {

  function isValid(data) {
    if (!Array.isArray(data)) return false
    const requiredProperties = ['description', 'amount', 'categoryId', 'time', 'date', 'id']
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/
    const timeRegex = /^\d{2}:\d{2}$/


    function dateOk({ item, property }) {
      if (!dateRegex.test(item[property])) return false

      const parts = item[property].split("-")
      const year = Number(parts[0])
      const month = Number(parts[1])
      const day = Number(parts[2])

      const newDate = new Date(year, month - 1, day)
      if (
        newDate.getFullYear() !== year
        || newDate.getMonth() !== month - 1
        || newDate.getDate() !== day
      ) return false

      return true
    }


    function timeOk({ item, property }) {
      if (!timeRegex.test(item[property])) return false
      const parts = item[property].split(":")
      const hour = Number(parts[0])
      const minute = Number(parts[1])

      if (hour > 23 || hour < 0 || minute > 59 || minute < 0) return false

      return true
    }




    return data.every(item => {
      if ((typeof item !== 'object') || (item === null)) return false

      if (Object.keys(item).length !== requiredProperties.length) return false

      return requiredProperties.every(property => {
        return (
          (property in item)
          && (
            (property === 'date' && dateOk({ item, property }))
            || (property === 'time' && timeOk({ item, property }))
            || (property === 'amount' && Number.isFinite(item[property]))
            || (property !== 'amount' && property !== 'date' && property !== 'time' && typeof item[property] === 'string' && item[property].trim() !== '')
          )
        )
      })
    })
  }

  function getStoredData(list) {
    try {
      const data = JSON.parse(localStorage.getItem(list))
      if (!isValid(data)) {
        throw new Error(`${list} data is not valid`)
      }
      return data
    } catch (error) {
      console.log(error)
      return []
    }
  }

  const [expenses, setExpenses] = useState(() => getStoredData('expense'))
  const [incomes, setIncomes] = useState(() => getStoredData('income'))

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
