import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
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

  const items = type === 'expense' ? expenses : incomes
  const setItems = type === 'expense' ? setExpenses : setIncomes
  const categories = type === 'expense' ? expenseCategories : incomeCategories
  const setCategories = type === 'expense' ? setExpenseCategories : setIncomeCategories
  const total = type === 'expense' ? totalExpenses : totalIncomes
  const title = type === 'expense' ? 'Expenses' : 'Incomes'



  const [selectedCategories, setSelectedCategories] = useState(
    categories.map(cat => (
      { id: cat.id, isChecked: false, name: cat.name }
    ))
  )


  useEffect(() => {
    setSelectedCategories(prev => (
      categories.map(cat => {
        const existing = prev.find(p => p.id === cat.id)
        return existing || { id: cat.id, isChecked: false, name: cat.name }
      })
    ))
  }, [categories])




  const [filters, setFilters] = useState({
    description: '',
    minAmount: '', maxAmount: '',
    startDate: '', endDate: '',
  })




  const [filteredItems, setFilteredItems] = useState([])


  useEffect(() => {
    const description = filters.description
    const minAmount = filters.minAmount
    const maxAmount = filters.maxAmount
    const startDate = filters.startDate
    const endDate = filters.endDate

    const checkedCategoryIds = selectedCategories
      .filter(cat => cat.isChecked)
      .map(cat => cat.id)
    const noCategorySelected = checkedCategoryIds.length === 0
    

    const filtered = items.filter(item => {
      const categoryOk = noCategorySelected || checkedCategoryIds.includes(item.categoryId)
      const descriptionOk = description === '' || item.description.includes(description)
      const amountOk = (minAmount === '' || item.amount >= minAmount) && (maxAmount === '' || item.amount <= maxAmount)
      const dateOk = (startDate === '' || item.date >= startDate) && (endDate === '' || item.date <= endDate)

      return categoryOk && descriptionOk && amountOk && dateOk
    })

    setFilteredItems(filtered)
  }, [filters, selectedCategories, items])


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