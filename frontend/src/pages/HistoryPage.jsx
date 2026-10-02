import { Navigate, useParams } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import { TransactionContainer } from "../components/Transaction/TransactionContainer"
import { HistoryBar } from '../components/HistoryBar/HistoryBar'
import { filterTransactions } from "../utils/transactionHelpers"
import './HistoryPage.css'

  function getLastMonthItems(items, date) {
    const lastMonth = date.subtract(1, 'month')
    return items.filter(item => (
      item.date >= lastMonth.startOf('month').format('YYYY-MM-DD')
      &&
      item.date <= lastMonth.endOf('month').format('YYYY-MM-DD')
    ))
  }

export function HistoryPage({
  expenses, incomes,
  expenseCategories, incomeCategories,
  setExpenses, setIncomes,
  setExpenseCategories, setIncomeCategories,
  totalExpenses, totalIncomes,
  date
}) {
  const { type } = useParams()
  const isValidType = type === 'expense' || type === 'income'

  const items = type === 'expense' ? expenses : incomes
  const setItems = type === 'expense' ? setExpenses : setIncomes

  const categories = type === 'expense' ? expenseCategories : incomeCategories
  const setCategories = type === 'expense' ? setExpenseCategories : setIncomeCategories

  const total = type === 'expense' ? totalExpenses : totalIncomes
  const title = type === 'expense' ? 'Expenses' : 'Incomes'


  const lastMonthExpenseTotals = getLastMonthItems(expenses, date).reduce((acc, item) => acc += item.amount, 0)
  const lastMonthIncomeTotals = getLastMonthItems(incomes, date).reduce((acc, item) => acc += item.amount, 0)

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
        items={items}
        filteredItems={filteredItems}
        setItems={setItems}
        total={total}
        categories={categories}
        setCategories={setCategories}
        filters={filters}
        setFilters={setFilters}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        date={date}
        lastMonthNet={lastMonthNet}
      />
    </div>
  )
}