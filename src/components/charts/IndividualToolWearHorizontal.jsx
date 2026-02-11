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

const data = [
  { tool: "Tool #27", wear: 30 },
  { tool: "Tool #41", wear: 40 },
  { tool: "Tool #63", wear: 95 },
  { tool: "Tool #78", wear: 80 },
];

export default function IndividualToolWearHorizontal({ data: propData }) {
  const chartData = propData || data;

  return (
    <div className="h-full w-full text-gray-900 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />

          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={{ stroke: "currentColor" }}
            tickLine={{ stroke: "currentColor" }}
          />

          <YAxis
            type="category"
            dataKey="tool"
            interval={0}
            width={90}
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={{ stroke: "currentColor" }}
            tickLine={{ stroke: "currentColor" }}
          />

          <Tooltip formatter={(v) => `${v}%`} />

          <Bar
            dataKey="wear"
            fill="#6366f1"
            barSize={18}
            radius={[0, 6, 6, 0]}
          >
            <LabelList
              dataKey="wear"
              position="right"
              style={{ fontSize: 12, fill: "currentColor" }}
              formatter={(v) => `${v}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
