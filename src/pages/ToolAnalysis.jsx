import React from "react";
import { Card, CardHeader } from "../components/ui/Card";
import { Wrench, AlertTriangle, Activity, Gauge } from "lucide-react";

import { StatCard } from "../components/dashboard/StatCard";

import IndividualToolWearHorizontal from "../components/charts/IndividualToolWearHorizontal";
import ToolWearSpindleChart from "../components/charts/ToolWearSpindleChart";
import RULDistributionChart from "../components/charts/RULDistributionChart";
import RecentToolReplacements from "../components/tables/RecentToolReplacements";
import CriticalAlerts from "../components/charts/CriticalAlerts";

export default function ToolAnalysis() {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-4 overflow-y-auto">

      {/* ================= TOP STAT CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="min-h-[96px]">
          <StatCard
            title="Active Tools"
            value="128"
            subtext="In production"
            icon={Wrench}
            iconBg="bg-blue-100 text-blue-600"
          />
        </Card>

        <Card className="min-h-[96px]">
          <StatCard
            title="Critical Tools"
            value="7"
            subtext="Immediate attention"
            icon={AlertTriangle}
            iconBg="bg-red-100 text-red-600"
          />
        </Card>

        <Card className="min-h-[96px]">
          <StatCard
            title="Avg Tool Wear"
            value="62%"
            subtext="Across all machines"
            icon={Activity}
            iconBg="bg-orange-100 text-orange-600"
          />
        </Card>

        <Card className="min-h-[96px]">
          <StatCard
            title="Avg RUL"
            value="41 hrs"
            subtext="Remaining life"
            icon={Gauge}
            iconBg="bg-emerald-100 text-emerald-600"
          />
        </Card>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col">
            <CardHeader title="Individual Tool Wear" />
            <div className="flex-1 min-h-[260px]">
              <IndividualToolWearHorizontal />
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader title="Remaining Useful Life (RUL)" />
            <div className="flex-1 min-h-[240px]">
              <RULDistributionChart />
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <Card className="flex flex-col">
            <CardHeader title="Tool Wear Rate & Spindle Load (Last 24h)" />
            <div className="flex-1 min-h-[300px]">
              <ToolWearSpindleChart />
            </div>
          </Card>

          <Card className="flex flex-col">
            <CardHeader title="Critical Alerts" />
            <div className="flex-1 min-h-[220px]">
              <CriticalAlerts />
            </div>
          </Card>
        </div>
      </div>

      {/* ================= BOTTOM TABLE ================= */}
      <Card className="flex flex-col flex-1 min-h-[300px]">
        <CardHeader title="Recent Tool Replacements" />
        {/* Make table scrollable */}
        <div className="flex-1 overflow-auto">
          <RecentToolReplacements />
        </div>
      </Card>

    </div>
  );
}
