import React, { useState, useEffect } from "react";
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

export default function MonthlyPerformance() {
  /* 🔹 Dark mode tracking (same as BreakdownHrsChart) */
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

  const totalProfit = data.reduce((sum, d) => sum + d.profit, 0);
  const totalSales = data.reduce((sum, d) => sum + d.sales, 0);
  const profitPct = ((totalProfit / totalSales) * 100).toFixed(1);

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      key={isDark ? "dark" : "light"}
    >
      <ComposedChart
        data={data}
        margin={{ top: 30, right: 30, left: 0, bottom: 36 }}
      >
        {/* GRID */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.4}
        />

        {/* X AXIS (TEXT COLOR ONLY) */}
        <XAxis
          dataKey="month"
          interval={0}
          axisLine={false}
          tickLine={false}
          tick={(props) => (
            <MonthYearTick {...props} fill={axisColor} />
          )}
        />

        {/* Y AXIS (TEXT COLOR ONLY) */}
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: axisColor }}
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
          fill="#f97316"
          barSize={18}
          radius={[6, 6, 0, 0]}
        />

        {/* PROFIT LINE */}
        <Line
          type="monotone"
          dataKey="profit"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 5 }}
        />

        {/* PROFIT % LABEL */}
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
