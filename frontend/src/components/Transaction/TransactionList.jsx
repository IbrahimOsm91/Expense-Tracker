import { ItemComponent } from '../ItemComponent/ItemComponent'

export function TransactionList({ items, type, categories, setCategories, setItems }) {
  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <span className="transaction-description">Description</span>
        <span className="transaction-amount">Amount</span>
        <span className="transaction-category">Category</span>
        <span className="transaction-time">Time</span>
        <span className="transaction-date">Date</span>
      </div>

      {items.map(item => {
        return (
          <ItemComponent key={item.id}
            {...item}
            type={type}
            categories={categories}
            setCategories={setCategories}
            setItems={setItems} />
        )
      })}
    </div>
  )
}