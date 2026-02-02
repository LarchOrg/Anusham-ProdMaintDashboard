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

export default function ActualMTTRChart({ data = [] }) {
  // 🔹 Track dark mode dynamically
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    // 🔹 Watch for class changes on <html>
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // 🔹 Colors
  const axisColor = isDark ? "#E5E7EB" : "#111827";
  const gridColor = isDark ? "#374151" : "#E5E7EB";
  const barColor = isDark ? "#60A5FA" : "#1f77b4";

  // 🔹 Keep API order
  const chartData = [...data];

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      key={isDark ? "dark" : "light"} // 🔹 forces remount on theme change
    >
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.4} />

        <XAxis
          type="number"
          domain={[0, "dataMax + 0.2"]}
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}
          tickLine={{ stroke: axisColor }}
        />

        <YAxis
          type="category"
          dataKey="month"
          interval={0}
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}
          tickLine={{ stroke: axisColor }}
          width={90}
        />

        <Tooltip
          formatter={(v) => `${v} hrs`}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: axisColor,
            border: "none",
          }}
        />

        <Bar dataKey="actualMTTR" fill={barColor} barSize={18} radius={[0, 6, 6, 0]}>
          <LabelList
            dataKey="actualMTTR"
            position="right"
            formatter={(v) => v.toFixed(2)}
            style={{ fill: axisColor, fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
