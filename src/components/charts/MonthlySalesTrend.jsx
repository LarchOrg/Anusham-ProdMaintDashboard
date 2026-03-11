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

/* ===== CUSTOM X AXIS (Month ↑ Year ↓) ===== */
const MonthYearTick = ({ x, y, payload, fill }) => {
  if (!payload?.value) return null;

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

export default function MonthlySalesTrend({ data = [] }) {
  /* 🔹 Track dark mode */
  if (!data || data.length === 0) {
  return (
    <div
      className="w-full h-full flex items-center justify-center text-[14px] font-medium tracking-wide rounded-md
      bg-[#f0f0f0] text-black
      dark:bg-gray-800 dark:text-gray-200"
    >
      No Data Available
    </div>
  );
}
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
        margin={{ top: 20, right: 20, left: 0, bottom: 25 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.4}
        />

        <XAxis
          dataKey="month"
          interval={0}
          axisLine={false}
          tickLine={false}
          tick={(props) => (
            <MonthYearTick {...props} fill={axisColor} />
          )}
        />

        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 12, fill: axisColor }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: axisColor,
            border: "none",
          }}
        />

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
