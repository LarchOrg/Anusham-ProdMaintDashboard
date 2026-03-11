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
        fontSize={9}
        fill="currentColor"
        opacity={0.7}
      >
        {year}
      </text>
    </g>
  );
};

export default function LTIRChart({ data = [] }) {
  if (!data || data.length === 0) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "#000",
        backgroundColor: "#f0f0f0", // light grey chart background
        borderRadius: "6px",
        fontWeight: 500,
        letterSpacing: "0.3px"
      }}
    >
      No Data Available
    </div>
  );
}
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 8, right: 8, left: 0, bottom: 12 }}
      >
        {/* ✅ fixes dark theme margin visibility */}
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
        />

        <Tooltip
          formatter={(v) => [v, "LTIR"]}
          labelStyle={{ fontWeight: 600 }}
        />

        {/* 🟣 Safety-friendly color (not harsh red) */}
        <Line
          type="monotone"
          dataKey="value"
          stroke="#a855f7"   // purple → safety KPI
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#a855f7" }}
          activeDot={{ r: 4 }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
