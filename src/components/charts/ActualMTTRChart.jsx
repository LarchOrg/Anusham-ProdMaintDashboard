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

const dummyData = [
  { month: "Jan-25", actualMTTR: 0.60 },
  { month: "Feb-25", actualMTTR: 0.63 },
  { month: "Mar-25", actualMTTR: 0.67 },
  { month: "Apr-25", actualMTTR: 0.60 },
  { month: "May-25", actualMTTR: 0.44 },
  { month: "Jun-25", actualMTTR: 0.57 },
  { month: "Jul-25", actualMTTR: 0.17 },
  { month: "Aug-25", actualMTTR: 0.67 },
  { month: "Sep-25", actualMTTR: 0.38 },
  { month: "Oct-25", actualMTTR: 0.40 },
  { month: "Nov-25", actualMTTR: 0.33 },
  { month: "Dec-25", actualMTTR: 1.00 },
];

export default function ActualMTTRChart() {
  // 🔥 Detect dark mode
  const isDark = document.documentElement.classList.contains("dark");

  // ✅ Explicit axis colors
  const axisColor = isDark ? "#ffffff" : "#000000";
  const gridColor = isDark ? "#444444" : "#cccccc";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dummyData}
        layout="vertical"
        margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
      >
        {/* Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.4}
        />

        {/* X Axis – Hours */}
        <XAxis
          type="number"
          domain={[0, "dataMax + 0.2"]}
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}
          tickLine={{ stroke: axisColor }}
        />

        {/* Y Axis – Month */}
        <YAxis
          type="category"
          dataKey="month"
          interval={0}                 // show all months
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}
          tickLine={{ stroke: axisColor }}
          width={90}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: axisColor,
            border: "none",
          }}
        />

        {/* Bar */}
        <Bar
          dataKey="actualMTTR"
          fill="#1f77b4"
          barSize={18}
          radius={[0, 6, 6, 0]}
        >
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
