import React from "react";

const data = [
  {
    tool: "MEXI",
    type: 450,
    wear: "55%",
    cycles: 46000,
    condition: 1657,
    date: "108",
  },
  {
    tool: "MEXI",
    type: 425,
    wear: "80%",
    cycles: 23000,
    condition: 1147,
    date: "128",
  },
  {
    tool: "MEXL",
    type: 260,
    wear: "96%",
    cycles: 23000,
    condition: 2457,
    date: "289",
  },
];

export default function RecentToolReplacements() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {[
              "Tool ID",
              "Type",
              "Wear %",
              "Cycles Used",
              "Condition",
              "Date",
            ].map((h) => (
              <th
                key={h}
                className="px-3 py-2 text-left text-xs font-bold text-gray-600 dark:text-gray-300"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              className="border-b border-gray-100 dark:border-gray-700"
            >
              <td className="px-3 py-2">{row.tool}</td>
              <td className="px-3 py-2">{row.type}</td>
              <td className="px-3 py-2">{row.wear}</td>
              <td className="px-3 py-2">{row.cycles}</td>
              <td className="px-3 py-2">{row.condition}</td>
              <td className="px-3 py-2">{row.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
