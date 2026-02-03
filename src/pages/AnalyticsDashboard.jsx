import React, { useEffect, useState } from "react";

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
    <div className="h-full overflow-y-auto p-2 grid auto-rows-[minmax(42vh,auto)] gap-2">

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Maintenance Cost" />
          <div className="flex-1 min-h-[250px]">
            {loading ? "Loading..." : <MaintenanceCostChart data={maintenanceCost} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Completed vs Scheduled Maintenance (Summary)" />
          <div className="flex-1 min-h-[220px]">
            {loading ? "Loading..." : (
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
            {loading ? "Loading..." : <PMBMManhourChart data={pmBmData} />}
          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Power Cost" />
          <div className="flex-1 min-h-[250px]">
            {loading ? "Loading..." : <PowerCostChart data={powerCost} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Downtime Contribution" />
          <div className="flex-1 min-h-[220px]">
            {loading ? "Loading..." : <DowntimeContributionChart data={downtimeContribution} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Failure Status" />
          <div className="flex-1 min-h-[220px]">
            {loading ? "Loading..." : <FailureStatusChart data={failureStatus} />}
          </div>
        </Card>
      </div>

      {/* ===== ROW 3 ===== */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Completed vs Scheduled Maintenance (Detailed)" />
          <div className="flex-1 min-h-[250px]">
            {loading ? "Loading..." : (
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
