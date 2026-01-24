import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

/* ✅ Month + Year tick component */
const MonthYearTick = ({ x, y, payload }) => {
  const [month, year] = payload.value.split("-"); // e.g., "Feb-25"

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fontSize={11}
        fill="currentColor"
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={24}
        textAnchor="middle"
        fontSize={9}
        fill="currentColor"
        opacity={0.7}
      >
        {year}
      </text>
    </g>
  );
};

export default function CustomerComplaintsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCustomerComplaints = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://anushamapi.larcherp.com/api/chart/CustomerComplain"
        );
        const apiData = await res.json();

        const chartData = (apiData || []).map((item) => ({
          month: item.monthYear,                       // Keep full month-year for custom tick
          complaints: Number(item.percentage.replace("%", "")), // Convert "4%" → 4
        }));

        setData(chartData);
      } catch (err) {
        console.error("❌ Failed to fetch Customer Complaints:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerComplaints();
  }, []);

  if (loading)
    return <div style={{ width: "100%", height: 200, background: "#f0f0f0" }} />;

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ top: 8, right: 8, left: 0, bottom: 12 }}>
        <CartesianGrid strokeDasharray="3 3" opacity={0.25} />

        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={40}
          tick={<MonthYearTick />}
        />

        <YAxis
          tick={{ fontSize: 10, fill: "currentColor" }}
          width={30}
          axisLine={false}
          tickLine={false}
        />

        <Tooltip
          formatter={(v) => [`${v}%`, "Complaints"]}
          labelStyle={{ fontWeight: 600 }}
          labelFormatter={(label) => label} // full month-year
        />

        <Line
          type="monotone"
          dataKey="complaints"
          stroke="#10b981"           // ✅ Distinct green line
          strokeWidth={2.5}
          dot={{ r: 3, fill: "#047857" }}  // Darker green dot
          activeDot={{ r: 4, fill: "#047857" }}
          isAnimationActive={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
