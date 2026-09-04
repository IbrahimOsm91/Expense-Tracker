import { useState } from 'react'
import { TransactionContainer } from './components/TransactionContainer'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expense')) || [])
  const [incomes, setIncomes] = useState(JSON.parse(localStorage.getItem('income')) || [])

  const [expenseCategories, setExpenseCategories] = useState(JSON.parse(localStorage.getItem('expenseCategories'))
    || [{ id: '1', name: 'Market' }, { id: '2', name: 'Rent' }, { id: '3', name: 'Other' }])
  const [incomeCategories, setIncomeCategories] = useState(JSON.parse(localStorage.getItem('incomeCategories'))
    || [{ id: '1', name: 'Salary' }, { id: '2', name: 'Freelance' }, { id: '3', name: 'Other' }])

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0)

  return (
    <>
      <h1>Expense Tracker</h1>
      <h2>Net Balance</h2>
      <span>${totalIncomes - totalExpenses}</span>


      <TransactionContainer
        title="Expenses"
        type="expense"
        items={expenses}
        setItems={setExpenses}
        total={totalExpenses}
        categories={expenseCategories}
        setCategories={setExpenseCategories} />

      <TransactionContainer
        title="Incomes"
        type="income"
        items={incomes}
        setItems={setIncomes}
        total={totalIncomes}
        categories={incomeCategories}
        setCategories={setIncomeCategories} />
    </>
  )
}

export default App
