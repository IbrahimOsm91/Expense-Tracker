import { useState, useEffect } from "react"
import dayjs from "dayjs"
import './QuickAdd.css'


export function QuickAdd({quickAddType, setQuickAddType, categories, setCategories, items, setItems}) {
  const [showDateTimeRow, setShowDateTimeRow] = useState(false)
  const [newTransaction, setNewTransaction] = useState({ description: '', amount: '', category: '', time: '', date: '' })


  function handleChange(e) {
    const { name, value } = e.target
    setNewTransaction({
      ...newTransaction,
      [name]: value
    })
  }


  function addTransaction() {
    if (newTransaction.amount === '') {
      alert('Please fill the informations!')
      return
    }

    const newCategory = {
      id: crypto.randomUUID(),
      name: newTransaction.category
    }

    // If there is no same category in database, create a new category.
    if (!categories.some(
      cat => cat.name.toLowerCase() === newCategory.name.toLocaleLowerCase()
    )) {
      setCategories([
        ...categories,
        newCategory
      ])
    }

    const existingCategory = categories.find(
      cat => cat.name.toLowerCase() === newCategory.name.toLocaleLowerCase()
    )


    setItems([
      {
        description: newTransaction.description || 'Undefined',
        amount: Number(newTransaction.amount) || 0,
        categoryId: existingCategory?.id || newCategory.id || 'undefined',
        time: newTransaction.time === ''
          ? dayjs().format('HH:mm')
          : newTransaction.time,
        date: newTransaction.date === ''
          ? dayjs().format('YYYY-MM-DD')
          : newTransaction.date,
        id: crypto.randomUUID()
      },
      ...items
    ])
  }

  useEffect(() => {
    localStorage.setItem(`${quickAddType}Categories`, JSON.stringify(categories))
  }, [categories])

  useEffect(() => {
    localStorage.setItem(quickAddType, JSON.stringify(items))
    setNewTransaction({ description: '', amount: '', category: '', time: '', date: '' })
  }, [items])





  return (
    <div className="quick-add" data-section={quickAddType}>
      <div className="quick-add-row">
        <div className="type-toggle">
          <button
            className={`type-btn ${quickAddType === 'expense' ? 'active' : ''}`}
            onClick={() => setQuickAddType('expense')}>Expense</button>
          <button
            className={`type-btn ${quickAddType === 'income' ? 'active' : ''}`}
            onClick={() => setQuickAddType('income')}>Income</button>
        </div>

        <input type="text"
          placeholder="Description"
          name="description"
          value={newTransaction.description || ''}
          onChange={handleChange} />

        <input type="number"
          placeholder="Amount"
          name="amount"
          value={newTransaction.amount || ''}
          onChange={handleChange} />

        <input type="text" list="category-options"
          placeholder="Category"
          name="category"
          value={newTransaction.category || ''}
          onChange={handleChange} />

        <datalist id="category-options">
          {categories.map(cat => (
            <option key={cat.id} value={cat.name} />
          ))}
        </datalist>

        <button type="button" className="add-datetime-btn"
          onClick={() => setShowDateTimeRow(!showDateTimeRow)}
        >+</button>
        <button type="button" className="confirm-btn" onClick={addTransaction}>Confirm</button>
      </div>

      <div className={`quick-add-row datetime-row ${showDateTimeRow ? '' : 'hidden'}`}>

        <input type="time"
          name="time"
          value={newTransaction.time || ''}
          onChange={handleChange} />

        <input type="date"
          name="date"
          value={newTransaction.date || ''}
          onChange={handleChange} />

      </div>
    </div>
  )
}
