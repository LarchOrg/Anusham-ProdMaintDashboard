import React, { useState, useEffect } from "react";
import { TrendingUp, BarChart3, Activity } from "lucide-react";

import { Card, CardHeader } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";

import OEETrendLine from "../components/charts/OEETrendLine";
import ProductionBarChart from "../components/charts/ProductionBarChart";
import FPYChart from "../components/charts/FPYChart";
import ScrapRateChart from "../components/charts/ScrapRateChart";
import LTIRChart from "../components/charts/LTIRChart";
import CustomerComplaintChart from "../components/charts/CustomerComplaintsChart";
import DowntimeOEEComposed from "../components/charts/DowntimeOEEComposed";

import {
  fetchOEEChart,
  fetchFPYChart,
  fetchScrapChart,
  fetchLTIRChart,
  fetchProductionChart,
  fetchCustomerComplaintsChart,
  fetchDowntimeVsOeeChart,
} from "../services/dashboardApi";

export default function AnalyticsDashboard() {

  const [oeeData, setOeeData] = useState([]);
  const [fpyData, setFpyData] = useState([]);
  const [scrapData, setScrapData] = useState([]);
  const [ltirData, setLtirData] = useState([]);
  const [productionData, setProductionData] = useState([]);
  const [customerComplaintData, setCustomerComplaintData] = useState([]);
  const [downtimeVsOeeData, setDowntimeVsOeeData] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    let intervalId;

    const loadCharts = async () => {
      try {
        setLoading(true);

        const [
          oee,
          fpy,
          scrap,
          ltir,
          production,
          complaints,
          downtimeOee
        ] = await Promise.all([
          fetchOEEChart(),
          fetchFPYChart(),
          fetchScrapChart(),
          fetchLTIRChart(),
          fetchProductionChart(),
          fetchCustomerComplaintsChart(),
          fetchDowntimeVsOeeChart()
        ]);

        setOeeData(oee);
        setFpyData(fpy);
        setScrapData(scrap);
        setLtirData(ltir);
        setProductionData(production);
        setCustomerComplaintData(complaints);
        setDowntimeVsOeeData(downtimeOee);

      } catch (err) {
        console.error("Analytics dashboard error:", err);
      } finally {
        setLoading(false);
      }
    };

    loadCharts();

    intervalId = setInterval(() => {
      loadCharts();
    }, 60000);

    return () => {
      clearInterval(intervalId);
    };

  }, []);

  return (
    <div className="h-full p-2 overflow-y-auto grid auto-rows-[minmax(42vh,auto)] gap-2">

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-3 gap-2">

        <Card className="flex flex-col">
          <CardHeader title="OEE Trend (%)" icon={TrendingUp} />
          <div className="flex-1 min-h-0">
            {loading ? <Skeleton className="h-full" /> : <OEETrendLine data={oeeData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Customer Complaints" icon={BarChart3} />
          <div className="flex-1 min-h-0">
            {loading ? <Skeleton className="h-full" /> : <CustomerComplaintChart data={customerComplaintData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Production Output" icon={BarChart3} />
          <div className="flex-1 min-h-0">
            {loading ? <Skeleton className="h-full" /> : <ProductionBarChart data={productionData} />}
          </div>
        </Card>

      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-3 gap-2">

        <Card className="flex flex-col">
          <CardHeader title="First Pass Yield (%)" icon={TrendingUp} />
          <div className="flex-1 min-h-0">
            {loading ? <Skeleton className="h-full" /> : <FPYChart data={fpyData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Scrap Rate (%)" icon={Activity} />
          <div className="flex-1 min-h-0">
            {loading ? <Skeleton className="h-full" /> : <ScrapRateChart data={scrapData} />}
          </div>
        </Card>

        {/* <Card className="flex flex-col">
          <CardHeader title="Lost Time Incident Rate" icon={Activity} />
          <div className="flex-1 min-h-0">
            {loading ? <Skeleton className="h-full" /> : <LTIRChart data={ltirData} />}
          </div>
        </Card> */}
                <Card className="h-full flex flex-col">
          <CardHeader title="Downtime vs OEE" icon={BarChart3} />
          <div className="flex-1 min-h-0">
             {loading ? <Skeleton className="h-full" /> : <DowntimeOEEComposed data={downtimeVsOeeData} />}
          </div>
        </Card>

      </div>

      {/* ===== ROW 3 ===== */}
      {/* <div className="grid grid-cols-3 gap-2">

                <Card className="h-full flex flex-col">
          <CardHeader title="Downtime vs OEE" icon={BarChart3} />
          <div className="flex-1 min-h-0">
             {loading ? <Skeleton className="h-full" /> : <DowntimeOEEComposed data={downtimeVsOeeData} />}
          </div>
        </Card>

        <div />
        <div />

      </div> */}

    </div>
  );
}