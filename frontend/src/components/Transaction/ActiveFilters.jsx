export function ActiveFilters({ selectedCategories }) {
  return (
    <div className='active-filters'>
      {selectedCategories.map(cat => (
        cat.isChecked && (
          <button key={cat.name}
            
          >{cat.name} 🗙</button>
        )
      ))}
    </div>
  )
}