import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ===== DUMMY DATA ===== */


/* ===== Month + Year Tick ===== */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-");
  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={10} textAnchor="middle" fontSize={11} fill="currentColor">
        {month}
      </text>
      <text
        dy={24}
        textAnchor="middle"
        fontSize={10}
        fill="currentColor"
        opacity={0.7}
      >
        {year}
      </text>
    </g>
  );
};

export default function InventoryValueOverTimeChart({ data = [] }) {
  return (
    <div className="h-64 w-full text-gray-900 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 12 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

          {/* X Axis – Month + Year */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            interval={0}
            height={40}
            tick={<MonthYearTick />}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "currentColor" }}
            width={40}
          />

          <Tooltip
            formatter={(value, name) =>
              name === "value"
                ? [`₹ ${value}`, "Inventory Value"]
                : [`${value}%`, "MoM Change"]
            }
          />

          {/* Bar – Inventory Value */}
          <Bar
            dataKey="value"
            fill="yellowgreen"
            barSize={23}
            radius={[4, 4, 0, 0]}
          />

          {/* Line – Change */}
          <Line
            type="monotone"
            dataKey="change"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
