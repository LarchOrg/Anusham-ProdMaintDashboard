import React, { useEffect, useState } from "react";
import { Skeleton } from "../components/ui/Skeleton";
import MaintenanceCostChart from "../components/charts/MaintenanceCostChart";
import CompletedVsScheduledChart from "../components/charts/CompletedVsScheduledChart";
import PMBMManhourChart from "../components/charts/PMBMManhourChart";
import PowerCostChart from "../components/charts/PowerCostChart";
import DowntimeContributionChart from "../components/charts/DowntimeContributionChart";
import FailureStatusChart from "../components/charts/FailureStatusChart";
import CompletedVsScheduledBarChart from "../components/charts/CompletedVsScheduledBarChart";

import { Card, CardHeader } from "../components/ui/Card";
import {
  fetchCompletedVsScheduled,
  fetchMaintenanceCost,
  fetchPMBMChart,
  fetchPowerCostChart,
  fetchDowntimeContribution,
  fetchFailureStatus,
  fetchCompletedVsScheduledBar,
} from "../services/dashboardApi";

export default function AnalyticsDashboard2() {
  const [maintenanceCost, setMaintenanceCost] = useState([]);
  const [completedVsScheduled, setCompletedVsScheduled] = useState(null);
  const [pmBmData, setPmBmData] = useState([]);
  const [powerCost, setPowerCost] = useState([]);
  const [downtimeContribution, setDowntimeContribution] = useState([]);
  const [failureStatus, setFailureStatus] = useState([]);
  const [completedVsScheduledBar, setCompletedVsScheduledBar] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        setLoading(true);

        const [
          maintenance,
          completed,
          pmBm,
          power,
          downtime,
          failure,
          completedBar,
        ] = await Promise.all([
          fetchMaintenanceCost(),
          fetchCompletedVsScheduled(),
          fetchPMBMChart(),
          fetchPowerCostChart(),
          fetchDowntimeContribution(),
          fetchFailureStatus(),
          fetchCompletedVsScheduledBar(),
        ]);

        setMaintenanceCost(maintenance);
        setCompletedVsScheduled(completed);
        setPmBmData(pmBm);
        setPowerCost(power);
        setDowntimeContribution(downtime);
        setFailureStatus(failure);
        setCompletedVsScheduledBar(completedBar);
      } catch (err) {
        console.error("Dashboard load failed:", err);
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
    const interval = setInterval(loadDashboard, 60000);
    return () => clearInterval(interval);
  }, []);

  return (

    <div className="h-full w-full overflow-y-auto p-2 space-y-2">

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Maintenance Cost" />
          <div className="flex-1 min-h-[250px]">
            {loading ? <Skeleton className="h-full" />: <MaintenanceCostChart data={maintenanceCost} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Completed vs Scheduled Maintenance (2026)" />
          <div className="flex-1 min-h-[220px]">
            {loading ? <Skeleton className="h-full" /> : (
              <CompletedVsScheduledChart
                data={completedVsScheduled?.chartData || []}
                totalPlans={completedVsScheduled?.totalPlans || 0}
              />
            )}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="PM & BM Manhour Monthly Trend" />
          <div className="flex-1 min-h-[220px]">
            {loading ? <Skeleton className="h-full" /> : <PMBMManhourChart data={pmBmData} />}
          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Power Cost" />
          <div className="flex-1 min-h-[250px]">
            {loading ? <Skeleton className="h-full" /> : <PowerCostChart data={powerCost} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Downtime Contribution(2026)" />
          <div className="flex-1 min-h-[220px]">
            {loading ? <Skeleton className="h-full" /> : <DowntimeContributionChart data={downtimeContribution} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Failure Status" />
          <div className="flex-1 min-h-[220px]">
            {loading ? <Skeleton className="h-full" /> : <FailureStatusChart data={failureStatus} />}
          </div>
        </Card>
      </div>

      {/* ===== ROW 3 ===== */}

      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Completed vs Scheduled Maintenance (Detailed)" />
          <div className="flex-1 min-h-[250px]">
            {loading ? <Skeleton className="h-full" /> : (
              <CompletedVsScheduledBarChart data={completedVsScheduledBar} />
            )}
          </div>
        </Card>

        <div />
        <div />
      </div>

    </div>
  );
}
