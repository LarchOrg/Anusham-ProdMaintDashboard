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

export default function ActualMTBFChart({ data = [] }) {
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
  const axisColor = isDark ? "#E5E7EB" : "#111827"; // ticks
  const gridColor = isDark ? "#374151" : "#E5E7EB"; // grid
  const barColor = isDark ? "#84CC16" : "#7CB342";  // bar fill

  // 🔹 Keep same order as API
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
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.3} />

        <XAxis
          type="number"
          domain={[0, "dataMax + 500"]}
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
          formatter={(v) => `${Math.round(v)} hrs`}
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: axisColor,
            border: "none",
          }}
        />

        <Bar dataKey="actualMTBF" fill={barColor} barSize={18} radius={[0, 6, 6, 0]}>
          <LabelList
            dataKey="actualMTBF"
            position="right"
            formatter={(v) => Math.round(v)}
            style={{ fill: axisColor, fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
