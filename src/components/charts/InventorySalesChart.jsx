import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

/* ===== Month + Year Tick ===== */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-");

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={12} textAnchor="middle" fontSize={12} fill="currentColor">
        {month}
      </text>
      <text
        dy={26}
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

export default function InventorySalesChart({ data = [] }) {
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
    <div className="h-64 w-full text-gray-900 dark:text-white">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* X Axis */}
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            interval={0}
            height={45}
            tick={<MonthYearTick />}
          />

          {/* Y Axes */}
          <YAxis
            yAxisId="left"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "currentColor" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "currentColor" }}
          />

          {/* Legend */}
          <Legend
            verticalAlign="top"
            height={22}
            iconType="circle"
            wrapperStyle={{ fontSize: "11px", color: "currentColor" }}
          />

          {/* Tooltip */}
          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "12px",
            }}
          />

          {/* Bars */}
          <Bar
            yAxisId="left"
            dataKey="inventory"
            fill="#22c55e"
            radius={[5, 5, 0, 0]}
            barSize={38}
          />
          <Bar
            yAxisId="left"
            dataKey="sales"
            fill="#facc15"
            radius={[8, 8, 0, 0]}
            barSize={38}
          />

          {/* Line */}
          <Line
            yAxisId="right"
            dataKey="ratio"
            stroke="#1d4ed8"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}