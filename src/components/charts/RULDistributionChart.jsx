import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "0–25%", value: 5 },
  { name: "25–50%", value: 12 },
  { name: "50–75%", value: 35 },
  { name: "76–100%", value: 96 },
];

const COLORS = ["#ef4444", "#f59e0b", "#22c55e", "#22d3ee"];

// Custom label outside
const renderLabel = ({ name, value, percent }) => {
  return `${name} (${value})`;
};

export default function RULDistributionChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          outerRadius={90}
          innerRadius={60}
          paddingAngle={3}
          label={renderLabel}
          labelLine={true}   // shows connecting line
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
