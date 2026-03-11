
import { Card, CardHeader } from "../components/ui/Card";
import { StatCard } from "../components/dashboard/StatCard";
import { Skeleton } from "../components/ui/Skeleton";
import { IndianRupee , Boxes } from "lucide-react";
import React, { useState, useEffect } from "react";
import InventoryValueTrendChart from "../components/charts/InventoryValueTrendChart";
import TurnoverDaysChart from "../components/charts/TurnoverDaysChart";
import TopItemsValueChart from "../components/charts/TopItemsValueChart";
import TopItemsQuantityChart from "../components/charts/TopItemsQuantityChart";
import InventoryMovementChart from "../components/charts/InventoryMovementChart";
import InventorySalesChart from "../components/charts/InventorySalesChart";
import RatioGauge from "../components/charts/RatioGauge";
import { fetchInventoryValueKPI,fetchInventoryValueOverTime,fetchTurnOverDays,
  fetchInventoryMovement,fetchInventorySales,fetchTop10ItemBasedValue,fetchTop10ItemBasedQuantity} from "../services/dashboardApi";
export default function InventoryKpi() {
const [inventoryValueKpi, setInventoryValueKpi] = useState([]);
const [inventoryValueOverTime, setInventoryValueOverTime] = useState([]);
  const [turnoverDays, setTurnoverDays] = useState([]);
const [inventoryMovement, setInventoryMovement] = useState([]);
const [inventorySales, setInventorySales] = useState([]);
const [top10Items, setTop10Items] = useState([]);
const [top10Quantity, setTop10Quantity] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
     let intervalId;
    const loadData = async () => {
      try {
        setLoading(true);
  
        const [
         inventoryKpi,
         inventoryOverTime,
          turnoverDays,
          inventoryMovementData,
          inventorySalesData,
          top10ItemsData,
          top10QuantityData
        ] = await Promise.all([
       fetchInventoryValueKPI(),
       fetchInventoryValueOverTime(),
        fetchTurnOverDays(),
        fetchInventoryMovement(),
        fetchInventorySales(),
        fetchTop10ItemBasedValue(),
        fetchTop10ItemBasedQuantity()
        ]);

          setInventoryValueKpi(inventoryKpi);
          setInventoryValueOverTime(inventoryOverTime);
          setTurnoverDays(turnoverDays);
          setInventoryMovement(inventoryMovementData);
          setInventorySales(inventorySalesData);
          setTop10Items(top10ItemsData);
          setTop10Quantity(top10QuantityData);
      } catch (err) {
        console.error("Inventory Kpi error:", err);
      } finally {
        setLoading(false);
      }
    };
loadData();
    intervalId = setInterval(() => {
    loadData();
  }, 60000); // 60 seconds

  // 🧹 cleanup on unmount
  return () => {
    clearInterval(intervalId);
  };
}, []);

  const [topItemView, setTopItemView] = useState("value"); // 👈 NEW

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-4 p-4">

     {/* ================= KPI CARDS ================= */}
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

  <Card className="h-28">
  <StatCard
    title="Inventory Value"
    value={inventoryValueKpi?.inventoryValues?.toLocaleString()}
    // value="20,068,577"
    // subtext="Change: +1,076,296"
    icon={IndianRupee }
    loading={loading}
    colorClass={{
      bg: "bg-emerald-100 dark:bg-emerald-900/30",
      text: "text-emerald-700 dark:text-emerald-400",
      icon: "text-emerald-700"
    }}
  />
</Card>


 <Card className="h-28">
  <StatCard
    title="Stock Available"
    value={inventoryValueKpi?.stockAvailable?.toLocaleString()}
    // subtext="Change: +58,778"
    icon={Boxes}
    loading={loading}
    colorClass={{
      bg: "bg-indigo-100 dark:bg-indigo-900/30",
      text: "text-indigo-700 dark:text-indigo-400",
      icon: "text-indigo-700"
    }}
  />
</Card>


<Card className="h-28 flex items-center justify-center">
  <RatioGauge
    title="Turnover Ratio"
    value={inventoryValueKpi?.turnoverRatio}
    max={50}
    color="#22c55e"   // green – good turnover
  />
</Card>

<Card className="h-28 flex items-center justify-center">
  <RatioGauge
    title="Inventory to Sales Ratio"
    value={inventoryValueKpi?.inventoryToSalesRatio}
    max={5}
    color="#3b82f6"   // blue – neutral ratio
  />
</Card>

<Card className="h-28 flex items-center justify-center">
  <RatioGauge
    title="Avg Inventory Days"
    value={inventoryValueKpi?.avgInventoryDays}
    max={90}
    color="#f59e0b"   // amber – warning-style metric
  />
</Card>


</div>


      {/* ================= MAIN CHART GRID ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* ===== LEFT COLUMN ===== */}
        <div className="flex flex-col gap-4">
    <Card className="flex flex-col">
   <CardHeader title="Inventory Value Over Time" />
   <div className="min-h-[260px]">
    {loading ? (<Skeleton className="h-full w-full" />) : (<InventoryValueTrendChart data={inventoryValueOverTime} />)}
  </div>
   </Card>

          <Card>
            <CardHeader title="Inventory Movement" />
             <div className="min-h-[260px]">
             {loading ? <Skeleton className="h-full" />:<InventoryMovementChart data={inventoryMovement} />}
            </div>
          </Card>
        </div>

        {/* ===== MIDDLE COLUMN ===== */}
        <div className="flex flex-col gap-4">
          <Card>
            <CardHeader title="Turnover (Days) by Month" />
             <div className="min-h-[260px]">
             {loading ? <Skeleton className="h-full" />:<TurnoverDaysChart data={turnoverDays} />}
            </div>
          </Card>

          <Card>
            <CardHeader title="Inventory to Sales Analysis" />
            <div className="min-h-[260px]">
             {loading ? <Skeleton className="h-full" />:<InventorySalesChart data={inventorySales}/>}
            </div>
          </Card>
        </div>

        {/* ===== RIGHT COLUMN ===== */}
        {/* ===== RIGHT COLUMN ===== */}
<Card className="h-full flex flex-col">
  <CardHeader
    title={
      topItemView === "value"
        ? "Top 10 Items Based on Value"
        : "Top 10 Items Based on Quantity"
    }
  />

  {/* Chart */}
  <div className="flex-1 px-4">
    {/* 👇 slightly reduced height */}
    <div className="h-[450px]">
      {loading ? (
        <Skeleton className="h-full w-full" />
      ) : topItemView === "value" ? (
        <TopItemsValueChart data={top10Items} />
      ) : (
        <TopItemsQuantityChart data={top10Quantity} />
      )}
    </div>
  </div>

  {/* Buttons */}
  <div className="flex justify-center gap-4 pb-4">
    <button
      onClick={() => setTopItemView("value")}
      className={`px-5 py-2 text-sm font-medium rounded-lg transition
        ${
          topItemView === "value"
            ? "bg-green-500 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      Value
    </button>

    <button
      onClick={() => setTopItemView("quantity")}
      className={`px-5 py-2 text-sm font-medium rounded-lg transition
        ${
          topItemView === "quantity"
            ? "bg-green-500 text-white shadow"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        }`}
    >
      Quantity
    </button>
  </div>
</Card>


      </div>
    </div>
  );
}
