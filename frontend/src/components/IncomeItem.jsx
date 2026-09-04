export function IncomeItem({ description, amount, time, category, date }) {
  return (
    <div className="income-item">
      <span className="income-description">{description}</span>
      <span className="income-amount">${amount.toFixed(2)}</span>
      <span className="income-category">{category}</span>
      <span className="income-time">{time}</span>
      <span className="income-date">{date}</span>
    </div>
  )
}
