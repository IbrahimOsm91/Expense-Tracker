import { useParams } from "react-router-dom"
import { useState } from "react"
import { TransactionContainer } from "../components/TransactionContainer/TransactionContainer"
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


{/*  const [selectedCategories, setSelectedCategories] = useState(
    categories.reduce((acc, category) => (
      { ...acc, [category.name]: false }
    ), {})
  )*/}

  const [selectedCategories, setSelectedCategories] = useState(
    categories.map(cat => (
      {name: cat.name, isChecked: false}
    ))
  )

  const [filters, setFilters] = useState({
    description: '',
    minAmount: '', maxAmount: '',
    startDate: '', endDate: '',
  })

  return (
    <div className="history-page">
      <HistoryBar
        categories={categories}
        filters={filters}
        setFilters={setFilters}
        setSelectedCategories={setSelectedCategories} />


      <TransactionContainer
        title={title}
        type={type}
        items={items}
        setItems={setItems}
        total={total}
        categories={categories}
        setCategories={setCategories}
        filters={filters}
        selectedCategories={selectedCategories}
      />
    </div>
  )
}