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

export default function BreakdownHrsChart({ data = [] }) {
    if (!data || data.length === 0) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "#000",
        backgroundColor: "#f0f0f0", // light grey chart background
        borderRadius: "6px",
        fontWeight: 500,
        letterSpacing: "0.3px"
      }}
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
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // 🔹 Colors
  const axisColor = isDark ? "#E5E7EB" : "#111827";
  const gridColor = isDark ? "#374151" : "#E5E7EB";
  const barColor = "#dc2626"; // Red, stays the same

  // 🔹 Keep API order
  const chartData = [...data];

  return (
    <ResponsiveContainer
      width="100%"
      height="100%"
      key={isDark ? "dark" : "light"} // forces remount on theme change
    >
      <BarChart
        data={chartData}
        layout="vertical"
        margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.4} />

        <XAxis
          type="number"
          domain={[0, "dataMax + 1"]}
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

        <Bar dataKey="breakdownHrs" fill={barColor} barSize={18} radius={[0, 6, 6, 0]}>
          <LabelList
            dataKey="breakdownHrs"
            position="right"
            style={{ fill: axisColor, fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
