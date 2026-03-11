import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#2563eb", "#dc2626", "#f59e0b"];

// ✅ Custom label INSIDE slice (percentage)
const renderInsideLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
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
      {(percent * 100).toFixed(0)}%
    </text>
  );
};

export default function CompletedVsScheduledChart({data = [],totalPlans = 0,}) {
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
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="45%"
          innerRadius={45}   // 👈 donut space for center text
          outerRadius={94}
          label={renderInsideLabel}
          labelLine={false}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        {/* ✅ CENTER TEXT */}
        <text
          x="50%"
          y="40%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={12}
          fill="#9ca3af"
          fontWeight="500"
        >
          Total Plans
        </text>

        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={22}
          fontWeight="700"
          fill="#111827"
          className="dark:fill-white"
        >
          {totalPlans}
        </text>

        <Tooltip formatter={(value, name) => [`${value}`, name]} />

        <Legend
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          iconType="circle"
          wrapperStyle={{
            fontSize: "12px",
            paddingTop: 6,
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
