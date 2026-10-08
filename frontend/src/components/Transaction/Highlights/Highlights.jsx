import {
  getHighestCategoryMessage,
  getHighestDayMessage,
  getHighestItemMessage,
  getNoSpendDaysMessage
} from '../../../utils/transactionSummaries'

import shoppingBag from '../../../assets/shopping-bag.png'
import fire from '../../../assets/fire.png'
import calendar from '../../../assets/calendar.png'
import lastMonth from '../../../assets/last-month.png'
import noSpendDays from '../../../assets/no-spend-days.png'
import netBalanceImg from '../../../assets/net-balance.png'
import './Highlights.css'
import { useEffect, useRef } from 'react'
import { filterItemsByMonth } from '../../../utils/transactionFilters'


export function Highlights({
  items,
  categories,
  today,
  lastMonthNet,
  netBalance
}) {

  items = filterItemsByMonth({items, date: today})


  const categoryRef = useRef(null)
  const itemRef = useRef(null)
  const dayRef = useRef(null)
  const netBalanceRef = useRef(null)
  const currentNetBalanceRef = useRef(null)

  const viewportRef = useRef(null)
  const trackRef = useRef(null)


  const highestCategoryMessage = getHighestCategoryMessage({ items, categories })
  const highestItemMessage = getHighestItemMessage({ items })
  const highestDayMessage = getHighestDayMessage({ items })
  const noSpendDaysMessage = getNoSpendDaysMessage({ items, today })

    useEffect(() => {
      const defaultFontSize = 21

      const elements = [
        categoryRef.current,
        itemRef.current,
        dayRef.current,
        netBalanceRef.current,
        currentNetBalanceRef.current
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
    }, [highestCategoryMessage, highestDayMessage, highestItemMessage, netBalance])



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
              <span className="highlight-title">Top expense category</span>
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

          <div className="highlight-card last-month-net">
            <img src={lastMonth} alt="calendar" />
            <div className='highlight-details'>
              <span className="highlight-title">Last month net balance</span>
              <span className="highlight-value" ref={netBalanceRef}>: {" "}
                {lastMonthNet >= 0 ? `$${lastMonthNet}` : `-$${Math.abs(lastMonthNet)}`}
              </span>
            </div>
          </div>

          <div className="highlight-card no-spend-days">
            <img src={noSpendDays} alt="no-spend-days" />
            <div className='highlight-details'>
              <span className="highlight-title">No spend days</span>
              <span className="highlight-value">
                {noSpendDaysMessage}
              </span>
            </div>
          </div>

          <div className="highlight-card net-balance">
            <img src={netBalanceImg} alt="net balance" />
            <div className='highlight-details'>
              <span className="highlight-title">This month net balance</span>
              <span className="highlight-value" ref={currentNetBalanceRef}>
                {netBalance >= 0 ? `$${netBalance}` : `-$${Math.abs(netBalance)}`}
              </span>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => { slide('forward') }}>{'>'}</button>
    </div>
  )
}