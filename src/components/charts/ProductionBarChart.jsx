import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* Month + Year tick — same style as other charts */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-");

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10} // same as Customer Complaints
        textAnchor="middle"
        fontSize={11}
        fill="currentColor"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={24} // same as Customer Complaints
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

export default function ProductionBarChart({ data = [], type = "production" }) {
  const isProduction = type === "production";

  const color = isProduction ? "#3b82f6" : "#22c55e";
  const tooltipLabel = isProduction ? "Output" : "OTD (%)";
  const yDomain = isProduction ? ["auto", "auto"] : [0, 100];

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 8, right: 8, left: 0, bottom: 12 }} // match Customer Complaints
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            interval={0}
            height={40} // match other charts
            tick={<MonthYearTick />}
          />

          <YAxis
            domain={yDomain}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 10, fill: "currentColor" }} // match other charts
            width={30}
          />

          <Tooltip
            formatter={(v) => [`${v}`, tooltipLabel]}
            labelFormatter={(label) => label} // keep full month-year
            contentStyle={{ fontSize: 12 }}
          />

          <Bar
            dataKey="value"
            fill={color}
            barSize={26}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
