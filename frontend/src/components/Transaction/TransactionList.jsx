import { ItemComponent } from '../ItemComponent/ItemComponent'
import { getTotal } from '../../utils/transactionCalculations'

export function TransactionList({ items, type, categories, setCategories, setItems, pageIndicator }) {

const filteredTotal = getTotal(items).toFixed(2)


  return (
    <div className="transaction-list">
      <div className="transaction-list-header">
        <span className='transaction-rank'>#Rank</span>
        <span className="transaction-description">Description</span>
        <span className="transaction-amount">Amount</span>
        <span className="transaction-category">Category</span>
        <span className="transaction-time">Time</span>
        <span className="transaction-date">Date</span>
      </div>

      {items.slice(pageIndicator - 10, pageIndicator).map(item => {
        const rank = items.findIndex(transaction => transaction.id === item.id) + 1
        return (
          <ItemComponent key={item.id}
            {...item}
            type={type}
            categories={categories}
            setCategories={setCategories}
            setItems={setItems}
            rank={rank} />
        )
      })}

      <div className='transaction-list-bottom' >
        <span className="list-total">List Total: ${filteredTotal}</span>
        <span className='info-note'>"Informations are for this month only except the list"</span>
      </div>
    </div>
  )
}