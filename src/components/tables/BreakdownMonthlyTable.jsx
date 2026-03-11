import React, { useState, useEffect } from "react";

const ROWS_PER_PAGE = 12;

export default function BreakdownMonthlyTable({ data = [] }) {

  const [page, setPage] = useState(1);

  // Reset page when data changes
  useEffect(() => {
    setPage(1);
  }, [data]);

  const totalPages = Math.ceil(data.length / ROWS_PER_PAGE);

  const paginatedData = data.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  return (
    <div className="flex flex-col h-full">

      {/* ===== TABLE HEADER ===== */}
      <div
        className="
        px-3 py-2 
        text-sm font-bold 
        bg-orange-300 dark:bg-orange-800 
        text-black dark:text-white
        border-b
      "
      >
        Breakdown Monthly Analysis
      </div>

      {/* ===== TABLE AREA ===== */}
      <div className="flex-1 overflow-auto">

        {!data || data.length === 0 ? (

          /* ===== NO DATA STATE ===== */
          <div
            className="w-full h-full flex items-center justify-center text-[14px] font-medium tracking-wide
            bg-[#f0f0f0] text-black
            dark:bg-gray-800 dark:text-gray-200"
          >
            No Data Available
          </div>

        ) : (

          /* ===== TABLE ===== */
          <table className="w-full text-xs border-collapse">

            <thead
              className="
              sticky top-0 
              bg-orange-200 dark:bg-orange-900
              text-black dark:text-white
            "
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
                  className="text-center hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <td className="border p-1">{r.monthYear}</td>
                  <td className="border p-1">{r.noOfBreakDown}</td>
                  <td className="border p-1">{r.breakDownHrs}</td>
                  <td className="border p-1">{r.noOfMachine}</td>
                  <td className="border p-1">{r.workingHrsPerDays}</td>
                  <td className="border p-1">{r.totalAvailHrs}</td>
                  <td className="border p-1">{r.targetMttr}</td>
                  <td className="border p-1">{r.actualMttr}</td>
                  <td className="border p-1">{r.targetMtbf}</td>
                  <td className="border p-1">{r.actualMtbf}</td>
                  <td className="border p-1">{r.targetBreakdown}%</td>
                  <td className="border p-1">{r.breakdownHrsPercentage}</td>
                </tr>
              ))}
            </tbody>

          </table>

        )}

      </div>

      {/* ===== PAGINATION ===== */}
      {data.length > 0 && totalPages > 1 && (
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
      )}

    </div>
  );
}