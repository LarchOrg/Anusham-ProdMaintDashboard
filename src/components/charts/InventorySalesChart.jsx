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

/* ===== DUMMY DATA ===== */
const data = [
  { month: "Jan-25", inventory: 20, sales: 4, ratio: 5 },
  { month: "Feb-25", inventory: 19.5, sales: 4.2, ratio: 4.6 },
  { month: "Mar-25", inventory: 20.1, sales: 4.5, ratio: 4.4 },
  { month: "Apr-25", inventory: 19.8, sales: 4.8, ratio: 4.1 },
  { month: "May-25", inventory: 20.4, sales: 5.2, ratio: 3.9 },
  { month: "Jun-25", inventory: 20.2, sales: 5.5, ratio: 3.7 },

];

/* ===== Month + Year Tick ===== */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-");

  return (
    <g transform={`translate(${x},${y})`}>
      <text dy={12} textAnchor="middle" fontSize={12} fill="#64748b">
        {month}
      </text>
      <text dy={26} textAnchor="middle" fontSize={10} fill="#94a3b8">
        {year}
      </text>
    </g>
  );
};

export default function InventorySalesChart() {
  return (
    <div className="h-64 w-full">
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
            tick={{ fontSize: 11, fill: "#64748b" }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 11, fill: "#64748b" }}
          />

          {/* Smaller Legend */}
          <Legend
            verticalAlign="top"
            height={22}
            iconType="circle"
            wrapperStyle={{ fontSize: "11px" }}
          />

          <Tooltip
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              fontSize: "12px",
            }}
          />

          {/* Thicker Bars */}
          <Bar
            yAxisId="left"
            dataKey="inventory"
            fill="#22c55e"
            radius={[5, 5, 0, 0]}
            barSize={38}     // 👈 increased
          />
          <Bar
            yAxisId="left"
            dataKey="sales"
            fill="#facc15"
            radius={[8, 8, 0, 0]}
            barSize={38}     // 👈 increased
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
