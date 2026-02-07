import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* Month + Year tick */
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

export default function DefectRateChart({ data = [] }) {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
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
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "currentColor" }}
            width={30}
          />

          <Tooltip formatter={(v) => [`${v}%`, "Defect Rate"]} />

          <Bar
            dataKey="value"
            fill="#ef4444"
            barSize={26}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
