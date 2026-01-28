import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

export default function CompletedVsScheduledBarChart({ data = [] }) {
  // Convert strings to numbers
  const formattedData = data.map((item) => ({
    pmFreq: item.pmFreq,
    scheduled: Number(item.scheduled),
    completed: Number(item.completed),
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={formattedData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
        barGap={15}
      >
        {/* Grid lines */}
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" opacity={0.3} />

        {/* X-axis */}
        <XAxis
          dataKey="pmFreq"
          tick={{ fontSize: 12, fill: "#555" }}
          axisLine={{ stroke: "#ccc" }}
          tickLine={false}
        />

        {/* Y-axis */}
        <YAxis
          tick={{ fontSize: 12, fill: "#555" }}
          axisLine={{ stroke: "#ccc" }}
          tickLine={false}
        />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{ fontSize: 12, backgroundColor: "#fff", borderRadius: 4 }}
        />

        {/* Legend */}
        <Legend
          wrapperStyle={{ fontSize: 12 }}
          iconType="circle"
        />

        {/* Bars */}
        <Bar
          dataKey="scheduled"
          fill="#8884d8"
          name="Scheduled"
          barSize={20}
          radius={[4, 4, 0, 0]} // rounded top corners
        />
        <Bar
          dataKey="completed"
          fill="#82ca9d"
          name="Completed"
          barSize={20}
          radius={[4, 4, 0, 0]} // rounded top corners
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
