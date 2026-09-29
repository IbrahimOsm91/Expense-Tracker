import { Navigate, useParams } from "react-router-dom"
import { useState, useMemo } from "react"
import { TransactionContainer } from "../components/Transaction/TransactionContainer"
import { HistoryBar } from '../components/HistoryBar/HistoryBar'
import { filterTransactions } from "../utils/transactionHelpers"
import './HistoryPage.css'

export function HistoryPage({
  expenses, incomes,
  expenseCategories, incomeCategories,
  setExpenses, setIncomes,
  setExpenseCategories, setIncomeCategories,
  totalExpenses, totalIncomes
}) {
  const { type } = useParams()
  const isValidType = type === 'expense' || type === 'income'

  const items = useMemo(() => {
    if (!isValidType) return []
    return type === 'expense' ? expenses : incomes

  }, [isValidType, type, expenses, incomes])

  const setItems = isValidType
    ? (type === 'expense' ? setExpenses : setIncomes)
    : () => { }

  const categories = useMemo(() => {
    if (!isValidType) return []
    return type === 'expense' ? expenseCategories : incomeCategories
  }, [isValidType, type, expenseCategories, incomeCategories])

  const setCategories = isValidType
    ? (type === 'expense' ? setExpenseCategories : setIncomeCategories)
    : () => { }

  const total = isValidType
    ? (type === 'expense' ? totalExpenses : totalIncomes)
    : 0

  const title = type === 'expense' ? 'Expenses' : 'Incomes'



  const [selectedCategories, setSelectedCategories] = useState([])



  const [filters, setFilters] = useState({
    description: '',
    minAmount: '', maxAmount: '',
    startDate: '', endDate: '',
  })


  const filteredItems = useMemo(() => {
    return filterTransactions({items, filters, selectedCategories})
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
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />
    </div>
  )
}