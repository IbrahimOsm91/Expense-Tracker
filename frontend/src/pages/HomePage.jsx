import { useState } from "react"
import { QuickAdd } from '../components/QuickAdd/QuickAdd'
import { PieChartComponent } from '../components/PieChartComponent/PieChartComponent'
import { MonthSelection } from "../components/MonthSelection/MonthSelection"




export function HomePage({
  expenses, incomes,
  expenseCategories, incomeCategories,
  setExpenses, setIncomes,
  setExpenseCategories, setIncomeCategories,
  totalExpensesOfMonth, totalIncomesOfMonth,
  netBalance, today, setToday
}) {
  const [quickAddType, setQuickAddType] = useState('expense')

  const categories = quickAddType === 'expense' ? expenseCategories : incomeCategories
  const setCategories = quickAddType === 'expense' ? setExpenseCategories : setIncomeCategories
  const setItems = quickAddType === 'expense' ? setExpenses : setIncomes


  return (
    <div className='body-container'>
      <div className="first-row">
        <h1>Expense Tracker</h1>

        <MonthSelection
          today={today}
          setToday={setToday} />
      </div>

      <div className='second-row'>
        <h2>
          Net Balance: <span style={{ color: netBalance > 0 ? '#2A6B5C' : '#E11A45' }}>{netBalance < 0 ? `-$${Math.abs(netBalance)}` : `$${netBalance}`}</span>
        </h2>

        <QuickAdd
          quickAddType={quickAddType}
          setQuickAddType={setQuickAddType}
          categories={categories}
          setCategories={setCategories}
          setItems={setItems} />
      </div>

      <div className="pie-charts-container">
        <PieChartComponent
          total={totalExpensesOfMonth}
          items={expenses}
          type='expense'
          title='Expense'
          categories={expenseCategories} />

        <PieChartComponent
          total={totalIncomesOfMonth}
          items={incomes}
          type='income'
          title='Income'
          categories={incomeCategories} />
      </div>
    </div>
  )
}