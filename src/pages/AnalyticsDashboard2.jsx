import React, { useEffect, useState } from "react";

import MaintenanceCostChart from "../components/charts/MaintenanceCostChart";
import CompletedVsScheduledChart from "../components/charts/CompletedVsScheduledChart";
import PMBMManhourChart from "../components/charts/PMBMManhourChart";
import PowerCostChart from "../components/charts/PowerCostChart";
import DowntimeContributionChart from "../components/charts/DowntimeContributionChart";
import FailureStatusChart from "../components/charts/FailureStatusChart";
import CompletedVsScheduledBarChart from "../components/charts/CompletedVsScheduledBarChart";
import ActualMTTRChart from "../components/charts/ActualMTTRChart";
import ActualMTBFChart  from "../components/charts/ActualMTBFChart";

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

    loadDashboard();
    intervalId = setInterval(loadDashboard, 60000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="h-screen p-2 overflow-y-auto grid auto-rows-[43%] gap-2">
      
      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-3 gap-2 h-full">
        <Card className="flex flex-col">
          <CardHeader title="Maintenance Cost" />
          <div className="flex-1 min-h-0">
            {loading ? <span>Loading...</span> : <MaintenanceCostChart data={maintenanceCost} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Completed vs Scheduled Maintenance (Summary)" />
          <div className="flex-1 min-h-0">
            {loading ? (
              <span>Loading...</span>
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
            {loading ? <span>Loading...</span> : <PMBMManhourChart data={pmBmData} />}
          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-3 gap-2 h-full">
        <Card className="flex flex-col">
          <CardHeader title="Power Cost" />
          <div className="flex-1 min-h-0">
            {loading ? <span>Loading...</span> : <PowerCostChart data={powerCost} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Downtime Contribution" />
          <div className="flex-1 min-h-0">
            {loading ? <span>Loading...</span> : <DowntimeContributionChart data={downtimeContribution} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Failure Status" />
          <div className="flex-1 min-h-0">
            {loading ? <span>Loading...</span> : <FailureStatusChart data={failureStatus} />}
          </div>
        </Card>
      </div>

      {/* ===== ROW 3 ===== */}
{/* ===== ROW 3 ===== */}
<div className="grid grid-cols-3 gap-2 h-full">

  {/* Completed vs Scheduled (keep as-is) */}
  <Card className="flex flex-col">
    <CardHeader title="Completed vs Scheduled Maintenance (Detailed)" />
    <div className="flex-1 min-h-0">
      {loading ? (
        <span>Loading...</span>
      ) : (
        <CompletedVsScheduledBarChart data={completedVsScheduledBar} />
      )}
    </div>
  </Card>

  {/* Actual MTTR */}
  <Card className="flex flex-col">
    <CardHeader title="Actual MTTR (Hrs)" />
    <div className="flex-1 min-h-0">
      <ActualMTTRChart />
    </div>
  </Card>

  {/* Actual MTBF */}
  <Card className="flex flex-col">
    <CardHeader title="Actual MTBF (Hrs)" />
    <div className="flex-1 min-h-0">
      <ActualMTBFChart />
    </div>
  </Card>

</div>


      {/* 🔴 SCROLL SPACER — DO NOT REMOVE */}
      <div className="h-24"></div>
    </div>
  );
}
