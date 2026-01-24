import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

/* ✅ Custom tick for Month / Year */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-"); // e.g. "Feb-25"

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fontSize={11}
        fill="#374151"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={24}
        textAnchor="middle"
        fontSize={10}
        fill="#9ca3af"
      >
        {year}
      </text>
    </g>
  );
};

export default function ProductionBarChart({
  data = [],
  type = "production",
}) {
  const isProduction = type === "production";

  const color = isProduction ? "#3b82f6" : "#22c55e";
  const tooltipLabel = isProduction ? "Output" : "OTD (%)";
  const yDomain = isProduction ? ["auto", "auto"] : [0, 100];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

        {/* ✅ Month on top, Year below */}
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={40}
          tick={<MonthYearTick />}
        />

        <YAxis
          domain={yDomain}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11 }}
        />

        <Tooltip
          contentStyle={{ fontSize: 12 }}
          formatter={(v) => [`${v}`, tooltipLabel]}
          labelFormatter={(label) => `Month: ${label}`}
        />

        <Bar
          dataKey="value"
          fill={color}
          barSize={26}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
