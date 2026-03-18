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

/* Month + Year Tick with dynamic color */
const MonthYearTick = ({ x, y, payload, isDark }) => {
  const [month, year] = payload.value.split("-");
  const textColor = isDark ? "#e5e7eb" : "#374151"; // light / dark text

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={10}
        textAnchor="middle"
        fontSize={11}
        fill={textColor}
      >
        {month}
      </text>
      <text
        x={0}
        y={0}
        dy={24}
        textAnchor="middle"
        fontSize={10}
        fill={textColor}
        opacity={0.7}
      >
        {year}
      </text>
    </g>
  );
};

export default function DowntimeOEEComposed({ data = [] }) {
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

  const [isDark, setIsDark] = useState(false);

  /* Detect theme */
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

  /* Colors */
  const axisColor = isDark ? "#9ca3af" : "#6b7280";
  const gridColor = isDark ? "#374151" : "#e5e7eb";
  const textColor = isDark ? "#e5e7eb" : "#374151";

  return (
    <ResponsiveContainer width="100%" height={220}>
      <ComposedChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          opacity={0.6}
        />

        <XAxis
          dataKey="month"
          axisLine={{ stroke: axisColor }}
          tickLine={false}
          tick={(props) => <MonthYearTick {...props} isDark={isDark} />}
        />

        <YAxis
          yAxisId="left"
          axisLine={{ stroke: axisColor }}
          tickLine={false}
          tick={{ fontSize: 11, fill: textColor }}
        />

        <YAxis
          yAxisId="right"
          orientation="right"
          domain={[0, 100]}
          axisLine={{ stroke: axisColor }}
          tickLine={false}
          tick={{ fontSize: 11, fill: textColor }}
        />

        <Tooltip
          contentStyle={{
            fontSize: 12,
            backgroundColor: isDark ? "#1f2937" : "#ffffff",
            color: textColor,
            border: "none",
          }}
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