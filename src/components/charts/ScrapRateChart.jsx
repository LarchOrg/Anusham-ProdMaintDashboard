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

/* ✅ Month + Year tick (theme-aware) */
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
        className="fill-gray-700 dark:fill-gray-300"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={26}
        textAnchor="middle"
        fontSize={10}
        className="fill-gray-600 dark:fill-gray-400"
      >
        {year}
      </text>
    </g>
  );
};

export default function ScrapRateChart({ data = [] }) {
  const axisTickColor = "currentColor"; // light/dark via parent
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
      <LineChart
        data={data}
        margin={{ top: 6, right: 10, left: 10, bottom: 10 }}
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
          tick={{ fontSize: 12, fill: axisTickColor }}
          width={30}
          axisLine={false}
          tickLine={false}
          className="text-gray-700 dark:text-gray-300"
        />

        <Tooltip
          formatter={(v) => [`${v}%`, "Scrap Rate"]}
          labelStyle={{ fontWeight: 600 }}
        />

        {/* 🔵 Line unchanged */}
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
