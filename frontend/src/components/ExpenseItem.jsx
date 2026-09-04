


export function ExpenseItem({ description, amount, time, category, date }) {

  return (
    <div className="expense-item">
      <span className="expense-description">{description}</span>
      <span className="expense-amount">${amount.toFixed(2)}</span>
      <span className="expense-category">{category}</span>
      <span className="expense-time">{time}</span>
      <span className="expense-date">{date}</span>
    </div>
  )
}     