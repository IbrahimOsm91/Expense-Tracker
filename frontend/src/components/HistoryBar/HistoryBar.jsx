import {Link} from 'react-router-dom'
import './HistoryBar.css'


export function HistoryBar(
  { categories, selectedCategories, setSelectedCategories, filters, setFilters }
) {



  function handleFilterChange(event) {
    const { name, value } = event.target
    setFilters(prev => (
      { ...prev, [name]: value }
    ))
  }


  function handleCategoryChange(id, isChecked) {
    setSelectedCategories(prev => (
      prev.map(cat =>
        cat.id === id
          ? { ...cat, isChecked: isChecked }
          : { ...cat }
      )
    ))
  }



  return (
    <div className="history-bar">

      <div className="filter-section">
        <h2>
          <span>Search</span>
          <span>Transactions</span>
        </h2>

        <input type="text" placeholder="Search by description..."
          name='description'
          value={filters.description}
          onChange={handleFilterChange} />

        <h3>Amount range</h3>
        <div className="amount-range">
          <input type="number" placeholder="Min"
            name='minAmount'
            value={filters.minAmount}
            onChange={handleFilterChange} />
          <input type="number" placeholder="Max"
            name='maxAmount'
            value={filters.maxAmount}
            onChange={handleFilterChange} />
        </div>

        <h3>Date range</h3>
        <div className="date-range">
          <input type="date" name='startDate' onChange={handleFilterChange} value={filters.startDate} />
          <input type="date" name='endDate' onChange={handleFilterChange} value={filters.endDate} />
        </div>

        <div className="category-selector">
          <h3>Categories</h3>
          <div className='category-checkboxes'>
            {categories.map(category => (
              <div key={category.name}>
                <input type='checkbox'
                  checked={selectedCategories.find(cat => cat.id === category.id)?.isChecked || false}
                  onChange={(event) => handleCategoryChange(category.id, event.target.checked)} />
                {category.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className='navigation-section'>
        <h2>Navigation</h2>

        <Link to='/'>Home Page</Link>
        <Link to='/history/income'>Income History</Link>
        <Link to='/history/expense'>Expense History</Link>
      </div>
    </div>
  )
}