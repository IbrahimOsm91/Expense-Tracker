import { useEffect, useState } from 'react'
import { ItemComponent } from '../ItemComponent/ItemComponent'

export function TransactionList({ items, type, categories, setCategories, setItems, selectedCategories, pageIndicator }) {
  const [filteredTotal, setFilteredTotal] = useState(0)

  useEffect(() => {
    const noCategorySelected = selectedCategories.every(cat => cat.isChecked === false)

    const total = items.reduce((acc, item) => {
      const matchedCategory = selectedCategories.find(cat => cat.id === item.categoryId)
      const shouldInclude = noCategorySelected || matchedCategory?.isChecked
      return shouldInclude ? acc + item.amount : acc
    }, 0)

    setFilteredTotal(total.toFixed(2))
  }, [selectedCategories, items])



  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <span className="transaction-description">Description</span>
        <span className="transaction-amount">Amount</span>
        <span className="transaction-category">Category</span>
        <span className="transaction-time">Time</span>
        <span className="transaction-date">Date</span>
      </div>

      {items.map((item, index) => {
        if (index >= pageIndicator || (pageIndicator - 10) > index ) { return }
        return (
          <ItemComponent key={item.id}
            {...item}
            type={type}
            categories={categories}
            setCategories={setCategories}
            setItems={setItems} />
        )
      })}

      <div className='transaction-list-bottom' >
        <span className="transaction-total-amount">Total Amount: ${filteredTotal}</span>
      </div>
    </div>
  )
}