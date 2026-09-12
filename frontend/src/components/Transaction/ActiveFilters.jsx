export function ActiveFilters({ selectedCategories, setSelectedCategories }) {


  function removeCategoryFilter(categoryId) {
    setSelectedCategories(prev => (
      prev.map(cat => (
        cat.id === categoryId
          ? { id: cat.id, isChecked: false, name: cat.name }
          : { id: cat.id, isChecked: cat.isChecked, name: cat.name }
      ))
    ))
  }

  return (
    <div className='active-filters'>
      {selectedCategories.map(cat => (
        cat.isChecked && (
          <button key={cat.id}
            onClick={() => removeCategoryFilter(cat.id)}
          >{cat.name} 🗙</button>
        )
      ))}
    </div>
  )
}