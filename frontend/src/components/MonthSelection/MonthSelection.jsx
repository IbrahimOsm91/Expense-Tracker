import dayjs from "dayjs"
import './MonthSelection.css'



export function MonthSelection({today, setToday}) {

  return (
    <div className="month-selection-container">
      <button className="this-month-btn"
        disabled={today.isSame(dayjs(), 'month')}
        onClick={() => setToday(dayjs())}
      >
        This Month
      </button>

      <button
        onClick={() => setToday(pre => pre.subtract(1, "month"))}
      >{`↩`}</button>

      <span>{today.startOf("month").format('YYYY-MM-DD')}</span>
      /
      <span>{today.endOf("month").format('YYYY-MM-DD')}</span>

      <button
        onClick={() => setToday(pre => pre.add(1, "month"))}
      >{`↪`}</button>
    </div>
  )
}