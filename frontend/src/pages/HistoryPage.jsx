import { Navigate, useParams } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import { TransactionContainer } from "../components/Transaction/TransactionContainer"
import { HistoryBar } from '../components/HistoryBar/HistoryBar'
import { getTotal } from "../utils/transactionCalculations"
import { filterItemsByMonth, filterTransactions } from "../utils/transactionFilters"
import './HistoryPage.css'



export function HistoryPage({
  expenses, incomes,
  expenseCategories, incomeCategories,
  setExpenses, setIncomes,
  setExpenseCategories, setIncomeCategories,
  netBalance,
  today
}) {
  const { type } = useParams()
  const isValidType = type === 'expense' || type === 'income'

  const items = type === 'expense' ? expenses : incomes
  const setItems = type === 'expense' ? setExpenses : setIncomes

  const categories = type === 'expense' ? expenseCategories : incomeCategories
  const setCategories = type === 'expense' ? setExpenseCategories : setIncomeCategories

  const title = type === 'expense' ? 'Expenses' : 'Incomes'
  const totalOfMonth = getTotal(filterItemsByMonth({items, date: today}))


  const lastMonthExpenseTotals = filterItemsByMonth({ items: expenses, date: today.subtract(1, 'month') }).reduce((acc, item) => acc += item.amount, 0)
  const lastMonthIncomeTotals = filterItemsByMonth({ items: incomes, date: today.subtract(1, 'month') }).reduce((acc, item) => acc += item.amount, 0)

  const lastMonthNet = lastMonthIncomeTotals - lastMonthExpenseTotals





  const [selectedCategories, setSelectedCategories] = useState([])

  const [filters, setFilters] = useState({
    description: '',
    minAmount: '', maxAmount: '',
    startDate: '', endDate: '',
  })

  useEffect(() => {
    setFilters({
      description: '',
      minAmount: '', maxAmount: '',
      startDate: '', endDate: '',
    })

    setSelectedCategories([])
  }, [type])


  const filteredItems = useMemo(() => {
    return filterTransactions({ items, filters, selectedCategories })
  }, [items, filters, selectedCategories])

  if (!isValidType) {
    return <Navigate to="/not-found" />
  }

  return (
    <div className="history-page">
      <HistoryBar
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories} />


      <TransactionContainer
        title={title}
        type={type}
        filteredItems={filteredItems}
        setItems={setItems}
        totalOfMonth={totalOfMonth}
        categories={categories}
        setCategories={setCategories}
        filters={filters}
        setFilters={setFilters}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        today={today}
        expenses={expenses}
        lastMonthNet={lastMonthNet}
        netBalance={netBalance}
      />
    </div>
  )
}