import { useEffect, useState } from 'react'
import { AddTransactionForm } from './AddTransactionForm'
import { ActiveFilters } from './ActiveFilters'
import { TransactionList } from './TransactionList'
import './Transaction.css'





export function TransactionContainer({
  title,
  type,
  items,
  filteredItems,
  setItems,
  total,
  categories,
  setCategories,
  selectedCategories,
  setSelectedCategories
}) {
  const [isFormVisible, setIsFormVisible] = useState(false)
  const [pageIndicator, setPageIndicator] = useState(1)

  useEffect(() => {
    localStorage.setItem(`${type}Categories`, JSON.stringify(categories))
  }, [categories])


  function pageIndicatorPlus1() {
    const lastPage = Math.ceil(filteredItems.length / 10)
    setPageIndicator(prev => Math.min((lastPage || 1) , prev + 1))
  }

  function pageIndicatorMinus1() {
    setPageIndicator(prev => Math.max(1, prev - 1))
  }

  useEffect(() => setPageIndicator(1) , [filteredItems])


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

      <ActiveFilters
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories} />

      <TransactionList
        items={filteredItems}
        type={type}
        categories={categories}
        setCategories={setCategories}
        setItems={setItems}
        selectedCategories={selectedCategories}
        pageIndicator={(pageIndicator * 10)} />

      <div className='transaction-list-pagination'>
        <button onClick={pageIndicatorMinus1}><span>Previous</span></button>
        <span>{pageIndicator}</span>
        <button onClick={pageIndicatorPlus1}><span>Next</span></button>
      </div>
    </div>
  )
}