import React from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function MaintenanceCostChart({ data = [] }) {
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
      <ComposedChart
        data={data}
        margin={{ top: 20, right: 10, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

        {/* X-axis: Month above, Year below */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={50} // enough space for 2 lines
          tick={({ x, y, payload }) => {
            const month = payload.value;

            // Find the original data object for this month
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

        {/* Tooltip showing Month + Year */}
        <Tooltip
          formatter={(value) => `₹ ${Number(value).toLocaleString()}`}
          labelFormatter={(label) => {
            const item = data.find((d) => d.month === label) || {};
            return item.year ? `${item.month} ${item.year}` : label;
          }}
        />

        {/* Bar for Maintenance Cost */}
        <Bar
          dataKey="maintenanceCost"
          fill="#f97316"
          barSize={24}
          radius={[4, 4, 0, 0]}
        />

        {/* Line for Budget Cost */}
        <Line
          type="monotone"
          dataKey="budgetCost"
          stroke="#2563eb"
          strokeWidth={2}
          dot={{ r: 3 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
