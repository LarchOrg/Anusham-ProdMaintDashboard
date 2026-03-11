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

/* Month + Year tick — matches Customer Complaints style */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-"); // e.g., "Feb-25"

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fontSize={11} // match Customer Complaints
        fill="currentColor"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={24} // match Customer Complaints
        textAnchor="middle"
        fontSize={10} // match Customer Complaints
        fill="currentColor"
        opacity={0.7}
      >
        {year}
      </text>
    </g>
  );
};

export default function FPYChart({ data = [] }) {
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
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 12 }} // same as Customer Complaints
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            interval={0}
            height={40} // same as Customer Complaints
            tick={<MonthYearTick />}
          />

          <YAxis
            domain={[0, 100]}
            tick={{ fontSize: 10, fill: "currentColor" }} // match Customer Complaints
            width={30}
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
            strokeWidth={2.5} // match Customer Complaints
            dot={{ r: 3 }}
            activeDot={{ r: 4 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
