import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ✅ Month + Year tick (same as OEE & Production) */
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

export default function FPYChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 20, right: 20, left: 0, bottom: 10 }}
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
          domain={[0, 100]}
          tick={{ fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          formatter={(value) => [`${value}%`, "FPY"]}
          labelStyle={{ fontWeight: 600 }}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke="#f97316"
          strokeWidth={3}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
