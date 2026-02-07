import React from "react";

export default function QualityKPICards({ data }) {
  if (!data) {
    return (
      <div className="grid grid-cols-2 gap-2 h-full">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-muted rounded-lg animate-pulse" />
        ))}
      </div>
    );
  }

  const cards = [
    { label: "First Pass Yield (Mar)", value: `${data.fpyMar}%` },
    { label: "First Pass Yield (YTD)", value: `${data.fpyYtd}%` },
    { label: "Product Audit Compliance", value: `${data.productAudit}%` },
    { label: "Process Audit Compliance", value: `${data.processAudit}%` },
  ];

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      {cards.map((item, i) => (
        <div
          key={i}
          className="bg-yellow-300 rounded-lg flex flex-col
                     items-center justify-center font-bold"
        >
          <div className="text-sm text-center">{item.label}</div>
          <div className="text-3xl">{item.value}</div>
        </div>
      ))}
    </div>
  );
}
