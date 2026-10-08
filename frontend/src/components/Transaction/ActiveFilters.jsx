import { categoryFinder } from "../../utils/transactionCalculations"

const filterLabels = {
  description: 'Description',
  minAmount: 'Min Amount',
  maxAmount: 'Max Amount',
  startDate: 'Start Date',
  endDate: 'End Date'
}

export function ActiveFilters({ selectedCategories, setSelectedCategories, categories, filters, setFilters }) {


  function removeCategoryFilter(categoryId) {
    setSelectedCategories(prev => (
      prev.filter(catId => catId !== categoryId)
    ))
  }


  function removeFilter(key) {
    setFilters(prev => ({
      ...prev,
      [key]: ''
    }))
  }

  return (
    <div className='active-filters'>
      {
        selectedCategories.map(catId => (
          <button key={catId}
            onClick={() => removeCategoryFilter(catId)}
          >{categoryFinder(categories, catId)?.name} 🗙
          </button>
        ))
      }

      {
        Object.entries(filters)
          .map(([key, value]) => {
            return value !== '' &&
              <button key={key}
               onClick={() => removeFilter(key)}>
                {`${filterLabels[key]}: ${value}`} 🗙
              </button>
          })
      }
    </div>
  )
}