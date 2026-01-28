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
      // ===== OEE =====
      try {
        setLoadingOEE(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/oee");
        const data = await res.json();
        const chartData = (data || []).map((item) => ({
          month: item.monthYear,
          value: Number(item.percentage.replace("%", "")),
        }));
        setOeeData(chartData);
      } catch (err) {
        console.error("❌ Failed to fetch OEE data:", err);
        setOeeData([]);
      } finally {
        setLoadingOEE(false);
      }

      // ===== FPY =====
      try {
        setLoadingFPY(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/fpy");
        const data = await res.json();
        const chartData = (data || []).map((item) => ({
          month: item.monthYear,
          value: Number(item.percentage.replace("%", "")),
        }));
        setFpyData(chartData);
      } catch (err) {
        console.error("❌ Failed to fetch FPY data:", err);
        setFpyData([]);
      } finally {
        setLoadingFPY(false);
      }

      // ===== Scrap =====
      try {
        setLoadingScrap(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/ScrapReject");
        const data = await res.json();
        const chartData = (data || []).map((item) => ({
          month: item.monthYear,
          value: Number(item.percentage.replace("%", "")),
        }));
        setScrapData(chartData);
      } catch (err) {
        console.error("❌ Failed to fetch Scrap data:", err);
        setScrapData([]);
      } finally {
        setLoadingScrap(false);
      }

      // ===== LTIR =====
      try {
        setLoadingLtir(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/Ltir");
        const data = await res.json();
        const chartData = (data || []).map((item) => ({
          month: item.monthYear,
          value: Number(item.percentage.replace("%", "")),
        }));
        setLtirData(chartData);
      } catch (err) {
        console.error("❌ Failed to fetch LTIR data:", err);
        setLtirData([]);
      } finally {
        setLoadingLtir(false);
      }

      // ===== Production =====
      try {
        setLoadingProduction(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/ProductionOutput");
        const data = await res.json();
        const chartData = (data || []).map((item) => ({
          month: item.monthYear,
          value: Number(item.percentage),
        }));
        setProductionData(chartData);
      } catch (err) {
        console.error("❌ Failed to fetch Production data:", err);
        setProductionData([]);
      } finally {
        setLoadingProduction(false);
      }

      // ===== Customer Complaints =====
      try {
        setLoadingCustomerComplaints(true);
        const res = await fetch("https://anushamapi.larcherp.com/api/chart/CustomerComplain");
        const data = await res.json();
        const chartData = (data || []).map((item) => ({
          month: item.monthYear,
          value: Number(item.percentage.replace("%", "")),
        }));
        setCustomerComplaintData(chartData);
      } catch (err) {
        console.error("❌ Failed to fetch Customer Complaints data:", err);
        setCustomerComplaintData([]);
      } finally {
        setLoadingCustomerComplaints(false);
      }
    };

    // Initial fetch
    fetchAllCharts();

    // Auto-refresh every 1 minute
    const interval = setInterval(fetchAllCharts, 60000);

    return () => clearInterval(interval); // cleanup on unmount
  }, []);

  return (
    <div className="h-[100vh] p-2 grid grid-rows-[42vh_42vh] gap-2 overflow-hidden">
      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="h-full flex flex-col">
          <CardHeader title="OEE Trend (%)" icon={TrendingUp} />
          <div className="flex-1 min-h-0">
            {loadingOEE ? <Skeleton className="h-full" /> : <OEETrendLine data={oeeData} />}
          </div>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader title="Customer Complaints" icon={BarChart3} />
          <div className="flex-1 min-h-0">
            {loadingCustomerComplaints ? (
              <Skeleton className="h-full" />
            ) : (
              <CustomerComplaintChart data={customerComplaintData} />
            )}
          </div>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader title="Production Output" icon={BarChart3} />
          <div className="flex-1 min-h-0 overflow-hidden">
            {loadingProduction ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <ProductionBarChart data={productionData} />
            )}
          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-3 gap-2">
        <Card className="h-full flex flex-col">
          <CardHeader title="First Pass Yield (%)" icon={TrendingUp} />
          <div className="flex-1 min-h-0">
            {loadingFPY ? <Skeleton className="h-full" /> : <FPYChart data={fpyData} />}
          </div>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader title="Scrap Rate (%)" icon={Activity} />
          <div className="flex-1 min-h-0">
            {loadingScrap ? <Skeleton className="h-full" /> : <ScrapRateChart data={scrapData} />}
          </div>
        </Card>

        <Card className="h-full flex flex-col">
          <CardHeader title="Lost Time Incident Rate" icon={Activity} />
          <div className="flex-1 min-h-0">
            {loadingLtir ? <Skeleton className="h-full" /> : <LTIRChart data={ltirData} />}
          </div>
        </Card>
      </div>
    </div>
  );
}
