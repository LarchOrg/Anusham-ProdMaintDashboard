import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ===== Dummy Data ===== */
// const data = [
//   { month: "Jan-25", value: 45 },
//   { month: "Feb-25", value: 42 },
//   { month: "Mar-25", value: 40 },
//   { month: "Apr-25", value: 36 },
//   { month: "May-25", value: 33 },
//   { month: "Jun-25", value: 35 },
//   { month: "Jul-25", value: 48 },
//   { month: "Aug-25", value: 52 },
//   { month: "Sep-25", value: 47 },
//   { month: "Oct-25", value: 42 },
//   { month: "Nov-25", value: 39 },
//   { month: "Dec-25", value: 38 },
// ];

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

export default function TurnoverDaysChart({ data = [] }) {
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
    <div className="h-64 w-full text-gray-900 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 12 }}
        >
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
            domain={[0, "auto"]}
          />

          <Tooltip formatter={(v) => [`${v} Days`, "Turnover Days"]} />

          <Area
            type="monotone"
            dataKey="value"
            stroke="#8b5cf6"
            fill="#ede9fe"
            strokeWidth={2.5}
            dot={{ r: 3 }}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
