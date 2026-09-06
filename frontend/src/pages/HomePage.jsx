import { useState } from "react"
import { QuickAdd } from '../components/QuickAdd/QuickAdd'
import { PieChartComponent } from '../components/PieChartComponent/PieChartComponent'




export function HomePage() {
  const [expenses, setExpenses] = useState(JSON.parse(localStorage.getItem('expense')) || [])
  const [incomes, setIncomes] = useState(JSON.parse(localStorage.getItem('income')) || [])

  const [expenseCategories, setExpenseCategories] = useState(
    JSON.parse(localStorage.getItem('expenseCategories'))
    || [{ id: '1', name: 'Market' }, { id: '2', name: 'Rent' }, { id: '3', name: 'Other' }]
  )

  const [incomeCategories, setIncomeCategories] = useState(
    JSON.parse(localStorage.getItem('incomeCategories'))
    || [{ id: '1', name: 'Salary' }, { id: '2', name: 'Freelance' }, { id: '3', name: 'Other' }]
  )

  const [quickAddType, setQuickAddType] = useState('expense')

  const totalExpenses = expenses.reduce((acc, expense) => acc + expense.amount, 0)
  const totalIncomes = incomes.reduce((acc, income) => acc + income.amount, 0)
  const netBalance = totalIncomes - totalExpenses



  return (
    <div className='body-container'>

      <h1>Expense Tracker</h1>

      <div className='top-row'>
        <h2 style={{ color: netBalance > 0 ? '#38d9a9' : '#f783ac' }}
        >Net Balance: ${netBalance}</h2>

        <QuickAdd
          quickAddType={quickAddType}
          setQuickAddType={setQuickAddType}
          categories={quickAddType === 'expense' ? expenseCategories : incomeCategories}
          setCategories={quickAddType === 'expense' ? setExpenseCategories : setIncomeCategories}
          items={quickAddType === 'expense' ? expenses : incomes}
          setItems={quickAddType === 'expense' ? setExpenses : setIncomes} />
      </div>

      <div className="pie-charts-container">
        <PieChartComponent
          total={totalExpenses}
          items={expenses}
          type='Expense'
          categories={expenseCategories} />

        <PieChartComponent
          total={totalIncomes}
          items={incomes}
          type='Income'
          categories={incomeCategories} />
      </div>
    </div>
  )
}