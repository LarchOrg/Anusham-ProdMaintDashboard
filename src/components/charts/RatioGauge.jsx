import React from "react";

export default function RatioGauge({
  title,
  value,
  max = 100,
  unit = "",
  color = "#3b82f6", // default blue
}) {
  const safeValue = Math.min(Math.max(value, 0), max);

  const angle = (safeValue / max) * 180;
  const arcLength = 157;
  const dash = (angle / 180) * arcLength;

  return (
    <div className="flex items-center justify-center">
      <svg width="180" height="100" viewBox="0 0 140 90">
        {/* Background arc */}
        <path
          d="M20 65 A50 50 0 0 1 120 65"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="10"
          className="dark:stroke-gray-700"
        />

        {/* Value arc */}
        <path
          d="M20 65 A50 50 0 0 1 120 65"
          fill="none"
          stroke={color}
          strokeWidth="12"
          strokeDasharray={`${dash} ${arcLength}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />

        {/* Value */}
        <text
          x="70"
          y="55"
          textAnchor="middle"
          className="text-[22px] font-extrabold fill-gray-900 dark:fill-white"
        >
          {safeValue}
          {unit}
        </text>

        {/* Title */}
        <text
          x="70"
          y="85"
          textAnchor="middle"
          className="text-[14px] font-bold fill-gray-600 dark:fill-gray-300"
        >
          {title}
        </text>
      </svg>
    </div>
  );
}
