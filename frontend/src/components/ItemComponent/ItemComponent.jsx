import { useState } from "react"
import { getOrCreateCategoryId } from "../../utils/addTransaction"
import dayjs from "dayjs"

export function ItemComponent({
  description, amount, time, categoryId, date, categories, type, setItems, id, setCategories
}) {
  const category = categories.find(
    cat => cat.id === categoryId
  )

  const [isEditing, setIsEditing] = useState(false)
  const [editedTransaction, setEditedTransaction] = useState({
    description: description, amount: amount, category: category?.name || '', time: time, date: date, id: id
  })


  function editTransaction(event) {
    const { name, value } = event.target
    setEditedTransaction({
      ...editedTransaction,
      [name]: value
    })
  }

  function cancelEdit() {
    setEditedTransaction({
      description,
      amount,
      category: category?.name || '',
      time,
      date
    })
    setIsEditing(false)
  }

  function saveEdit() {
    // getOrCreateCategoryId expects a "newTransaction" key, so we map editedTransaction to it
    if (editedTransaction.amount < 0 || editedTransaction.amount === '') {
      alert('Please enter a valid amount!')
      return
    }
    const selectedCategory = getOrCreateCategoryId({ newTransaction: editedTransaction, categories, setCategories })

    setItems((previousItems) => (
      previousItems.map(item => (
        item.id === id
          ? {
            description: editedTransaction.description || 'Undefined',
            amount: Number(editedTransaction.amount) || 0,
            categoryId: selectedCategory,
            time: editedTransaction.time === ''
              ? dayjs().format('HH:mm')
              : editedTransaction.time,
            date: editedTransaction.date === ''
              ? dayjs().format('YYYY-MM-DD')
              : editedTransaction.date,
            id: id
          }
          : { ...item }
      ))
    ))

    setIsEditing(false)
  }


  return (
    <div className="transaction-item">
      {
        isEditing
          ? <input type="text" className="transaction-description"
            name="description"
            value={editedTransaction.description}
            onChange={editTransaction} />
          : <span className="transaction-description">{description}</span>
      }

      {
        isEditing
          ? <input type="number" className="transaction-amount"
            name="amount"
            value={editedTransaction.amount}
            onChange={editTransaction} />
          : <span className="transaction-amount">${amount.toFixed(2)}</span>
      }

      {
        isEditing
          ? <input type="text" className="transaction-category"
            name="category"
            list={`${type}-categories`}
            value={editedTransaction.category}
            onChange={editTransaction} />
          : <span className="transaction-category">{category?.name || 'undefined'}</span>
      }

      {isEditing && <datalist id={`${type}-categories`}>
        {categories.map(categoryOption => (
          <option key={categoryOption.id} value={categoryOption.name} />
        ))}
      </datalist>}

      {
        isEditing
          ? <input type="time" className="transaction-time"
            name="time"
            value={editedTransaction.time}
            onChange={editTransaction} />
          : <span className="transaction-time">{time}</span>
      }

      {
        isEditing
          ? <input type="date" className="transaction-date"
            name="date"
            value={editedTransaction.date}
            onChange={editTransaction} />
          : <span className="transaction-date">{date}</span>
      }

      {
        isEditing
          ? <div className="transaction-edit-actions">
            <button className="transaction-edit-btn transaction-cancel-btn" onClick={cancelEdit} aria-label="Cancel edit">
              ×
            </button>
            <button className="transaction-edit-btn transaction-save-btn" onClick={saveEdit} aria-label="Save edit">
              ✓
            </button>
          </div>
          : <button className="transaction-edit-btn" onClick={() => setIsEditing(true)}>
            edit
          </button>
      }
    </div>
  )
}