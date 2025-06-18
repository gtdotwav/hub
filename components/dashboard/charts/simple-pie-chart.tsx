"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"
import type { TooltipProps } from "recharts"
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent"

interface ChartDataItem {
  name: string
  value: number
  fill: string
}

interface SimplePieChartProps {
  data: ChartDataItem[]
}

const CustomTooltip = ({ active, payload }: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background/80 backdrop-blur-sm p-2 border border-border rounded-md shadow-lg">
        <p className="label text-sm text-foreground">{`${payload[0].name} : ${new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(payload[0].value as number)}`}</p>
      </div>
    )
  }
  return null
}

export default function SimplePieChart({ data }: SimplePieChartProps) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={60}
          innerRadius={30} // Donut chart
          fill="#8884d8"
          dataKey="value"
          stroke="hsl(var(--background))" // Add border to segments
          strokeWidth={2}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
      </PieChart>
    </ResponsiveContainer>
  )
}
