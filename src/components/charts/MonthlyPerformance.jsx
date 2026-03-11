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

/* ===== CUSTOM X AXIS ===== */
const MonthYearTick = ({ x, y, payload, fill }) => {
  const [month, year] = payload.value.split("-");
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={14} textAnchor="middle" fontSize={12} fill={fill}>
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

export default function MonthlyPerformance({ data = [] }) {
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
  /* 🔹 Dark mode tracking */
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

  /* 🔹 Overall Profit % from API */
  const profitPct = data.length
    ? data[0].overallProfit.toFixed(1)
    : "0.0";

  if (!data.length) {
    return (
      <div className="h-full flex items-center justify-center text-sm opacity-60">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 30, right: 30, left: 0, bottom: 25 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.4} />

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
            border: "none",
            color: axisColor,
          }}
        />

        {/* SALES */}
        <Bar
          dataKey="sales"
          fill="#f97316"
          barSize={18}
          radius={[6, 6, 0, 0]}
        />

        {/* PROFIT */}
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
