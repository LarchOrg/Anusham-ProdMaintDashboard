
import React,{ useEffect, useState } from "react";
import { Card, CardHeader } from "../components/ui/Card";
import { Skeleton } from "../components/ui/Skeleton";
import DefectRateChart from "../components/charts/DefectRateChart";
import ScrapRateChart from "../components/charts/ScrapRateChart2";
import ReworkRateChart from "../components/charts/ReworkRateChart";
import CustomerComplaintChart from "../components/charts/CustomerComplaintChart";
import CustomerReturnChart from "../components/charts/CustomerReturnChart";
import YieldRateChart from "../components/charts/YieldRateChart";
import ProductAuditClosureChart from "../components/charts/ProductAuditClosureChart";
import ProcessAuditClosureChart from "../components/charts/ProcessAuditClosureChart";
import QualityKPICards from "../components/charts/QualityKPICards";

import { fetchDefectRateChart,fetchScrapRateChart,fetchReworkRateChart,fetchCustomerComplaintCharts,fetchCustomerReturnChart,fetchYieldRateChart,fetchProductAuditChart,fetchProcessAuditChart,fetchQualityKPIs     } from "../services/dashboardApi";

const QualityKpi = () => {
  const [defectRate, setDefectRate] = useState([]);
  const [scrapRate, setScrapRate] = useState([]);
  const [reworkRate, setReworkRate] = useState([]);
  const [customerComplaintData, setCustomerComplaintData] = useState([]);
  const [customerReturnData, setCustomerReturnData] = useState([]);
  const [yieldRateData, setYieldRateData] = useState([]);
  const [productAuditData, setProductAuditData] = useState([]);
  const [processAuditData, setProcessAuditData] = useState([]);
  const [qualityKpis, setQualityKpis] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  let intervalId;

  const loadData = async () => {
    try {
      setLoading(true);

      const [
        defect,
        scrap,
        rework,
        complaint,
        customerReturn,
        yieldData,
        productAudit,
        processAudit,
        kpiCards
      ] = await Promise.all([
        fetchDefectRateChart(),
        fetchScrapRateChart(),
        fetchReworkRateChart(),
        fetchCustomerComplaintCharts(),
        fetchCustomerReturnChart(),
        fetchYieldRateChart(),
        fetchProductAuditChart(),
        fetchProcessAuditChart(),
        fetchQualityKPIs()
      ]);

      setDefectRate(defect);
      setScrapRate(scrap);
      setReworkRate(rework);
      setCustomerComplaintData(complaint);
      setCustomerReturnData(customerReturn);
      setYieldRateData(yieldData);
      setProductAuditData(productAudit);
      setProcessAuditData(processAudit);
      setQualityKpis(kpiCards);

    } catch (err) {
      console.error("❌ Quality KPI error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 initial load
  loadData();

  //auto refresh 
  intervalId = setInterval(() => {
    loadData();
  }, 60000); 

  
  return () => {
    clearInterval(intervalId);
  };
}, []);


  // if (loading) {
  //   return (
  //     <div className="p-4 text-sm text-muted-foreground">
  //       Loading quality KPIs...
  //     </div>
  //   );
  // }
  return (

    <div className="h-full w-full overflow-y-auto p-2 space-y-2">

      {/* ===== ROW 1 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Defect Rate (%)" />
          <div className="flex-1 min-h-[220px]">
              {loading ? <Skeleton className="h-full" />: <DefectRateChart data={defectRate} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Scrap Rate " />
          <div className="flex-1 min-h-[220px]">
         {loading ? <Skeleton className="h-full" />:  <ScrapRateChart data={scrapRate} />}

          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Rework Rate (%)" />
          <div className="flex-1 min-h-[230px]">
          {loading ? <Skeleton className="h-full" />:  <ReworkRateChart data={reworkRate} />}

          </div>
        </Card>
      </div>

      {/* ===== ROW 2 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Customer Complaint Rate" />
          <div className="flex-1 min-h-[220px]">
             {loading ? <Skeleton className="h-full" />: <CustomerComplaintChart data={customerComplaintData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Customer Return Rate (%)" />
          <div className="flex-1 min-h-[220px]">
            {loading ? <Skeleton className="h-full" />: <CustomerReturnChart data={customerReturnData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Yield Rate (%)" />
          <div className="flex-1 min-h-[220px]">
            {loading ? <Skeleton className="h-full" />:  <YieldRateChart data={yieldRateData} />}
          </div>
        </Card>
      </div>

      {/* ===== ROW 3 ===== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2">
        <Card className="flex flex-col">
          <CardHeader title="Product Audit Closure (Days)" />
          <div className="flex-1 min-h-[250px]">
                {loading ? <Skeleton className="h-full" />:  <ProductAuditClosureChart data={productAuditData} />}
          </div>
        </Card>

        <Card className="flex flex-col">
          <CardHeader title="Process Audit Closure (Days)" />
          <div className="flex-1 min-h-[250px]">
           {loading ? <Skeleton className="h-full" />:  <ProcessAuditClosureChart data={processAuditData} />}

          </div>
        </Card>

        {/* KPI cards usually fixed height */}
       <Card className="flex flex-col">
  <CardHeader title="Quality KPI Summary" />

  <div className="flex-1 min-h-[250px]">
    {loading ? (
      <Skeleton className="h-full w-full" />
    ) : !qualityKpis ? (
      <div
        className="w-full h-full flex items-center justify-center text-[14px] font-medium tracking-wide rounded-md
        bg-[#f0f0f0] text-black
        dark:bg-gray-800 dark:text-gray-200"
      >
        No Data Available
      </div>
    ) : (
      <QualityKPICards data={qualityKpis} />
    )}
  </div>
</Card>

      </div>

    </div>
  );
};

export default QualityKpi;
