import { useState } from "react"
import { QuickAdd } from '../components/QuickAdd/QuickAdd'
import { PieChartComponent } from '../components/PieChartComponent/PieChartComponent'




export function HomePage({
  expenses, incomes,
  expenseCategories, incomeCategories,
  setExpenses, setIncomes,
  setExpenseCategories, setIncomeCategories,
  totalExpenses, totalIncomes
}) {
  const [quickAddType, setQuickAddType] = useState('expense')
  const netBalance = totalIncomes - totalExpenses



  return (
    <div className='body-container'>

      <h1>Expense Tracker</h1>

      <div className='top-row'>
        <h2>
          Net Balance: <span style={{ color: netBalance > 0 ? '#38d9a9' : '#f783ac' }}>${netBalance}</span>
        </h2>

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
          type='expense'
          title='Expense'
          categories={expenseCategories} />

        <PieChartComponent
          total={totalIncomes}
          items={incomes}
          type='income'
          title='Income'
          categories={incomeCategories} />
      </div>
    </div>
  )
}