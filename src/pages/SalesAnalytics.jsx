import React from "react";
import { BarChart3, TrendingUp, Users, UserCheck, Package } from "lucide-react";

import { Card, CardHeader } from "../components/ui/Card";

import MonthlySalesTrend from "../components/charts/MonthlySalesTrend";
import MonthlyPerformance from "../components/charts/MonthlyPerformance";
import TopCustomersChart from "../components/charts/TopCustomersChart";
import TopSalespersonsChart from "../components/charts/TopSalespersonsChart";
import TopItemsChart from "../components/charts/TopItemsChart";

export default function SalesAnalytics() {
  return (
    // FULL HEIGHT CONTAINER
    <div className="h-full flex flex-col gap-4">

      {/* ===== ROW 1 ===== */}
  {/* ROW 1 */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-[2] min-h-0">

        <Card className="flex flex-col">
          <CardHeader title="Monthly Sales Trend" icon={TrendingUp} />
          <div className="flex-1 min-h-0">
            <MonthlySalesTrend />
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Monthly Performance" icon={BarChart3} />
          <div className="flex-1 min-h-0">
            <MonthlyPerformance />
          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-[2] min-h-0">
        <Card className="flex flex-col overflow-hidden">
          <CardHeader title="Top 5 Customers by Sales" icon={Users} />
          <div className="flex-1 min-h-0">
            <TopCustomersChart />
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <CardHeader title="Top 5 Salespersons by Sales" icon={UserCheck} />
          <div className="flex-1 min-h-0">
            <TopSalespersonsChart />
          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <CardHeader title="Top 5 Items by Sales" icon={Package} />
          <div className="flex-1 min-h-0">
            <TopItemsChart />
          </div>
        </Card>
      </div>

    </div>
  );
}
