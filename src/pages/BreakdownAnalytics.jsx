import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";

import BreakdownMonthlyTable from "../components/tables/BreakdownMonthlyTable";
import BreakdownHrsChart from "../components/charts/BreakdownHrsChart";
import ActualMTTRChart from "../components/charts/ActualMTTRChart";
import ActualMTBFChart from "../components/charts/ActualMTBFChart";

import {
  fetchMttrMtbfTable,
  fetchBreakdownHrsChart,
  fetchActualMTTRChart,
  fetchActualMTBFChart,
} from "../services/dashboardApi";

export default function BreakdownAnalytics() {
  const [tableData, setTableData] = useState([]);
  const [breakdownHrs, setBreakdownHrs] = useState([]);
  const [mttrData, setMttrData] = useState([]);
  const [mtbfData, setMtbfData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [
          tableRes,
          breakdownRes,
          mttrRes,
          mtbfRes
        ] = await Promise.all([
          fetchMttrMtbfTable(),
          fetchBreakdownHrsChart(),
          fetchActualMTTRChart(),
          fetchActualMTBFChart(),
        ]);

        setTableData(tableRes);
        setBreakdownHrs(breakdownRes);
        setMttrData(mttrRes);
        setMtbfData(mtbfRes);
      } catch (err) {
        console.error("Breakdown analytics error:", err);
      } finally {
        setLoading(false);
      }
    };

    // 🔹 Initial load
    loadData();

    // 🔹 Auto refresh every 1 min
    const interval = setInterval(loadData, 60000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="p-4 text-sm">
        Loading breakdown analytics...
      </div>
    );
  }

  return (
    // ✅ Scrollable page
    <div className="h-full overflow-y-auto flex flex-col gap-6 p-2">

      {/* ================= TABLE ================= */}
      <Card
        className="flex flex-col min-h-[420px]"
        noPadding
      >
        <BreakdownMonthlyTable data={tableData} />
      </Card>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Breakdown Hrs */}
        <Card className="p-3 h-[360px]">
          <h3 className="text-sm font-bold mb-2 text-red-600">
            Breakdown Hrs
          </h3>
          <BreakdownHrsChart data={breakdownHrs} />
        </Card>

        {/* MTTR */}
        <Card className="p-3 h-[360px]">
          <h3 className="text-sm font-bold mb-2 text-blue-600">
            Actual MTTR (Hrs)
          </h3>
          <ActualMTTRChart data={mttrData} />
        </Card>

        {/* MTBF */}
        <Card className="p-3 h-[360px]">
          <h3 className="text-sm font-bold mb-2 text-green-600">
            Actual MTBF (Hrs)
          </h3>
          <ActualMTBFChart data={mtbfData} />
        </Card>

      </div>
    </div>
  );
}
