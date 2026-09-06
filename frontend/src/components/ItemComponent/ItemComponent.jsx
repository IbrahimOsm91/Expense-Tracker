


export function ItemComponent({
  type, description, amount, time, categoryId, date, categories
}) {
  const category = categories.find(
    cat => cat.id === categoryId
  )

  return (
    <div className={`${type}-item`}>
      <span className={`${type}-description`}>{description}</span>
      <span className={`${type}-amount`}>${amount.toFixed(2)}</span>
      <span className={`${type}-category`}>{category?.name || 'undefined'}</span>
      <span className={`${type}-time`}>{time}</span>
      <span className={`${type}-date`}>{date}</span>
    </div>
  )
}