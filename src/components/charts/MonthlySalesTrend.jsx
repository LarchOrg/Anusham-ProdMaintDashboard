import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

/* ===== DATA ===== */
const data = [
  { month: "Jan-25", sales: 3.2 },
  { month: "Feb-25", sales: 3.6 },
  { month: "Mar-25", sales: 3.9 },
  { month: "Apr-25", sales: 4.5 },
  { month: "May-25", sales: 4.8 },
  { month: "Jun-25", sales: 5.2 },
  { month: "Jul-25", sales: 4.1 },
  { month: "Aug-25", sales: 3.8 },
  { month: "Sep-25", sales: 4.0 },
  { month: "Oct-25", sales: 4.6 },
  { month: "Nov-25", sales: 4.9 },
  { month: "Dec-25", sales: 5.0 },
];

/* ===== CUSTOM X AXIS (Month ↑ Year ↓) ===== */
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

export default function MonthlySalesTrend() {
  const isDark = document.documentElement.classList.contains("dark");
  const axisColor = isDark ? "#ffffff" : "#000000";
  const gridColor = isDark ? "#444444" : "#cccccc";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 30 }} // ⬅️ extra bottom space
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
          interval={0}        // SHOW ALL MONTHS
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

        {/* BAR */}
        <Bar
          dataKey="sales"
          fill="#dc2626"       // red (consistent with breakdown theme)
          barSize={18}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
