import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CompletedVsScheduledBarChart({ data = [] }) {
  // Detect dark mode (same pattern as your other charts)
  const isDark = document.documentElement.classList.contains("dark");

  // Convert strings to numbers
  const formattedData = data.map((item) => ({
    pmFreq: item.pmFreq,
    scheduled: Number(item.scheduled),
    completed: Number(item.completed),
  }));

  // Theme colors (match your dashboard style)
const axisColor = isDark ? "#9ca3af" : "#000000";
      // gray-400
  const gridColor = isDark ? "#374151" : "#e0e0e0";  // gray-700
  const tooltipBg = isDark ? "#111827" : "#ffffff"; // gray-900
  const tooltipBorder = isDark ? "#374151" : "#e5e7eb";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={formattedData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
        barGap={15}
      >
        {/* Grid */}
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.3}
        />

        {/* X-axis */}
        <XAxis
          dataKey="pmFreq"
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}
          tickLine={false}
        />

        {/* Y-axis */}
        <YAxis
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}
          tickLine={false}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            fontSize: 12,
            backgroundColor: tooltipBg,
            border: `1px solid ${tooltipBorder}`,
            borderRadius: 4,
            color: axisColor,
          }}
        />

        {/* Legend */}
        <Legend
          wrapperStyle={{
            fontSize: 12,
            color: axisColor,
          }}
          iconType="circle"
        />

        {/* Bars */}
        <Bar
          dataKey="scheduled"
          fill="#8884d8"
          name="Scheduled"
          barSize={20}
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="completed"
          fill="#82ca9d"
          name="Completed"
          barSize={20}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
