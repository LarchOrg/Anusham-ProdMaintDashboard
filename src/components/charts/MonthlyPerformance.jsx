import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Label,
} from "recharts";

/* ===== DATA ===== */
const data = [
  { month: "Jan-25", sales: 4.2, profit: 1.1 },
  { month: "Feb-25", sales: 4.5, profit: 1.3 },
  { month: "Mar-25", sales: 4.8, profit: 1.4 },
  { month: "Apr-25", sales: 5.0, profit: 1.6 },
  { month: "May-25", sales: 5.4, profit: 1.8 },
  { month: "Jun-25", sales: 5.8, profit: 2.0 },
  { month: "Jul-25", sales: 4.9, profit: 1.5 },
  { month: "Aug-25", sales: 4.7, profit: 1.4 },
  { month: "Sep-25", sales: 4.9, profit: 1.6 },
  { month: "Oct-25", sales: 5.3, profit: 1.9 },
  { month: "Nov-25", sales: 5.6, profit: 2.1 },
  { month: "Dec-25", sales: 5.9, profit: 2.2 },
];

/* ===== CUSTOM X AXIS TICK (Month ↑ Year ↓) ===== */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fontSize={12}
        fill="currentColor"
      >
        {month}
      </text>
      <text
        x={0}
        y={16}
        dy={14}
        textAnchor="middle"
        fontSize={10}
        opacity={0.7}
        fill="currentColor"
      >
        {year}
      </text>
    </g>
  );
};

export default function MonthlyPerformance() {
  const isDark = document.documentElement.classList.contains("dark");
  const axisColor = isDark ? "#ffffff" : "#000000";
  const gridColor = isDark ? "#444444" : "#cccccc";

  const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);
  const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
  const profitPct = ((totalProfit / totalSales) * 100).toFixed(1);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 30, right: 30, left: 0, bottom: 30 }}
      >
        {/* GRID */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.3}
        />

        {/* X AXIS */}
        <XAxis
          dataKey="month"
          tick={<MonthYearTick />}
          interval={0}             // SHOW ALL MONTHS
          axisLine={false}
          tickLine={false}
        />

        {/* Y AXIS */}
        <YAxis
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={false}
          tickLine={false}
        />

        {/* TOOLTIP */}
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "none",
            color: axisColor,
          }}
        />

        {/* SALES BAR */}
        <Bar
          dataKey="sales"
          fill="#f97316"           // ORANGE (matches breakdown theme)
          barSize={18}
          radius={[6, 6, 0, 0]}
        />

        {/* PROFIT LINE */}
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#22c55e"         // GREEN
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />

        {/* PROFIT % LABEL (TOP RIGHT) */}
        <Label
          position="top"
          content={() => (
            <text
              x="95%"
              y="20"
              textAnchor="end"
              fontSize={12}
              fill={axisColor}
              fontWeight="bold"
            >
              Profit % : {profitPct}%
            </text>
          )}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
