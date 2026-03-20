import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

/* ✅ Month + Year tick component */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-"); // e.g., "Feb-25"

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fontSize={11}
        fill="currentColor"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
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

export default function CustomerComplaintsChart({ data = [] }) {
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
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 12 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={40}
          tick={<MonthYearTick />}
        />
       <YAxis
  tick={{ fontSize: 10, fill: "currentColor" }}
  width={30}
  axisLine={false}
  tickLine={false}
  domain={[0, "dataMax"]}
  allowDecimals={false}
/>
        <Tooltip formatter={(v) => [`${v}`, "Complaints"]} labelStyle={{ fontWeight: 600 }} />
        <Line
          type="monotone"
          dataKey="value"
          stroke="#10b981"
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#047857" }}
          activeDot={{ r: 4, fill: "#047857" }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}


