import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";

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

  // ✅ Sort descending (Top items first)
  const sortedData = [...data].sort((a, b) => b.value - a.value);

  // ✅ Format numbers (Indian format)
  const formatNumber = (v) =>
    Number(v).toLocaleString("en-IN");

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={sortedData}
        layout="vertical"
        margin={{ top: 10, right: 110, left: 10, bottom: 10 }}
      >
        <XAxis type="number" hide />

        <YAxis
          type="category"
          dataKey="name"
          width={130}
          fontSize={11}
          tick={{ fill: "currentColor" }}
        />

        <Tooltip formatter={(v) => [formatNumber(v), "Quantity"]} />

        <Bar
          dataKey="value"
          fill="#23dece"
          barSize={18}
          radius={[0, 6, 6, 0]}
          activeBar={{ fill: "#0ea5a4" }} // hover effect
        >
          <LabelList
            dataKey="value"
            position="right"
            offset={4}
            fill="currentColor"
            fontSize={12}
            fontWeight={600}
            formatter={formatNumber}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}