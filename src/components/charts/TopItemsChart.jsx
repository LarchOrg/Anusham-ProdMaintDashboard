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

export default function TopItemsChart({ data = [] }) {
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

  const axisColor = isDark ? "#E5E7EB" : "#111827";
  const gridColor = isDark ? "#374151" : "#E5E7EB";

  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
        No item data available
      </div>
    );
  }

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      key={isDark ? "dark" : "light"}
    >
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 0, bottom: 8 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={false}
          stroke={gridColor}
          opacity={0.4}
        />

        <XAxis
          type="number"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: axisColor }}
        />

        <YAxis
          type="category"
          dataKey="name"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11, fill: axisColor }}
          width={180}
        />

        <Tooltip
          cursor={{
            fill: isDark
              ? "rgba(255,255,255,0.04)"
              : "rgba(0,0,0,0.04)",
          }}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            border: "none",
            color: axisColor,
            fontSize: 12,
          }}
          formatter={(value) => [`${value}`, "Sales"]}
        />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          barSize={14}
          radius={[0, 6, 6, 0]}
        >
          <LabelList
            dataKey="value"
            position="right"
            formatter={(v) =>
              v % 1 === 0 ? v : parseFloat(v.toFixed(2))
            }
            style={{ fill: axisColor, fontSize: 11 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
