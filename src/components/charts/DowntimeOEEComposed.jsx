import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const data = [
  { machine: "M-01", downtime: 220, oee: 82 },
  { machine: "M-02", downtime: 180, oee: 88 },
  { machine: "M-03", downtime: 150, oee: 85 },
  { machine: "M-04", downtime: 95, oee: 90 },
];

export default function DowntimeOEEComposed() {
  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

        <XAxis
          dataKey="machine"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11 }}
        />

        <YAxis
          yAxisId="left"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11 }}
          label={{
            value: "Downtime (min)",
            angle: -90,
            position: "insideLeft",
            fontSize: 11,
          }}
        />

        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 11 }}
          label={{
            value: "OEE (%)",
            angle: -90,
            position: "insideRight",
            fontSize: 11,
          }}
        />

        <Tooltip
          contentStyle={{ fontSize: 12 }}
          formatter={(value, name) =>
            name === "oee"
              ? [`${value}%`, "OEE"]
              : [`${value} min`, "Downtime"]
          }
        />

        <Bar
          yAxisId="left"
          dataKey="downtime"
          fill="#f97316"
          barSize={26}
          radius={[4, 4, 0, 0]}
        />

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="oee"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
