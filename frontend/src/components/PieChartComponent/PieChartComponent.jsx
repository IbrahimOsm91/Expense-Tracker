import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { memo, useMemo } from 'react'
import './PieChartComponent.css'
import { Link } from 'react-router-dom'

const COLORS = ['#6C5CE7', '#00B894', '#FD79A8', '#636E72', '#0984E3', '#FDCB6E', '#E17055', '#00CEC9']

export const PieChartComponent = memo(function PieChartComponent({
  total, categories, items, type, title
}) {


  const pieData = useMemo(() => {
    const categoryTotals = {}

    function categoryFinder(catId) {
      return categories.find(cat => cat.id === catId)
    }

    categories.forEach((cat) => {
      categoryTotals[cat.name] = 0
    })

    items.forEach(item => {
      const matchedCategory = categoryFinder(item.categoryId)
      if (!matchedCategory) { return console.log('Category could not find!') }

      categoryTotals[matchedCategory.name] += item.amount
    })

    const chartData = Object.entries(categoryTotals).map(([name, value]) => {
      if (value > 0) { return { name, value } }
    }).filter(i => i !== undefined)

    chartData.sort((a, b) => b.value - a.value)


    if (chartData.length > 6) {
      const totalValue = chartData.reduce((sum, item) => sum + item.value, 0)
      const majorItems = chartData.filter((item) => (item.value / totalValue) >= 0.05)
      const minorItems = chartData.filter(item => (item.value / totalValue) < 0.05)
      const minorTotal = minorItems.reduce((sum, item) => sum + item.value, 0)

      return minorTotal > 0
        ? [...majorItems, { name: 'Rest', value: minorTotal }]
        : majorItems

    } else if (chartData.length <= 6) {
      return chartData
    }
  }, [items, categories])





  return (
    <div className="pie-chart-container" data-section={type}>
      <span className='pie-chart-header'
        style={{
          color:
            type === 'expense'
              ? '#e64980'
              : '#38d9a9'
        }}>
        {title}s: ${total}</span>
      <div className='pie-chart-body'>
        <ResponsiveContainer width="70%" height="100%">
          <PieChart>
            <Pie
              data={pieData.length === 0 ? [{ name: 'Empty', value: 1 }] : pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              paddingAngle={0}
              labelLine={false}
              label={({ percent }) => `${(percent * 100).toFixed(0)}%`}>
              {pieData.map((entry, index) => (
                <Cell key={entry.name} fill={COLORS[index % COLORS.length]} stroke='none' />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>

        <div className='transaction-brief'>
          {pieData.map((item, index) => (
            <span
              key={item.name}
              style={{ color: COLORS[index % COLORS.length] }}
            >{item.name}: ${item.value}</span>
          ))}
        </div>
      </div>
      <div className='pie-chart-bottom' data-section={type === 'expense' ? 'expense' : 'income'}>
        <Link to={`/history/${type}`}>{title} History</Link>
      </div>
    </div >
  )
})