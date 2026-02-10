import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

const valueData = [
  { name: "Cherry Finished Crystal", value: 140 },
  { name: "Winter Frost Vase", value: 130 },
  { name: "Silver Plated Frame", value: 120 },
  { name: "Normandy Vase", value: 120 },
  { name: "Wisper-Cut Vase", value: 120 },
  { name: "Channel Speaker", value: 90 },
  { name: "Walnut Plate", value: 80 },
  { name: "Cherry Frame", value: 80 },
  { name: "Bamboo Picture", value: 80 },
];

export default function TopItemsValueChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={valueData}
        layout="vertical"
        margin={{ top: 10, right: 50, left: 10, bottom: 10 }}
      >
        <XAxis type="number" hide />

        <YAxis
          type="category"
          dataKey="name"
          width={160}
          fontSize={11}
          tick={{ fill: "currentColor" }}
        />

        <Tooltip formatter={(v) => [`₹ ${v}`, "Value"]} />

        <Bar
          dataKey="value"
         fill="#f59e0b"   // Amber (great contrast, highlights importance)

          barSize={18}
          radius={[0, 6, 6, 0]}
        >
          {/* 👇 VALUE LABEL */}
          <LabelList
            dataKey="value"
            position="right"
            offset={8}
            fill="currentColor"
            fontSize={12}
            fontWeight={600}
            formatter={(v) => `₹ ${v}`}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
