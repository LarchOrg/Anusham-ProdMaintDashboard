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
  Cell,
} from "recharts";

/* ===== Bar Colors ===== */
const COLORS = ["#3b82f6", "#22c55e", "#f59e0b", "#ef4444"]; 
// blue, green, yellow, red

export default function InventoryMovementChart({ data = [] }) {
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

  /* ✅ Attach color to each data item */
  const formattedData = data.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }));

  return (
    <div className="h-64 w-full text-gray-900 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={formattedData}
          margin={{ top: 20, right: 20, left: 10, bottom: 20 }}
        >
          {/* Grid */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.25} />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ fill: "rgba(20,184,166,0.08)" }}
            contentStyle={{
              // borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: 17,
            }}
            formatter={(value, name, props) => [
              <span style={{ color: props.payload.color }}>
                {Number(value).toLocaleString()}
              </span>,
              name,
            ]}
          />

          {/* Bars */}
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {formattedData.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}

            {/* Labels */}
            <LabelList
              dataKey="value"
              position="top"
              fontSize={12}
              fill="currentColor"
              formatter={(value) => Number(value).toLocaleString()}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}