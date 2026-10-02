import { getHighestCategoryMessage, getHighestDayMessage, getHighestItemMessage } from '../../../utils/transactionHelpers'
import shoppingBag from '../../../assets/shopping-bag.png'
import fire from '../../../assets/fire.png'
import calendar from '../../../assets/calendar.png'
import './Highlights.css'
import { useEffect, useRef } from 'react'


export function Highlights({ items, categories, type, date, lastMonthNet }) {


  function getThisMonthItems() {
    return items.filter(item => (
      item.date >= date.startOf('month').format('YYYY-MM-DD')
      &&
      item.date <= date.endOf('month').format('YYYY-MM-DD')
    ))
  }

  items = getThisMonthItems()


  const categoryRef = useRef(null)
  const itemRef = useRef(null)
  const dayRef = useRef(null)

  const viewportRef = useRef(null)
  const trackRef = useRef(null)


  const highestCategoryMessage = getHighestCategoryMessage({ items, categories })
  const highestItemMessage = getHighestItemMessage({ items })
  const highestDayMessage = getHighestDayMessage({ items })

  useEffect(() => {
    const defaultFontSize = 21

    const elements = [
      categoryRef.current,
      itemRef.current,
      dayRef.current
    ]

    elements.forEach(element => {
      element.style.fontSize = `${defaultFontSize}px`

      while (element.scrollWidth > element.clientWidth) {
        const currentSize = parseFloat(
          getComputedStyle(element).fontSize
        )

        element.style.fontSize = `${currentSize - 1}px`
      }
    })
  }, [highestCategoryMessage, highestDayMessage, highestItemMessage])



  function slide(direction) {
    const viewportWidth = viewportRef.current.offsetWidth

    direction === 'forward'
      ? trackRef.current.style.transform = `translateX(-${viewportWidth}px)`
      : trackRef.current.style.transform = `translateX(0px)`
  }



  return (
    <div className="highlights-container">
      <button onClick={() => { slide('backWard') }}>{'<'}</button>

      <div className='highlights-viewport' ref={viewportRef}>
        <div className='highlights-track' ref={trackRef}>

          <div className="highlight-card highest-category">
            <img src={shoppingBag} alt="shopping-bag" />
            <div className='highlight-details'>
              <span className="highlight-title">Top {type} category</span>
              <span className="highlight-value" ref={categoryRef}>
                {highestCategoryMessage}
              </span>
            </div>
          </div>

          <div className="highlight-card highest-item">
            <img src={fire} alt="fire" />
            <div className='highlight-details'>
              <span className="highlight-title">Highest spending item</span>
              <span className="highlight-value" ref={itemRef}>
                {highestItemMessage}
              </span>
            </div>
          </div>

          <div className="highlight-card highest-day">
            <img src={calendar} alt="calendar" />
            <div className='highlight-details'>
              <span className="highlight-title">Highest spending day</span>
              <span className="highlight-value" ref={dayRef}>
                {highestDayMessage}
              </span>
            </div>
          </div>

          <div className="highlight-card highest-day">
            <img src={calendar} alt="calendar" />
            <div className='highlight-details'>
              <span className="highlight-title">Last month's net</span>
              <span className="highlight-value">Balance: 
                 {lastMonthNet >= 0 ? `$${lastMonthNet}` : `-$${Math.abs(lastMonthNet)}`}
              </span>
            </div>
          </div>

          <div className="highlight-card highest-day">
            <img src={calendar} alt="calendar" />
            <div className='highlight-details'>
              <span className="highlight-title">Highest</span>
              <span className="highlight-value">
                aaaa
              </span>
            </div>
          </div>

          <div className="highlight-card highest-day">
            <img src={calendar} alt="calendar" />
            <div className='highlight-details'>
              <span className="highlight-title">Highest</span>
              <span className="highlight-value">
                aaaa
              </span>
            </div>
          </div>

          <div className="highlight-card highest-day">
            <img src={calendar} alt="calendar" />
            <div className='highlight-details'>
              <span className="highlight-title">Highest</span>
              <span className="highlight-value">
                aaaa
              </span>
            </div>
          </div>

        </div>
      </div>

      <button onClick={() => { slide('forward') }}>{'>'}</button>
    </div>
  )
}