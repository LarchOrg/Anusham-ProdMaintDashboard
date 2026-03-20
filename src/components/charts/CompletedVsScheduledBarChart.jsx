import React, { useEffect, useState } from "react";
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
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const formattedData = data.map((item) => ({
    pmFreq: item.pmFreq,
    scheduled: Number(item.scheduled),
    completed: Number(item.completed),
  }));

  const axisColor = isDark ? "#ffffff" : "#000000";
  const gridColor = isDark ? "#374151" : "#e0e0e0";
  const tooltipBg = isDark ? "#111827" : "#ffffff";
  const tooltipBorder = isDark ? "#374151" : "#e5e7eb";

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        key={isDark ? "dark" : "light"}   /* IMPORTANT */
        data={formattedData}
        margin={{ top: 10, right: 15, left: 15, bottom: 10 }}
        barGap={15}
      >
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} opacity={0.3} />

        <XAxis
          dataKey="pmFreq"
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}  
          tickLine={false}
        />

        <YAxis
          tick={{ fontSize: 12, fill: axisColor }}
          axisLine={{ stroke: axisColor }}
          tickLine={false}
        />

        <Tooltip
          contentStyle={{
            fontSize: 12,
            backgroundColor: tooltipBg,
            border: `1px solid ${tooltipBorder}`,
            borderRadius: 4,
            color: axisColor,
          }}
        />

        <Legend
          wrapperStyle={{ fontSize: 12, color: axisColor }}
          iconType="circle"
        />

        <Bar dataKey="scheduled" fill="#2563eb" barSize={20} radius={[4,4,0,0]} />
        <Bar dataKey="completed" fill="#10b981" barSize={20} radius={[4,4,0,0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
