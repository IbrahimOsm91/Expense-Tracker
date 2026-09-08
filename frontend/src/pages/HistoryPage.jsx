import { useParams } from "react-router-dom"
import { TransactionContainer } from "../components/TransactionContainer/TransactionContainer"

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

  return (
    <TransactionContainer
      title={title}
      type={type}
      items={items}
      setItems={setItems}
      total={total}
      categories={categories}
      setCategories={setCategories}
    />
  )
}