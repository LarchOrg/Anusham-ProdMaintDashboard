import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function PowerCostChart({ data = [] }) {
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
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 10, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

        {/* X Axis */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={45}
          tick={({ x, y, payload }) => {
            const item = data[payload.index] || {};
            return (
              <g transform={`translate(${x},${y + 8})`}>
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  fontSize={12}
                  fill="currentColor"
                >
                  {item.month}
                </text>
               <text
  x={0}
  y={14}
  textAnchor="middle"
  fontSize={10}
  fill="#6b7280"
  className="dark:fill-gray-400"
>
  {item.year}
</text>

              </g>
            );
          }}
        />

<YAxis
  tick={{ fill: "currentColor", fontSize: 12 }}
  axisLine={false}
  tickLine={false}
/>


        <Tooltip
          formatter={(value) => `₹ ${Number(value).toLocaleString()}`}
          labelFormatter={(_, payload) => {
            const item = payload?.[0]?.payload;
            return item ? `${item.month} ${item.year}` : "";
          }}
        />

        <Legend verticalAlign="bottom" height={20} />

        {/* Power Cost Bar */}
        <Bar
          dataKey="powerCost"
          name="Power Cost"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}   // top rounded only (correct)
          barSize={28}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
