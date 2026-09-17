import { Navigate, useParams } from "react-router-dom"
import { useState, useEffect, useMemo } from "react"
import { TransactionContainer } from "../components/Transaction/TransactionContainer"
import { HistoryBar } from '../components/HistoryBar/HistoryBar'
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



  const [selectedCategories, setSelectedCategories] = useState(
    categories.map(cat => (
      { id: cat.id, isChecked: false, name: cat.name }
    ))
  )

  const noCategorySelected = selectedCategories.every(cat => !cat.isChecked)


  useEffect(() => {
    if (noCategorySelected) return
    setSelectedCategories(prev => (
      categories.map(cat => {
        const existing = prev.find(p => p.id === cat.id)
        return existing || { id: cat.id, isChecked: false, name: cat.name }
      })
    ))
  }, [categories, noCategorySelected])




  const [filters, setFilters] = useState({
    description: '',
    minAmount: '', maxAmount: '',
    startDate: '', endDate: '',
  })


  const filteredItems = useMemo(() => {
    const description = filters.description
    const minAmount = filters.minAmount
    const maxAmount = filters.maxAmount
    const startDate = filters.startDate
    const endDate = filters.endDate

    const checkedCategoryIds = selectedCategories
      .filter(cat => cat.isChecked)
      .map(cat => cat.id)

    const filtered = items.filter(item => {
      const categoryOk = noCategorySelected || checkedCategoryIds.includes(item.categoryId)
      const descriptionOk = description === '' || item.description.includes(description)
      const amountOk = (minAmount === '' || item.amount >= minAmount) && (maxAmount === '' || item.amount <= maxAmount)
      const dateOk = (startDate === '' || item.date >= startDate) && (endDate === '' || item.date <= endDate)

      return categoryOk && descriptionOk && amountOk && dateOk
    })
    return filtered
  }, [items, filters, selectedCategories, noCategorySelected])

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