import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

/* ✅ Month + Year tick */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-"); // "Feb-25"

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fontSize={12}
        fill="#374151"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={26}
        textAnchor="middle"
        fontSize={10}
        fill="#9ca3af"
      >
        {year}
      </text>
    </g>
  );
};

export default function ScrapRateChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 6, right: 8, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

        {/* ✅ Month + Year X-axis */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={40}
          tick={<MonthYearTick />}
        />

        <YAxis
          tick={{ fontSize: 12 }}
          width={30}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          formatter={(v) => [`${v}%`, "Scrap Rate"]}
          labelStyle={{ fontWeight: 600 }}
        />

        {/* 🔵 Changed color (blue-teal, not red/orange) */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#0ea5e9"     // sky-blue
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#0ea5e9" }}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
