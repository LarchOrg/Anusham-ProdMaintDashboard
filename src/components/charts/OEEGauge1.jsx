import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

export default function OEEGauge({ value = 75 }) {
  const data = [{ name: "OEE", value }];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <RadialBarChart
        innerRadius="70%"
        outerRadius="100%"
        data={data}
        startAngle={180}
        endAngle={0}
      >
        <RadialBar dataKey="value" />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
