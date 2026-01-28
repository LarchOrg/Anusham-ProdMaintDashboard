import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function FailureStatusChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 10, left: -10, bottom: 5}}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

        {/* ✅ Month + Year X-axis (same as other charts) */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={50}
          tick={({ x, y, payload }) => {
            const item = data[payload.index] || {};

            return (
              <g transform={`translate(${x},${y + 8})`}>
                {/* Month */}
                <text
                  x={0}
                  y={0}
                  textAnchor="middle"
                  fontSize={12}
                  fill="currentColor"
                >
                  {payload.value}
                </text>

                {/* Year */}
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
          formatter={(value) => [`${value}%`, "Failure %"]}
          labelFormatter={(label, payload) => {
            const item = payload?.[0]?.payload;
            return item ? `${label} ${item.year}` : label;
          }}
        />

        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{ marginBottom: 0 }}
        />

        <Bar
          dataKey="count"
          fill="#f43f5e"
          radius={[6, 6, 0, 0]}
          name="Failure %"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
