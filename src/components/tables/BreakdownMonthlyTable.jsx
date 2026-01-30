import React from "react";

const ROWS_PER_PAGE = 5;

/* ===== DUMMY DATA ===== */
const data = [
  {
    month: "Jan-25",
    bd: 10,
    hrs: 6,
    nom: 21,
    whpd: 21,
    tah: 13671,
    targetMttr: 1,
    mttr: 0.60,
    targetMtbf: 4320,
    mtbf: 1367.1,
    targetBdPct: "0.15%",
    bdPct: "0.044%",
  },
  {
    month: "Feb-25",
    bd: 8,
    hrs: 5,
    nom: 21,
    whpd: 21,
    tah: 12348,
    targetMttr: 1,
    mttr: 0.63,
    targetMtbf: 4320,
    mtbf: 1543.5,
    targetBdPct: "0.15%",
    bdPct: "0.040%",
  },
  {
    month: "Mar-25",
    bd: 3,
    hrs: 2,
    nom: 21,
    whpd: 21,
    tah: 13671,
    targetMttr: 1,
    mttr: 0.67,
    targetMtbf: 4320,
    mtbf: 4557,
    targetBdPct: "0.15%",
    bdPct: "0.015%",
  },
  {
    month: "Apr-25",
    bd: 5,
    hrs: 3,
    nom: 21,
    whpd: 21,
    tah: 13230,
    targetMttr: 1,
    mttr: 0.60,
    targetMtbf: 4320,
    mtbf: 2646,
    targetBdPct: "0.15%",
    bdPct: "0.023%",
  },
  {
    month: "May-25",
    bd: 7,
    hrs: 4,
    nom: 21,
    whpd: 21,
    tah: 13671,
    targetMttr: 1,
    mttr: 0.44,
    targetMtbf: 4320,
    mtbf: 1519,
    targetBdPct: "0.15%",
    bdPct: "0.029%",
  },
  {
    month: "Jun-25",
    bd: 7,
    hrs: 4,
    nom: 21,
    whpd: 21,
    tah: 13230,
    targetMttr: 1,
    mttr: 0.57,
    targetMtbf: 4320,
    mtbf: 1890,
    targetBdPct: "0.15%",
    bdPct: "0.030%",
  },
];

export default function BreakdownMonthlyTable() {
  const [page, setPage] = React.useState(1);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  const paginatedData = data.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-full">

      {/* ===== TABLE ===== */}
      <div className="overflow-auto flex-1">
        <table className="w-full text-xs border-collapse">
          <thead
            className="sticky top-0 
              bg-orange-200 dark:bg-orange-900
              text-black dark:text-white"
          >
            <tr>
              <th className="p-2 border">Month</th>
              <th className="p-2 border">No. of Breakdowns</th>
              <th className="p-2 border">Breakdown Hrs</th>
              <th className="p-2 border">No of Machines</th>
              <th className="p-2 border">Work Hrs / Day</th>
              <th className="p-2 border">Total Available Hrs</th>
              <th className="p-2 border">Target MTTR</th>
              <th className="p-2 border">Actual MTTR</th>
              <th className="p-2 border">Target MTBF</th>
              <th className="p-2 border">Actual MTBF</th>
              <th className="p-2 border">Target Breakdown %</th>
              <th className="p-2 border">Breakdown Hrs %</th>
            </tr>
          </thead>

          <tbody>
            {paginatedData.map((r, i) => (
              <tr
                key={i}
                className="text-center
                  hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <td className="border p-1">{r.month}</td>
                <td className="border p-1">{r.bd}</td>
                <td className="border p-1">{r.hrs}</td>
                <td className="border p-1">{r.nom}</td>
                <td className="border p-1">{r.whpd}</td>
                <td className="border p-1">{r.tah}</td>
                <td className="border p-1">{r.targetMttr}</td>
                <td className="border p-1">{r.mttr}</td>
                <td className="border p-1">{r.targetMtbf}</td>
                <td className="border p-1">{r.mtbf}</td>
                <td className="border p-1">{r.targetBdPct}</td>
                <td className="border p-1">{r.bdPct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== PAGINATION ===== */}
      <div className="flex justify-end items-center gap-2 p-2 text-xs">
        <button
          onClick={() => setPage(p => Math.max(p - 1, 1))}
          disabled={page === 1}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span>
          Page {page} / {totalPages}
        </span>

        <button
          onClick={() => setPage(p => Math.min(p + 1, totalPages))}
          disabled={page === totalPages}
          className="px-2 py-1 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>

    </div>
  );
}
