import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

const COLORS = [  "#ef4444", // Red
  "#f59e0b", // Orange
"#ec4899", // Yellow
  "#10b981", // Green
  "#3b82f6", // Blue
  "#8b5cf6", 
];

const renderLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  value,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.55;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="#fff"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="600"
    >
      {value}%
    </text>
  );
};

export default function DowntimeContributionChart({ data = [] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          outerRadius={82}     // ⬅ bigger pie
          innerRadius={0}
          paddingAngle={3}
          label={renderLabel} // ✅ custom label
          labelLine={false}   // ❌ remove lines
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip formatter={(value) => `${value}%`} />

        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          iconSize={15}
          wrapperStyle={{
            fontSize: 11,
            lineHeight: "14px",
            maxWidth: "100%",
            paddingTop: 6,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
