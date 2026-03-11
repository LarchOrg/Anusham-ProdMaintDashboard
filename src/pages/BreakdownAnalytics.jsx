import React, { useEffect, useState } from "react";
import { Card } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
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

    loadData();

    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="h-full overflow-y-auto flex flex-col gap-6 p-2">

        {/* TABLE SKELETON */}
        <Card className="p-4 min-h-[420px]">

          {/* Table Header */}
          <div className="grid grid-cols-6 gap-4 mb-3">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>

          {/* Table Rows */}
          <div className="space-y-3">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="grid grid-cols-6 gap-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>

        </Card>

        {/* CHART SKELETONS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-3 h-[360px] flex flex-col">

              {/* Chart Title */}
              <Skeleton className="h-5 w-32 mb-4" />

              {/* Chart Area */}
              <div className="flex-1">
                <Skeleton className="h-full w-full rounded-lg" />
              </div>

            </Card>
          ))}

        </div>

      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-6 p-2">

      {/* TABLE */}
      <Card className="flex flex-col min-h-[420px]" noPadding>
        <BreakdownMonthlyTable data={tableData} />
      </Card>

      {/* CHARTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        <Card className="p-3 h-[360px]">
          <h3 className="text-sm font-bold mb-2 text-red-600">
            Breakdown Hrs
          </h3>
          <BreakdownHrsChart data={breakdownHrs} />
        </Card>

        <Card className="p-3 h-[360px]">
          <h3 className="text-sm font-bold mb-2 text-blue-600">
            Actual MTTR (Hrs)
          </h3>
          <ActualMTTRChart data={mttrData} />
        </Card>

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