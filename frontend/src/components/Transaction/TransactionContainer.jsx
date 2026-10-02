import { useState } from 'react'
import { AddTransactionForm } from './AddTransactionForm/AddTransactionForm'
import { ActiveFilters } from './ActiveFilters'
import { TransactionList } from './TransactionList'
import { Pagination } from './Pagination/Pagination'
import { Highlights } from './Highlights/Highlights'
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
  setSelectedCategories,
  filters,
  setFilters,
  date,
  lastMonthNet
}) {
  const [isFormVisible, setIsFormVisible] = useState(true)
  const [pageIndicator, setPageIndicator] = useState(1)

  return (
    <div className="transaction-container" data-type={type}>
      <div className="transaction-header">
        <h2>{title}: ${total}</h2>
        <button onClick={() => { setIsFormVisible(!isFormVisible) }}>Add new {type} ▼</button>
      </div>

      {/*      <AddTransactionForm
        type={type}
        items={items}
        setItems={setItems}
        categories={categories}
        setCategories={setCategories}
        isFormVisible={isFormVisible} /> 
*/}


      <Highlights
        items={items}
        categories={categories}
        type={type}
        date={date}
        lastMonthNet={lastMonthNet} />



      <ActiveFilters
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        categories={categories}
        filters={filters}
        setFilters={setFilters} />

      <TransactionList
        items={filteredItems}
        type={type}
        categories={categories}
        setCategories={setCategories}
        setItems={setItems}
        selectedCategories={selectedCategories}
        pageIndicator={(pageIndicator * 10)} />

      <Pagination
        filteredItems={filteredItems}
        pageIndicator={pageIndicator}
        setPageIndicator={setPageIndicator} />

    </div>
  )
}