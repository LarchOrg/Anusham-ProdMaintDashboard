import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

// const quantityData = [
//   { name: "Crystal", value: 25 },
//   { name: "Summer Frost Vase", value: 28 },
//   { name: "Plated Frame", value: 15 },
//   { name: "Normandy Vase", value: 33 },
//   { name: "Wisper-Cut Vase", value: 35 },
//   { name: "Channel Speaker", value: 28 },
//   { name: "Walnut Plate", value: 20 },
//   { name: "Berry Frame", value: 18 },
//   { name: "Banana Picture", value: 27 },
// ];

export default function TopItemsQuantityChart({ data = [] }) {
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
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 10, right: 40, left: 10, bottom: 10 }}
      >
        <XAxis type="number" hide />
        <YAxis
          type="category"
          dataKey="name"
          width={160}
          fontSize={11}
          tick={{ fill: "currentColor" }}
        />

        <Tooltip formatter={(v) => [`${v}`, "Quantity"]} />

        <Bar
          dataKey="value"
          fill="#23dece"
          barSize={18}
          radius={[0, 6, 6, 0]}
        >
          {/* 👇 VALUE LABEL */}
          <LabelList
            dataKey="value"
            position="right"
            fill="currentColor"
            fontSize={12}
            fontWeight={600}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
