import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

/* ===== DATA ===== */
const data = [
  { name: "Meersen Meubelen", value: 1.8 },
  { name: "Voltive Systems", value: 1.65 },
  { name: "Top Action Sports", value: 1.5 },
  { name: "Dicon Industries", value: 1.21 },
  { name: "Dantons", value: 1.2 },
];

export default function TopCustomersChart() {
  // 🌙 Dark mode detection
  const isDark = document.documentElement.classList.contains("dark");

  const axisColor = isDark ? "#e5e7eb" : "#374151";
  const gridColor = isDark ? "#374151" : "#e5e7eb";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 16, bottom: 8 }}
      >
        {/* GRID – same as TopItems */}
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke={gridColor}
          opacity={0.4}
        />

        {/* X AXIS */}
        <XAxis
          type="number"
          domain={[0, "dataMax + 0.3"]}
          tick={{ fontSize: 11, fill: axisColor }}
          axisLine={false}
          tickLine={false}
        />

        {/* Y AXIS */}
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11, fill: axisColor }}
          axisLine={false}
          tickLine={false}
          width={140}
        />

        {/* TOOLTIP – consistent */}
        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "none",
            fontSize: 18,
          }}
          formatter={(value) => [`${value}`, "Sales"]}
        />

        {/* BAR */}
        <Bar
          dataKey="value"
          fill="#22c55e"
          barSize={14}
          radius={[0, 6, 6, 0]}
        >
          <LabelList
            dataKey="value"
            position="right"
            formatter={(v) => v.toFixed(2)}
            style={{ fill: axisColor, fontSize: 11 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
