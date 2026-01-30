import React, { useEffect, useState } from "react";
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

export default function AnalyticsDashboard() {
  const [loadingOEE, setLoadingOEE] = useState(true);
  const [oeeData, setOeeData] = useState([]);

  const [loadingFPY, setLoadingFPY] = useState(true);
  const [fpyData, setFpyData] = useState([]);

  const [loadingScrap, setLoadingScrap] = useState(true);
  const [scrapData, setScrapData] = useState([]);

  const [loadingLtir, setLoadingLtir] = useState(true);
  const [ltirData, setLtirData] = useState([]);

  const [loadingProduction, setLoadingProduction] = useState(true);
  const [productionData, setProductionData] = useState([]);

  const [customerComplaintData, setCustomerComplaintData] = useState([]);
  const [loadingCustomerComplaints, setLoadingCustomerComplaints] = useState(true);

  useEffect(() => {
    const fetchAllCharts = async () => {
      try {
        setLoadingOEE(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/oee");
        const data = await res.json();
        setOeeData(
          (data || []).map((i) => ({
            month: i.monthYear,
            value: Number(i.percentage.replace("%", "")),
          }))
        );
      } finally {
        setLoadingOEE(false);
      }

      try {
        setLoadingFPY(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/fpy");
        const data = await res.json();
        setFpyData(
          (data || []).map((i) => ({
            month: i.monthYear,
            value: Number(i.percentage.replace("%", "")),
          }))
        );
      } finally {
        setLoadingFPY(false);
      }

      try {
        setLoadingScrap(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/ScrapReject");
        const data = await res.json();
        setScrapData(
          (data || []).map((i) => ({
            month: i.monthYear,
            value: Number(i.percentage.replace("%", "")),
          }))
        );
      } finally {
        setLoadingScrap(false);
      }

      try {
        setLoadingLtir(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/Ltir");
        const data = await res.json();
        setLtirData(
          (data || []).map((i) => ({
            month: i.monthYear,
            value: Number(i.percentage.replace("%", "")),
          }))
        );
      } finally {
        setLoadingLtir(false);
      }

      try {
        setLoadingProduction(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/ProductionOutput");
        const data = await res.json();
        setProductionData(
          (data || []).map((i) => ({
            month: i.monthYear,
            value: Number(i.percentage),
          }))
        );
      } finally {
        setLoadingProduction(false);
      }

      try {
        setLoadingCustomerComplaints(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/CustomerComplain");
        const data = await res.json();
        setCustomerComplaintData(
          (data || []).map((i) => ({
            month: i.monthYear,
            value: Number(i.percentage.replace("%", "")),
          }))
        );
      } finally {
        setLoadingCustomerComplaints(false);
      }
    };

    fetchAllCharts();
    const interval = setInterval(fetchAllCharts, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-screen p-2 overflow-y-auto grid auto-rows-[minmax(42vh,auto)] gap-2">

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="OEE Trend (%)" icon={TrendingUp} />
          <div className="flex-1 min-h-0">
            {loadingOEE ? <Skeleton className="h-full" /> : <OEETrendLine data={oeeData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Customer Complaints" icon={BarChart3} />
          <div className="flex-1 min-h-0">
            {loadingCustomerComplaints ? (
              <Skeleton className="h-full" />
            ) : (
              <CustomerComplaintChart data={customerComplaintData} />
            )}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Production Output" icon={BarChart3} />
          <div className="flex-1 min-h-0">
            {loadingProduction ? (
              <Skeleton className="h-full" />
            ) : (
              <ProductionBarChart data={productionData} />
            )}
          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="First Pass Yield (%)" icon={TrendingUp} />
          <div className="flex-1 min-h-0">
            {loadingFPY ? <Skeleton className="h-full" /> : <FPYChart data={fpyData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Scrap Rate (%)" icon={Activity} />
          <div className="flex-1 min-h-0">
            {loadingScrap ? <Skeleton className="h-full" /> : <ScrapRateChart data={scrapData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Lost Time Incident Rate" icon={Activity} />
          <div className="flex-1 min-h-0">
            {loadingLtir ? <Skeleton className="h-full" /> : <LTIRChart data={ltirData} />}
          </div>
        </Card>
      </div>

{/* ===== ROW 3 ===== */}
<div className="grid grid-cols-3 gap-2">

  {/* Downtime OEE – LEFT ALIGNED */}
  <Card className="h-full flex flex-col">
    <CardHeader title="Downtime vs OEE" icon={BarChart3} />
    <div className="flex-1 min-h-0">
      <DowntimeOEEComposed />
    </div>
  </Card>

  {/* Empty columns to preserve sizing */}
  <div />
  <div />

</div>

{/* 🔴 Scroll spacer */}
<div className="h-24" />


    </div>
  );
}
