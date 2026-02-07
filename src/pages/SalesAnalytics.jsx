import React, { useEffect, useState } from "react";
import { BarChart3, TrendingUp, Users, UserCheck, Package } from "lucide-react";

import { Card, CardHeader } from "../components/ui/Card";
import MonthlySalesTrend from "../components/charts/MonthlySalesTrend";
import MonthlyPerformance from "../components/charts/MonthlyPerformance";
import TopCustomersChart from "../components/charts/TopCustomersChart";
import TopSalespersonsChart from "../components/charts/TopSalespersonsChart";
import TopItemsChart from "../components/charts/TopItemsChart";

import { fetchMonthlySales,fetchMonthlyPerformance,fetchTopCustomers,fetchTopSalespersons,fetchTopItems} from "../services/dashboardApi";

export default function SalesAnalytics() {
  const [monthlySales, setMonthlySales] = useState([]);
  const [monthlyPerformance, setMonthlyPerformance] = useState([]);
const [topCustomers, setTopCustomers] = useState([]);
const [topSalespersons, setTopSalespersons] = useState([]);
const [topItems, setTopItems] = useState([]);

  const [loading, setLoading] = useState(true);
useEffect(() => {
   let intervalId;
  const loadData = async () => {
    try {
      setLoading(true);

      const [
        sales,
        performance,
        customers,
        salespersons,
        items
      ] = await Promise.all([
        fetchMonthlySales(),
        fetchMonthlyPerformance(),
        fetchTopCustomers(),
        fetchTopSalespersons(),
         fetchTopItems()
      ]);

      setMonthlySales(sales);
      setMonthlyPerformance(performance);
      setTopCustomers(customers);
      setTopSalespersons(salespersons);
      setTopItems(items);
    } catch (err) {
      console.error("Sales analytics error:", err);
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


  if (loading) {
    return <div className="p-4 text-sm">Loading sales analytics...</div>;
  }

  return (
    <div className="h-full flex flex-col gap-4">

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-[2] min-h-0">
        <Card className="flex flex-col">
          <CardHeader title="Monthly Sales Trend" icon={TrendingUp} />
          <div className="flex-1 min-h-0 relative">
            <MonthlySalesTrend data={monthlySales} />
          </div>
        </Card>

       <Card className="flex flex-col">
  <CardHeader title="Monthly Performance" icon={BarChart3} />
  <div className="flex-1 min-h-0">
    <MonthlyPerformance data={monthlyPerformance} />
  </div>
</Card>

      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 flex-[2] min-h-0">
<Card className="flex flex-col overflow-hidden">
  <CardHeader title="Top 5 Customers by Sales" icon={Users} />
  <div className="flex-1 min-h-0">
    <TopCustomersChart data={topCustomers} />
  </div>
</Card>


        <Card className="flex flex-col overflow-hidden">
          <CardHeader title="Top 5 Salespersons by Sales" icon={UserCheck} />
          <div className="flex-1 min-h-0">
           <TopSalespersonsChart data={topSalespersons} />

          </div>
        </Card>

        <Card className="flex flex-col overflow-hidden">
          <CardHeader title="Top 5 Items by Sales" icon={Package} />
          <div className="flex-1 min-h-0">
           
            <TopItemsChart data={topItems} />

          </div>
        </Card>
      </div>

    </div>
  );
}
