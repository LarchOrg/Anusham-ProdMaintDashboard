import React from "react";
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

const dummyData = [
  { month: "Jan-25", actualMTBF: 1367.1 },
  { month: "Feb-25", actualMTBF: 1543.5 },
  { month: "Mar-25", actualMTBF: 4557 },
  { month: "Apr-25", actualMTBF: 2646 },
  { month: "May-25", actualMTBF: 1519 },
  { month: "Jun-25", actualMTBF: 1890 },
  { month: "Jul-25", actualMTBF: 2278.5 },
  { month: "Aug-25", actualMTBF: 4557 },
  { month: "Sep-25", actualMTBF: 1653.75 },
  { month: "Oct-25", actualMTBF: 2734.2 },
  { month: "Nov-25", actualMTBF: 4410 },
  { month: "Dec-25", actualMTBF: 6835.5 },
];

export default function ActualMTBFChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={dummyData}
        layout="vertical"
        margin={{ top: 10, right: 40, left: 0, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" opacity={0.3} />

        <XAxis
          type="number"
          domain={[0, "dataMax + 500"]}
          tick={{ fontSize: 12 }}
        />

        <YAxis
          type="category"
          dataKey="month"
          tick={{ fontSize: 12 }}
          width={70}
        />

        <Tooltip />

        <Bar
          dataKey="actualMTBF"
          fill="#7CB342"
          barSize={18}
          radius={[0, 6, 6, 0]}
        >
          <LabelList
            dataKey="actualMTBF"
            position="right"
            formatter={(v) => Math.round(v)}
            style={{ fill: "#000", fontSize: 12 }}
          />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
