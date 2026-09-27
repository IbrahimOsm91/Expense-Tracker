import { useEffect } from "react"
import "./Pagination.css"


export function Pagination({filteredItems, setPageIndicator, pageIndicator}) {
  
  function pageIndicatorPlus1() {
    const lastPage = Math.ceil(filteredItems.length / 10)
    setPageIndicator(prev => Math.min((lastPage || 1), prev + 1))
  }

  function pageIndicatorMinus1() {
    setPageIndicator(prev => Math.max(1, prev - 1))
  }

  useEffect(() => setPageIndicator(1), [filteredItems])


  return (
    <div className='transaction-list-pagination'>
      <button onClick={pageIndicatorMinus1}><span>Previous</span></button>
      <span>{pageIndicator}</span>
      <button onClick={pageIndicatorPlus1}><span>Next</span></button>
    </div>
  )
}

