import React, { useState, useEffect } from "react";
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
  { name: "Cherry Finished Crystal", value: 2.37 },
  { name: "Cherry Finished Frame", value: 2.3 },
  { name: "Walnut Medallian Plate", value: 2.25 },
  { name: "Cherry Finish Frame", value: 2.09 },
  { name: "Black Duffel Bag", value: 1.96 },
];

export default function TopItemsChart() {
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

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      key={isDark ? "dark" : "light"}
    >
      <BarChart
        data={data}
        layout="vertical" // horizontal bars like TopCustomersChart
        margin={{ top: 8, right: 24, left: 16, bottom: 8 }}
      >
        {/* GRID */}
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke={gridColor}
          opacity={0.4}
        />

        {/* X AXIS */}
        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: axisColor }}
        />

        {/* Y AXIS */}
        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: axisColor }}
          width={140}
        />

        {/* TOOLTIP */}
        <Tooltip
          cursor={{ fill: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)" }}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "none",
            color: axisColor,
            fontSize: 12,
          }}
          formatter={(value) => [`${value}`, "Sales"]}
        />

        {/* BAR */}
        <Bar
          dataKey="value"
          fill="#3b82f6" // changed bar color only
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
