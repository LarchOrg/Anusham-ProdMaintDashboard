import React from "react";
import { Card } from "../components/ui/Card";

import BreakdownMonthlyTable from "../components/tables/BreakdownMonthlyTable";
import BreakdownHrsChart from "../components/charts/BreakdownHrsChart";
import ActualMTTRChart from "../components/charts/ActualMTTRChart";
import ActualMTBFChart from "../components/charts/ActualMTBFChart";

export default function BreakdownAnalytics() {
  return (
    <div className="h-full flex flex-col gap-4">

      {/* ===== TABLE ===== */}
      <Card className="flex flex-col min-h-[320px]" noPadding>
        <BreakdownMonthlyTable />
      </Card>

      {/* ===== CHARTS ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[360px]">

        <Card className="p-3">
          <h3 className="text-sm font-bold mb-2 text-red-600">
            Breakdown Hrs
          </h3>
          <BreakdownHrsChart />
        </Card>

        <Card className="p-3">
          <h3 className="text-sm font-bold mb-2 text-blue-600">
            Actual MTTR (Hrs)
          </h3>
          <ActualMTTRChart />
        </Card>

        <Card className="p-3">
          <h3 className="text-sm font-bold mb-2 text-green-600">
            Actual MTBF (Hrs)
          </h3>
          <ActualMTBFChart />
        </Card>

      </div>
    </div>
  );
}
