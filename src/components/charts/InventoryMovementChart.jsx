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

/* ===== DUMMY DATA ===== */
// const data = [
//   { name: "Purchase", value: 12 },
//   { name: "Sale", value: -10 },
//   { name: "Total", value: 2 },
// ];

export default function InventoryMovementChart({ data = [] }) {
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
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
        >
          {/* Grid – same look as other charts */}
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          {/* X Axis */}
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Y Axis */}
          <YAxis
            tick={{ fontSize: 12, fill: "#64748b" }}
            axisLine={false}
            tickLine={false}
          />

          {/* Tooltip */}
          <Tooltip
            cursor={{ fill: "rgba(20,184,166,0.08)" }}
            contentStyle={{
              borderRadius: 8,
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />

          {/* Bars */}
          <Bar
            dataKey="value"
            radius={[8, 8, 0, 0]}
            fill="#14b8a6"
          >
            {/* Value on top of bar */}
            <LabelList
              dataKey="value"
              position="top"
              fontSize={12}
              fill="#0f172a"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
