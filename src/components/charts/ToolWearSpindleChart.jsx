import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { time: "20:00", wear: 5, load: 6 },
  { time: "21:00", wear: 10, load: 12 },
  { time: "22:00", wear: 18, load: 20 },
  { time: "23:00", wear: 30, load: 38 },
  { time: "00:00", wear: 45, load: 60 },
];

export default function ToolWearSpindleChart() {
  return (
    <div className="h-full w-full text-gray-900 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
        >
          {/* Soft Grid */}
          <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

          {/* X Axis */}
          <XAxis
            dataKey="time"
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={{ stroke: "currentColor" }}
            tickLine={{ stroke: "currentColor" }}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={{ stroke: "currentColor" }}
            tickLine={{ stroke: "currentColor" }}
          />

          {/* Tooltip */}
          <Tooltip
            formatter={(value, name) =>
              name === "wear"
                ? [`${value}%`, "Tool Wear"]
                : [`${value} Nm`, "Spindle Load"]
            }
          />

          {/* Legend */}
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: 12 }}
          />

          {/* Tool Wear Line */}
          <Line
            type="monotone"
            dataKey="wear"
            stroke="#10b981"
            strokeWidth={3}
            dot={false}
            name="Tool Wear"
          />

          {/* Spindle Load Line */}
          <Line
            type="monotone"
            dataKey="load"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            name="Spindle Load"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
