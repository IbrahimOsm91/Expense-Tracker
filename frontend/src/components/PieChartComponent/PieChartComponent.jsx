import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { memo, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { calculatePieData } from '../../utils/transactionHelpers'
import './PieChartComponent.css'

const COLORS = [
  '#4F46E5', // Indigo
  '#06B6D4', // Cyan
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#EC4899', // Pink
  '#64748B'  // Slate
]



export const PieChartComponent = memo(function PieChartComponent({
  total, categories, items, type, title
}) {


  const pieData = useMemo(() => (
    calculatePieData({ items, categories })
  ), [items, categories])



  return (
    <div className="pie-chart-container" data-section={type}>
      <span className='pie-chart-header'
        style={{
          color:
            type === 'expense'
              ? '#E11A45'
              : '#2A6B5C'
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