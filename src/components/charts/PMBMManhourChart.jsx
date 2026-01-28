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

export default function PMBMManhourChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 20, right: 10, left: -10, bottom:0 }} // extra space for legend
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

        {/* X-axis: Month above, Year below */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={50}
          tick={({ x, y, payload }) => {
            const month = payload.value;
            const item = data.find((d) => d.month === month) || {};
            const year = item.year || "";

            return (
              <g transform={`translate(${x},${y + 8})`}>
              <text
  x={0}
  y={0}
  textAnchor="middle"
  fontSize={12}
  fill="currentColor"
>
  {month}
</text>

<text
  x={0}
  y={0}
  dy={16}
  textAnchor="middle"
  fontSize={10}
  fill="#6b7280"
  className="dark:fill-gray-400"
>
  {year}
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

        {/* Tooltip */}
        <Tooltip
          formatter={(value) => `${value} hrs`}
          labelFormatter={(label) => {
            const item = data.find((d) => d.month === label) || {};
            return item.year ? `${item.month} ${item.year}` : label;
          }}
        />

        {/* Smaller Legend below chart */}
        <Legend
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{ fontSize: 15, marginBottom: 10 }} // smaller text
          iconSize={10} // smaller circle
        />

        {/* Stacked Bars */}
        <Bar
          dataKey="pmHours"
          stackId="a"
          fill="#10b981" // green
          radius={[6, 6, 0, 0]}
          name="PM Hours"
        />
        <Bar
          dataKey="bmHours"
          stackId="a"
          fill="#f59e0b" // amber
          radius={[6, 6, 0, 0]}
          name="BM Hours"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
