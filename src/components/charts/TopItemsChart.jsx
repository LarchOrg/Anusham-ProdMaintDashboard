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

const data = [
  { name: "Cherry Finished Crystal", value: 2.37 },
  { name: "Cherry Finished Frame", value: 2.3 },
  { name: "Walnut Medallian Plate", value: 2.25 },
  { name: "Cherry Finish Frame", value: 2.09 },
  { name: "Black Duffel Bag", value: 1.96 },
];

export default function TopItemsChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 8, right: 24, left: 0, bottom: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" horizontal={false} />

        <XAxis
          type="number"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />

        <YAxis
          type="category"
          dataKey="name"
          tick={{ fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          width={140}
        />

        <Tooltip
          cursor={{ fill: "rgba(0,0,0,0.04)" }}
          formatter={(value) => [`${value}`, "Sales"]}
        />

        <Bar
          dataKey="value"
          fill="#22c55e"
          radius={[0, 6, 6, 0]}
          barSize={14}
        >
          <LabelList
            dataKey="value"
            position="right"
            style={{ fontSize: 11, fill: "#374151" }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
