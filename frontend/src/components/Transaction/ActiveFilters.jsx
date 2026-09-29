import { categoryFinder } from "../../utils/transactionHelpers"

export function ActiveFilters({ selectedCategories, setSelectedCategories, categories }) {


  function removeCategoryFilter(categoryId) {
    setSelectedCategories(prev => (
      prev.filter(catId => catId !== categoryId)
    ))
  }

  return (
    <div className='active-filters'>
      {selectedCategories.map(catId => (
        <button key={catId}
          onClick={() => removeCategoryFilter(catId)}
        >{categoryFinder(categories, catId)?.name} 🗙
        </button>
      ))}
    </div>
  )
}