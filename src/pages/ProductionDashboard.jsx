import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Sparkles,
  TrendingUp,
} from "lucide-react";

import OEEGauge from "../components/charts/OEEGauge";
import * as dashboardAPI from "../services/dashboardApi";

import { useSettings } from "../context/SettingsContext";
import { Card, CardHeader } from "../components/ui/Card";
import { StatCard } from "../components/dashboard/StatCard";
import { MachineTable } from "../components/dashboard/MachineTable";
import { Skeleton } from "../components/ui/Skeleton";

export default function ProductionDashboard() {
  const { settings } = useSettings();

  const [loading, setLoading] = useState(true);
  const [kpiData, setKpiData] = useState(null);
  const [machineData, setMachineData] = useState([]);
  const [bottlenecks, setBottlenecks] = useState([]);
  const [isDark, setIsDark] = useState(false);

  /* ================= THEME ================= */
  useEffect(() => {
    const checkTheme = () =>
      setIsDark(document.documentElement.classList.contains("dark"));

    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  /* ================= DATA FETCH ================= */
  const fetchData = async () => {
    try {
      setLoading(true);

      const [{ machines = [], kpi = null }, bottlenecksData = []] =
        await Promise.all([
          dashboardAPI.fetchMachineStatus(),
          dashboardAPI.fetchBottlenecks(),
        ]);

      setMachineData(machines);
      setKpiData(kpi);
      setBottlenecks(bottlenecksData);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      setMachineData([]);
      setKpiData(null);
      setBottlenecks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(
      fetchData,
      (settings.refreshRate || 10) * 1000
    );
    return () => clearInterval(interval);
  }, [settings.refreshRate]);

  const noMachineData = !loading && machineData.length === 0; // ⭐

  const exportToCSV = () => {
    if (machineData.length === 0) return;

    const headers = [
      "Machine",
      "Status",
      "Order",
      "Produced",
      "Targets",
      "Rejects",
    ];

    const rows = machineData.map((m) => [
      m.name,
      m.status,
      m.currentOrder,
      m.produced,
      m.targets,
      m.oee,
      m.rejects,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "production_data.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPrimaryColor = () => {
    if (settings.colorTheme === "teal") return "#0d9488";
    return "#3b82f6";
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* ================= KPI CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <StatCard
          title="Total Output"
          value={Number(kpiData?.totalProduced) || 0}
          subtext={`Target: ${Number(kpiData?.target) || 0}`}
          icon={CheckCircle}
          colorClass={{
            text: "text-gray-800 dark:text-white",
            bg: "bg-primary-50 dark:bg-primary-900/30",
            icon: "text-primary-600 dark:text-primary-400",
          }}
          loading={loading}
        />

        <StatCard
          title="Rejects (NG)"
          value={Number(kpiData?.totalRejects) || 0}
          subtext={`Rate: ${
            kpiData?.totalProduced
              ? (
                  (Number(kpiData.totalRejects) /
                    Number(kpiData.totalProduced)) *
                  100
                ).toFixed(2)
              : 0
          }%`}
          icon={XCircle}
          colorClass={{
            text: "text-red-600 dark:text-red-400",
            bg: "bg-red-50 dark:bg-red-900/30",
            icon: "text-red-600 dark:text-red-400",
          }}
          loading={loading}
        />

        <StatCard
          title="Running Machines"
          value={machineData.filter((m) => m.status === "A").length}
          subtext={`Total: ${machineData.length}`}
          icon={Activity}
          colorClass={{
            text: "text-gray-800 dark:text-white",
            bg: "bg-green-50 dark:bg-green-900/30",
            icon: "text-green-600 dark:text-green-400",
          }}
          loading={loading}
        />

        <StatCard
          title="Breakdown"
          value={bottlenecks.length}
          subtext="Requires Attention"
          icon={AlertTriangle}
          colorClass={{
            text: "text-amber-600 dark:text-amber-400",
            bg: "bg-amber-50 dark:bg-amber-900/30",
            icon: "text-amber-600 dark:text-amber-400",
          }}
          loading={loading}
        />
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* ================= MACHINE TABLE ================= */}
        <Card
          className="lg:col-span-2 flex flex-col min-h-0 p-0 shadow-lg border-0 relative"
          noPadding
        >
          <MachineTable
            data={machineData}
            loading={loading}
            onExport={exportToCSV}
            refreshRate={settings.refreshRate}
          />

          {/* ⭐ No data overlay (header untouched) */}
          {noMachineData && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <Activity className="mx-auto mb-2 text-gray-400" size={36} />
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                  No machine data available
                </p>
              </div>
            </div>
          )}
        </Card>

        {/* ================= RIGHT COLUMN ================= */}
        <div className="flex flex-col gap-4 min-h-0">
          {/* ================= OEE ================= */}
          <Card className="h-44 shrink-0 flex flex-col shadow-md">
            <CardHeader title="OEE Metrics" icon={TrendingUp} />
            <div className="flex-1 grid grid-cols-3 gap-2 px-2 pb-2">
              <OEEGauge
                value={Number(kpiData?.oee?.availability) || 0} // ⭐
                title="Availability"
                color={getPrimaryColor()}
                isDark={isDark}
              />
              <OEEGauge
                value={Number(kpiData?.oee?.performance) || 0} // ⭐
                title="Performance"
                color="#10b981"
                isDark={isDark}
              />
              <OEEGauge
                value={Number(kpiData?.oee?.quality) || 0} // ⭐
                title="Quality"
                color="#8b5cf6"
                isDark={isDark}
              />
            </div>
          </Card>

          {/* ================= BOTTLENECKS ================= */}
          <Card className="flex-1 shrink-0 flex flex-col shadow-md" noPadding>
            <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/50">
              <h2 className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Breakdown
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-full border border-purple-100 dark:border-purple-800/50">
                <Sparkles size={10} /> AI Insight
              </span>
            </div>

            <div className="flex-1 overflow-auto p-3 space-y-2 custom-scrollbar">
              {loading ? (
                <>
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </>
              ) : bottlenecks.length === 0 ? (
                <p className="text-xs text-gray-500 text-center">
                  No Breakdown detected
                </p>
              ) : (
                bottlenecks.slice(0, 10).map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm"
                  >
                    <div>
                      <p className="font-bold text-xs">{item.machine}</p>
                      <p className="text-[10px] text-red-500">
                        {item.reason}
                      </p>
                    </div>
                    <span className="text-xs font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-700">
                      {item.duration}
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
