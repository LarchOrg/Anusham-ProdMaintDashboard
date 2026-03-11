import { useEffect, useState } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

// const data = [
//   { machine: "M-01", downtime: 220, oee: 82 },
//   { machine: "M-02", downtime: 180, oee: 88 },
//   { machine: "M-03", downtime: 150, oee: 85 },
//   { machine: "M-04", downtime: 95, oee: 90 },
// ];

export default function DowntimeOEEComposed({ data = [] }) {
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
  const [isDark, setIsDark] = useState(false);

  /* Detect theme (same pattern as your dashboard) */
  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* Axis colors (matches your other charts) */
  const axisColor = isDark ? "#9ca3af" : "#6b7280"; // gray-400 / gray-500
  const gridColor = isDark ? "#374151" : "#e5e7eb"; // gray-700 / gray-200

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.6}
        />

        <XAxis
          dataKey="machine"
          axisLine={{ stroke: axisColor }}
          tickLine={false}
          tick={{ fontSize: 11, fill: axisColor }}
        />

        <YAxis
          yAxisId="left"
          axisLine={{ stroke: axisColor }}
          tickLine={false}
          tick={{ fontSize: 11, fill: axisColor }}
          label={{
            angle: -90,
            position: "insideLeft",
            fontSize: 11,
            fill: axisColor,
          }}
        />

        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          axisLine={{ stroke: axisColor }}
          tickLine={false}
          tick={{ fontSize: 11, fill: axisColor }}
          label={{
            angle: -90,
            position: "insideRight",
            fontSize: 11,
            fill: axisColor,
          }}
        />

        <Tooltip
          contentStyle={{ fontSize: 12 }}
          formatter={(value, name) =>
            name === "oee"
              ? [`${value}%`, "OEE"]
              : [`${value} min`, "Downtime"]
          }
        />

        <Bar
          yAxisId="left"
          dataKey="downTime"
          fill="#f97316"
          barSize={26}
          radius={[4, 4, 0, 0]}
        />

        <Line
          yAxisId="right"
          type="monotone"
          dataKey="oee"
          stroke="#22c55e"
          strokeWidth={2}
          dot={{ r: 3 }}
          activeDot={{ r: 4 }}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
