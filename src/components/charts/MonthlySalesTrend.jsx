import React, { useState, useEffect } from "react";
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
const MonthYearTick = ({ x, y, payload, fill }) => {
  const [month, year] = payload.value.split("-");
  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={14}
        textAnchor="middle"
        fontSize={12}
        fill={fill}
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
        fill={fill}
      >
        {year}
      </text>
    </g>
  );
};

export default function MonthlySalesTrend() {
  /* 🔹 Track dark mode (same logic as your working chart) */
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  /* 🔹 Colors */
  const axisColor = isDark ? "#E5E7EB" : "#111827";
  const gridColor = isDark ? "#374151" : "#E5E7EB";
  const barColor = "#dc2626";

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      key={isDark ? "dark" : "light"}
    >
      <BarChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 36 }}
      >
        {/* GRID */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.4}
        />

        {/* X AXIS (text color only) */}
        <XAxis
          dataKey="month"
          interval={0}
          axisLine={false}
          tickLine={false}
          tick={(props) => (
            <MonthYearTick {...props} fill={axisColor} />
          )}
        />

        {/* Y AXIS (text color only) */}
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: axisColor }}
        />

        {/* TOOLTIP */}
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: axisColor,
            border: "none",
          }}
        />

        {/* BAR */}
        <Bar
          dataKey="sales"
          fill={barColor}
          barSize={18}
          radius={[6, 6, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
