import { useState } from "react"
import { QuickAdd } from '../components/QuickAdd/QuickAdd'
import { PieChartComponent } from '../components/PieChartComponent/PieChartComponent'
import dayjs from "dayjs"




export function HomePage({
  expenses, incomes,
  expenseCategories, incomeCategories,
  setExpenses, setIncomes,
  setExpenseCategories, setIncomeCategories,
  totalExpensesOfMonth, totalIncomesOfMonth,
  date, setDate
}) {
  const [quickAddType, setQuickAddType] = useState('expense')
  const netBalance = totalIncomesOfMonth - totalExpensesOfMonth

  function dateCheck() {
    return date.isSame(dayjs(), 'month')
  }



  return (
    <div className='body-container'>
      <div className="first-row">
        <h1>Expense Tracker</h1>

        <div className="date-selection-container">

          <button className="this-month-btn"
            disabled={dateCheck()}
            onClick={() => setDate(dayjs())}
          >
            This Month
          </button>

          <button
            onClick={() => setDate(pre => pre.subtract(1, "month"))}
          >
            {`↩`}
          </button>

          <span>{date.startOf("month").format('YYYY-MM-DD')}</span>
          /
          <span>{date.endOf("month").format('YYYY-MM-DD')}</span>

          <button
            onClick={() => setDate(pre => pre.add(1, "month"))}
          >
            {`↪`}
          </button>
        </div>
      </div>

      <div className='second-row'>
        <h2>
          Net Balance: <span style={{ color: netBalance > 0 ? '#2A6B5C' : '#E11A45' }}>{netBalance < 0 ? `-$${Math.abs(netBalance)}` : `$${netBalance}`}</span>
        </h2>

        <QuickAdd
          quickAddType={quickAddType}
          setQuickAddType={setQuickAddType}
          categories={quickAddType === 'expense' ? expenseCategories : incomeCategories}
          setCategories={quickAddType === 'expense' ? setExpenseCategories : setIncomeCategories}
          setItems={quickAddType === 'expense' ? setExpenses : setIncomes} />
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