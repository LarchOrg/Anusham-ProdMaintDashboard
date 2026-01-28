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
  fetchCompletedVsScheduledBar 
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
    let intervalId;

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
      } catch (error) {
        console.error("Dashboard load failed:", error);
      } finally {
        setLoading(false);
      }
    };

    // Initial load
    loadDashboard();

    // Auto refresh every 1 min
    intervalId = setInterval(loadDashboard, 60000);

    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-screen p-2 overflow-y-auto grid auto-rows-[43%] gap-2">
      
      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-3 gap-2 h-full">
        <Card className="flex flex-col">
          <CardHeader title="Maintenance Cost" />
          <div className="flex-1 min-h-0">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : (
              <MaintenanceCostChart data={maintenanceCost} />
            )}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Completed vs Scheduled Maintenance (Summary)" />
          <div className="flex-1 min-h-0">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : (
              <CompletedVsScheduledChart
                data={completedVsScheduled?.chartData || []}
                totalPlans={completedVsScheduled?.totalPlans || 0}
              />
            )}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="PM & BM Manhour Monthly Trend" />
          <div className="flex-1 min-h-0">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : (
              <PMBMManhourChart data={pmBmData} />
            )}
          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-3 gap-2 h-full">
        <Card className="flex flex-col">
          <CardHeader title="Power Cost" />
          <div className="flex-1 min-h-0">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : (
              <PowerCostChart data={powerCost} />
            )}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Downtime Contribution" />
          <div className="flex-1 min-h-0">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : (
              <DowntimeContributionChart data={downtimeContribution} />
            )}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Failure Status" />
          <div className="flex-1 min-h-0">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : (
              <FailureStatusChart data={failureStatus} />
            )}
          </div>
        </Card>
      </div>

      {/* ===== ROW 3 (Scrollable Completed vs Scheduled) ===== */}
   <div className="grid grid-cols-3 gap-2 h-full">
  <Card className="flex flex-col">
    <CardHeader title="Completed vs Scheduled Maintenance (Detailed)" />
    <div className="flex-1 min-h-0">
      {loading ? (
        <span className="text-sm text-gray-400">Loading...</span>
      ) : (
        <CompletedVsScheduledBarChart data={completedVsScheduledBar} />
      )}
    </div>
  </Card>
</div>


    </div>
  );
}
