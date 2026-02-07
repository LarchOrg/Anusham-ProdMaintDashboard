import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

export default function ReworkRateChart({ data = [] }) {
  return (
    <div className="h-full w-full text-gray-900 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.4} />

          <XAxis
            type="number"
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={{ stroke: "currentColor" }}
            tickLine={{ stroke: "currentColor" }}
          />

          <YAxis
            type="category"
            dataKey="month"
            interval={0}
            tick={{ fontSize: 12, fill: "currentColor" }}
            axisLine={{ stroke: "currentColor" }}
            tickLine={{ stroke: "currentColor" }}
            width={90}
          />

          <Tooltip formatter={(v) => `${v}%`} />

          <Bar
            dataKey="value"
            fill="#6366f1"
            barSize={18}
            radius={[0, 6, 6, 0]}
          >
            <LabelList
              dataKey="value"
              position="right"
              style={{ fontSize: 12, fill: "currentColor" }}
              formatter={(v) => `${v}%`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
