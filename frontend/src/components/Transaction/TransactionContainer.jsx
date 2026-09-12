import { useEffect, useState } from 'react'
import { AddTransactionForm } from './AddTransactionForm'
import { ActiveFilters } from './ActiveFilters'
import { TransactionList } from './TransactionList'
import './Transaction.css'





export function TransactionContainer({
  title,
  type,
  items,
  setItems,
  total,
  categories,
  setCategories,
  selectedCategories,
}) {
  const [isFormVisible, setIsFormVisible] = useState(false)

  useEffect(() => {
    localStorage.setItem(`${type}Categories`, JSON.stringify(categories))
  }, [categories])


  return (
    <div className="transaction-container" data-type={type}>
      <div className="transaction-header">
        <h2>{title}: ${total}</h2>
        <button onClick={() => { setIsFormVisible(!isFormVisible) }}>Add new {type} ▼</button>
      </div>

      <AddTransactionForm
        type={type}
        items={items}
        setItems={setItems}
        categories={categories}
        setCategories={setCategories}
        isFormVisible={isFormVisible} />

      <ActiveFilters selectedCategories={selectedCategories} />

      <TransactionList
        items={items}
        type={type}
        categories={categories}
        setCategories={setCategories}
        setItems={setItems} />
    </div>
  )
}