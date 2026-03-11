import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
} from "recharts";



export default function TopItemsValueChart({ data = [] }) {
    if (!data || data.length === 0) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "14px",
        color: "#000",
        backgroundColor: "#f0f0f0", // light grey chart background
        borderRadius: "6px",
        fontWeight: 500,
        letterSpacing: "0.3px"
      }}
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
