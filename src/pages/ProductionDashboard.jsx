import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Activity, Sparkles, TrendingUp } from 'lucide-react';
import OEEGauge from '../components/charts/OEEGauge';
import HourlyProductionChart from '../components/charts/HourlyProductionChart';
// import * as mockAPI from '../services/mockData';
// import * as mockAPI from '../services/mockData';
import * as dashboardAPI from '../services/dashboardApi';

import { useSettings } from '../context/SettingsContext';
import { Card, CardHeader } from '../components/ui/Card';
import { StatCard } from '../components/dashboard/StatCard';
import { MachineTable } from '../components/dashboard/MachineTable';
import { Skeleton } from '../components/ui/Skeleton';

export default function ProductionDashboard() {
  const { settings } = useSettings();
  const [loading, setLoading] = useState(true);
  const [kpiData, setKpiData] = useState(null);
  const [machineData, setMachineData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [bottlenecks, setBottlenecks] = useState([]);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => setIsDark(document.documentElement.classList.contains('dark'));
    checkTheme();
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

const fetchData = async () => {
  try {
    setLoading(true);

    // Fetch both machines and KPI from the API
  const [{ machines, kpi }, bottlenecksData] = await Promise.all([
      dashboardAPI.fetchMachineStatus(),
      dashboardAPI.fetchBottlenecks()
    ]);

    // Update state
    setMachineData(machines);
    setKpiData(kpi);
    setBottlenecks(bottlenecksData);

  } catch (err) {
    console.error("Error fetching machine status:", err);
  } finally {
    setLoading(false);
  }
};




  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, (settings.refreshRate || 10) * 1000); 
    return () => clearInterval(interval);
  }, [settings.refreshRate]);

  const exportToCSV = () => {
    const headers = ["Machine", "Status", "Order", "Produced", "Targets", "Rejects"];
    const rows = machineData.map(m => [m.name, m.status, m.currentOrder, m.produced, m.targets, m.rejects]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "production_data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPrimaryColor = () => {
    if (settings.colorTheme === 'teal') return '#0d9488';
    return '#3b82f6';
  };

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 shrink-0">
        <StatCard 
          title="Total Output" 
          value={Number(kpiData?.totalProduced) || 0}
  subtext={`Target: ${Number(kpiData?.target) || 0}`}

          icon={CheckCircle} 
          colorClass={{ text: "text-gray-800 dark:text-white", bg: "bg-primary-50 dark:bg-primary-900/30", icon: "text-primary-600 dark:text-primary-400" }}
          loading={loading}
        />
<StatCard 
  title="Rejects (NG)" 
  value={Number(kpiData?.totalRejects) || 0}
  subtext={`Rate: ${
    kpiData?.totalProduced > 0
      ? ((Number(kpiData.totalRejects) || 0) / Number(kpiData.totalProduced) * 100).toFixed(2)
      : 0
  }%`}
  icon={XCircle} 
  colorClass={{
    text: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-900/30",
    icon: "text-red-600 dark:text-red-400"
  }}
  loading={loading}
/>

        <StatCard 
          title="Active Machines" 
          value={machineData.filter(m => m.status === 'A').length} 
          subtext={`Total: ${machineData.length}`} 
          icon={Activity} 
          colorClass={{ text: "text-gray-800 dark:text-white", bg: "bg-green-50 dark:bg-green-900/30", icon: "text-green-600 dark:text-green-400" }}
          loading={loading}
        />
        <StatCard 
          title="Bottlenecks" 
          value={bottlenecks.length} 
          subtext="Requires Attention" 
          icon={AlertTriangle} 
          colorClass={{ text: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-900/30", icon: "text-amber-600 dark:text-amber-400" }}
          loading={loading}
        />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Left Column: Machine Status (Expanded) */}
        <Card className="lg:col-span-2 flex flex-col min-h-0 p-0 shadow-lg border-0" noPadding>
     <MachineTable 
data={machineData}
  loading={loading} 
  onExport={exportToCSV} 
  refreshRate={settings.refreshRate} 
/>

        </Card>

        {/* Right Column: OEE & Charts */}
        <div className="flex flex-col gap-4 min-h-0">
          
          {/* OEE Section - Redesigned */}
          <Card className="h-44 shrink-0 flex flex-col shadow-md">
            <CardHeader title="OEE Metrics" icon={TrendingUp} className="mb-0 px-4 pt-3" />
            <div className="flex-1 grid grid-cols-3 gap-2 px-2 pb-2">
              {loading ? (
                 [1,2,3].map(i => <div key={i} className="flex items-center justify-center"><div className="w-16 h-16 rounded-full border-4 border-gray-100 dark:border-gray-800 animate-pulse" /></div>)
              ) : (
                <>
                  <OEEGauge value={kpiData?.oee.availability} title="Availability" color={getPrimaryColor()} isDark={isDark} />
                  <OEEGauge value={kpiData?.oee.performance} title="Performance" color="#10b981" isDark={isDark} />
                  <OEEGauge value={kpiData?.oee.quality} title="Quality" color="#8b5cf6" isDark={isDark} />
                </>
              )}
            </div>
          </Card>

          {/* Hourly Chart */}
          {/* <Card className="flex-1 min-h-0 flex flex-col shadow-md">
            <CardHeader title="Hourly Production" className="px-4 pt-3" />
            <div className="flex-1 min-h-0 w-full px-2 pb-2">
              {loading ? <Skeleton className="w-full h-full" /> : <HourlyProductionChart data={hourlyData} isDark={isDark} />}
            </div>
          </Card> */}

          {/* Bottlenecks & AI Insights */}
          <Card className="flex-1 shrink-0 flex flex-col shadow-md" noPadding>

             <div className="p-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0 bg-gray-50/50 dark:bg-gray-800/50">
               <h2 className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <AlertTriangle size={14} /> Bottlenecks
              </h2>
              <span className="flex items-center gap-1 text-[10px] font-bold text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20 px-2 py-0.5 rounded-full border border-purple-100 dark:border-purple-800/50">
                <Sparkles size={10} /> AI Insight
              </span>
             </div>
            
            <div className="flex-1 overflow-auto p-3 space-y-2 custom-scrollbar">
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-10 w-full" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ) : (
                <>
                  <div className="p-2.5 bg-gradient-to-r from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-800 rounded-lg border border-purple-100 dark:border-purple-800/50 shadow-sm">
                    <p className="text-[10px] text-purple-700 dark:text-purple-300 font-bold flex items-center gap-1.5">
                      <Sparkles size={12} /> Anomaly Detected
                    </p>
                    <p className="text-[10px] text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">High vibration pattern detected on ASSY-04 motor. Recommended inspection within 4 hours.</p>
                  </div>

                 {bottlenecks.slice(0, 10).map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 bg-white dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 dark:text-gray-200 text-xs truncate">{item.machine}</p>
                        <p className="text-[10px] text-red-500 truncate mt-0.5">{item.reason}</p>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <span className="block text-xs font-bold text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-1.5 py-0.5 rounded">{item.duration}</span>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}
