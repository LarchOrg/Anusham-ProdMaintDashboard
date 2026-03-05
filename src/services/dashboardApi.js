// src/services/dashboardApi.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://anushamapi.larcherp.com/api",
  headers: {
    "Content-Type": "application/json"
  }
});

// Fetch Production / Machine Status
export const fetchMachineStatus = async () => {
  try {
    const res = await axios.get(`${api.defaults.baseURL}/production`);

    const machines = (res.data?.machines || []).map(m => ({
      id: m.id,
      name: m.name,
      status: m.status,
      currentOrder: m.currentOrder,
      operator: m.operator,

      // 🔥 Normalized fields
      produced: Number(m.produced ?? 0),
      rejects: Number(m.rejects ?? 0),
      target: Number(m.targets ?? 0),   // frontend standard
      targets: Number(m.targets ?? 0)   // keep original if needed
    }));

    return {
      machines,
      kpi: res.data?.kpi || null
    };

  } catch (error) {
    console.error("❌ fetchMachineStatus failed:", error);
    return {
      machines: [],
      kpi: null
    };
  }
};

// Fetch Breakdown Data
export const fetchBottlenecks = async () => {
  try {
    const res = await api.get("/breakdown");

    // IMPORTANT: API returns { data: [...] }
    return Array.isArray(res.data?.data) ? res.data.data : [];

  } catch (err) {
    console.error("Error fetching bottlenecks:", err);
    return [];
  }
};

export const fetchOEEChart = async () => {
  try {
    const res = await api.get("/chart/oee");

    // Map API response to chart format
    return (res.data || []).map((item) => ({
      month: item.monthYear,
      value: Number(item.percentage.replace("%", "")),
    }));
  } catch (err) {
    console.error("❌ fetchOEEChart failed:", err);
    return [];
  }
};

// Fetch FPY Chart
export const fetchFPYChart = async () => {
  try {
    const res = await api.get("/chart/fpy");

    // Map API response to chart format
    return (res.data || []).map((item) => ({
      month: item.monthYear.split("-")[0],      // "Feb-25" → "Feb"
      value: Number(item.percentage.replace("%", "")), // "78%" → 78
    }));
  } catch (err) {
    console.error("❌ fetchFPYChart failed:", err);
    return [];
  }
};

// Fetch Scrap Rate Chart
export const fetchScrapChart = async () => {
  try {
    const res = await api.get("/chart/ScrapReject");

    // Map API response to chart format
    return (res.data || []).map((item) => ({
      month: item.monthYear.split("-")[0],           // "Feb-25" → "Feb"
      value: Number(item.percentage.replace("%", "")), // "1.2%" → 1.2
    }));
  } catch (err) {
    console.error("❌ fetchScrapChart failed:", err);
    return [];
  }
};

// Fetch LTIR Chart
export const fetchLTIRChart = async () => {
  try {
    const res = await api.get("/chart/Ltir");

    // Map API response to chart format
    return (res.data || []).map((item) => ({
      month: item.monthYear,                      // keep "Feb-25" for tooltip
      value: Number(item.percentage.replace("%", "")), // "2.3%" → 2.3
    }));
  } catch (err) {
    console.error("❌ fetchLTIRChart failed:", err);
    return [];
  }
};

// Fetch Production Output Chart
export const fetchProductionChart = async () => {
  try {
    const res = await api.get("/chart/ProductionOutput");

    return (res.data || []).map((item) => ({
      month: item.monthYear.split("-")[0],  // "Feb-25" → "Feb"
      value: Number(item.percentage),       // "110" → 110
    }));
  } catch (err) {
    console.error("❌ fetchProductionChart failed:", err);
    return [];
  }
};
//customer complaints
export const fetchCustomerComplaintsChart = async () => {
  try {
    const res = await api.get("/chart/CustomerComplain");

    return (res.data || []).map((item) => {
      const [month, year] = item.monthYear.split("-");
      return {
        month,
        year,
        fullMonth: item.monthYear,
        value: Number(item.percentage.replace("%", "")),
      };
    });
  } catch (err) {
    console.error("❌ fetchCustomerComplaintsChart failed:", err);
    return [];
  }
};

// Completed vs Scheduled Maintenance
export const fetchCompletedVsScheduled = async () => {
  try {
    const res = await api.get("/Breakdown/CompletedvsScheduled");

    const item = res.data?.[0];
    if (!item) return null;

    return {
      totalPlans: Number(item.totalPMPlans),
      chartData: [
        { name: "Completed", value: Number(item.completed) },
        { name: "Pending", value: Number(item.pending) },
        { name: "Initiated", value: Number(item.initiated) }
      ]
    };
  } catch (err) {
    console.error("❌ fetchCompletedVsScheduled failed:", err);
    return null;
  }
};

// 🔷 Maintenance Cost
export const fetchMaintenanceCost = async () => {
  try {
    const res = await api.get("/Breakdown/MaintenanceCost");

    return res.data.map((item) => {
      const [month, year] = item.monthYear.split("-");

      return {
        month,                 // Feb
        year,                  // 25 / 26
        maintenanceCost: Number(item.percentage),
        budgetCost: 250000,
      };
    });
  } catch (err) {
    console.error("❌ Maintenance cost API failed:", err);
    return [];
  }
};

// Fetch PM vs BM Manhour Chart
export const fetchPMBMChart = async () => {
  try {
    const res = await api.get("/Breakdown/PMandBMChart");

    // Map API response to chart-friendly format
    return (res.data || []).map((item) => {
      const [month, year] = item.monthYear.split("-");
      return {
        month,           // "Feb"
        year,            // "25"
        pmHours: Number(item.pmValue),
        bmHours: Number(item.bmValue),
      };
    });
  } catch (err) {
    console.error("❌ fetchPMBMChart failed:", err);
    return [];
  }
};

// 🔷 Power Cost Chart
export const fetchPowerCostChart = async () => {
  try {
    const res = await api.get("/Breakdown/PowerCost");

    return (res.data || []).map((item) => {
      const [month, year] = item.monthYear.split("-");

      return {
        month,                 // Feb
        year,                  // 25
        powerCost: Number(item.percentage) // 245000
      };
    });
  } catch (err) {
    console.error("❌ fetchPowerCostChart failed:", err);
    return [];
  }
};
// 🔵 Downtime Contribution (Pie Chart)
export const fetchDowntimeContribution = async () => {
  try {
    const res = await api.get("/Breakdown/DowntimeContribution");

    return (res.data || []).map(item => ({
      name: item.breakdownType,
      value: Number(item.contributionPercent.replace("%", "")),
    }));
  } catch (err) {
    console.error("❌ fetchDowntimeContribution failed:", err);
    return [];
  }
};

// 🔴 Failure Status (Bar Chart)
export const fetchFailureStatus = async () => {
  try {
    const res = await api.get("/Breakdown/FailureStatus");

    return (res.data || []).map(item => {
      const [month, year] = item.monthYear.split("-");

      return {
        month,                 // "Feb"
        // year: `20${year}`,     // "2025"
        year,
        count: Number(item.percentage),
      };
    });
  } catch (err) {
    console.error("❌ fetchFailureStatus failed:", err);
    return [];
  }
};

// Completed vs Scheduled Maintenance Chart
export const fetchCompletedVsScheduledBar = async () => {
  try {
    const res = await api.get("/Breakdown/CompletedStatus"); // your endpoint

    // API returns an array of { pmFreq, scheduled, completed }
    if (!Array.isArray(res.data)) return [];

    return res.data.map(item => ({
      pmFreq: item.pmFreq,
      scheduled: Number(item.scheduled),
      completed: Number(item.completed),
    }));
  } catch (err) {
    console.error("❌ fetchCompletedVsScheduledBar failed:", err);
    return [];
  }
};

// 🔷 Breakdown Monthly MTTR / MTBF Table
export const fetchMttrMtbfTable = async () => {
  try {
    const res = await api.get("/Breakdown/MttrMtbf");

    // API returns array directly
    return Array.isArray(res.data) ? res.data : [];

  } catch (err) {
    console.error("❌ fetchMttrMtbfTable failed:", err);
    return [];
  }
};

// 🔴 Breakdown Hours Chart
export const fetchBreakdownHrsChart = async () => {
  try {
    const res = await api.get("/Breakdown/BreakDownHrs");

    return (res.data || []).map(item => ({
      month: item.monthYear,
      breakdownHrs: Number(item.percentage)
    }));

  } catch (err) {
    console.error("❌ fetchBreakdownHrsChart failed:", err);
    return [];
  }
};

// 🔵 Actual MTTR Chart
export const fetchActualMTTRChart = async () => {
  try {
    const res = await api.get("/Breakdown/ActualMttrHrs");

    return (res.data || []).map(item => ({
      month: item.monthYear,                 // "Jan-25"
      actualMTTR: Number(item.percentage),   // 0.65
    }));
  } catch (err) {
    console.error("❌ fetchActualMTTRChart failed:", err);
    return [];
  }
};

// 🟢 Actual MTBF Chart
export const fetchActualMTBFChart = async () => {
  try {
    const res = await api.get("/Breakdown/ActualMtbfHrs");

    return (res.data || []).map(item => ({
      month: item.monthYear,
      actualMTBF: Number(item.percentage),
    }));
  } catch (err) {
    console.error("❌ fetchActualMTBFChart failed:", err);
    return [];
  }
};

// 🔷 Monthly Sales Trend
export const fetchMonthlySales = async () => {
  try {
    const res = await api.get("/Sales/MonthlySales");

    return (res.data || []).map(item => ({
      month: item.monthYear,          // "Jan-25"
      sales: Number(item.percentage), // "3.2" → 3.2
    }));
  } catch (err) {
    console.error("❌ fetchMonthlySales failed:", err);
    return [];
  }
};

// 🔷 Monthly Performance (Sales + Profit)
export const fetchMonthlyPerformance = async () => {
  try {
    const res = await api.get("/Sales/MonthlyPerformance");

    return (res.data || []).map(item => ({
      month: item.monthYear,             // "Jan-25"
      sales: Number(item.sales),          // "4.2" → 4.2
      profit: Number(item.profit),        // "1.1" → 1.1
      overallProfit: Number(item.overallProfit) // 19.8
    }));
  } catch (err) {
    console.error("❌ fetchMonthlyPerformance failed:", err);
    return [];
  }
};

// 🔷 Top Customers Chart
export const fetchTopCustomers = async () => {
  try {
    const res = await api.get("/Sales/TopCustomer");

    return (res.data || []).map(item => ({
      name: item.companyName,       // Y-axis
      value: Number(item.sales),    // Bar value
    }));

  } catch (err) {
    console.error("❌ fetchTopCustomers failed:", err);
    return [];
  }
};

// 🔷 Top Salespersons Chart
export const fetchTopSalespersons = async () => {
  try {
    const res = await api.get("/Sales/TopSalesPerson");

    return (res.data || []).map(item => ({
      name: item.salesPersonName,
      value: Number(item.sales),
    }));
  } catch (err) {
    console.error("❌ fetchTopSalespersons failed:", err);
    return [];
  }
};

// 🔷 Top Items by Sales
export const fetchTopItems = async () => {
  try {
    const res = await api.get("/Sales/TopItemName");

    return (res.data || []).map(item => ({
      name: item.itemName,
      value: Number(item.sales),
    }));
  } catch (err) {
    console.error("❌ fetchTopItems failed:", err);
    return [];
  }
};

// 🔷 Defect Rate Chart
export const fetchDefectRateChart = async () => {
  try {
    const res = await api.get("/Quality/DefectRate");

    return (res.data || []).map(item => ({
      month: item.monthYear,           // "Apr-25"
      value: Number(item.percentage),  // "5" → 5
    }));
  } catch (err) {
    console.error("❌ fetchDefectRateChart failed:", err);
    return [];
  }
};

// Scrap Rate Chart
export const fetchScrapRateChart = async () => {
  try{
  const res = await api.get("/Quality/ScrapRate");

  return (res.data || []).map(item => ({
    month: item.monthYear,                 // "Apr-25"
    value: Number(item.percentage),         // "3" → 3
  }));
}catch(err){
  console.error("❌ fetchScrapRateChart failed:", err);
    return [];
}
};

// Rework Rate Chart
export const fetchReworkRateChart = async () => {
    try{
  const res = await api.get("/Quality/ReworkRate");

  return (res.data || []).map(item => ({
    month: item.monthYear,          // "Apr-25"
    value: Number(item.percentage), // "2" → 2
  }));
}catch(err){
  console.error("❌ fetchReworkRateChart failed:", err);
    return [];
}
};

export const fetchCustomerComplaintCharts = async () => {
  try{
  const res = await api.get("/Quality/customercomplaint");

  return (res.data || []).map(item => ({
    month: item.monthYear,
    value: Number(item.percentage),
  }));
}catch(err){
  console.error("❌ fetchCustomerComplaintChart failed:", err);
    return [];
}
};

export const fetchCustomerReturnChart = async () => {
  try {
    const res = await api.get("/Quality/customerreturns");

    return (res.data || []).map(item => ({
      month: item.monthYear,          // "Apr-25"
      value: Number(item.percentage), // "7" → 7
    }));
  } catch (err) {
    console.error("❌ fetchCustomerReturnChart failed:", err);
    return [];
  }
};

// 🔷 Yield Rate Chart
export const fetchYieldRateChart = async () => {
  try {
    const res = await api.get("/quality/YieldRate");

    return (res.data || []).map(item => ({
      month: item.monthYear,          // "Apr-25"
      value: Number(item.percentage), // "84" → 84
    }));
  } catch (err) {
    console.error("❌ fetchYieldRateChart failed:", err);
    return [];
  }
};

// 🔷 Product Audit Closure Chart
export const fetchProductAuditChart = async () => {
  try {
    const res = await api.get("/quality/ProductAudit");

    return (res.data || []).map(item => ({
      month: item.monthYear,          
      value: Number(item.percentage), 
    }));
  } catch (err) {
    console.error("❌ fetchProductAuditChart failed:", err);
    return [];
  }
};

// 🔷 Process Audit Chart
export const fetchProcessAuditChart = async () => {
  try {
    const res = await api.get("/quality/ProcessAudit");

    return (res.data || []).map(item => ({
      month: item.monthYear,          
      value: Number(item.percentage), 
    }));
  } catch (err) {
    console.error("❌ fetchProcessAuditClosureChart failed:", err);
    return [];
  }
};

// 🔷 Quality KPI Cards
export const fetchQualityKPIs = async () => {
  try {
    const res = await api.get("/quality/FPY");

    const item = res.data?.[0];
    if (!item) return null;

    return {
      fpyMar: Number(item.fpyMar),
      fpyYtd: Number(item.fpyYtd),
      productAudit: Number(item.productAudit),
      processAudit: Number(item.processAudit),
    };
  } catch (err) {
    console.error("❌ fetchQualityKPIs failed:", err);
    return null;
  }
};

// 🔷 Inventory Value KPI
export const fetchInventoryValueKPI = async () => {
  try {
    const res = await api.get("/FiveSInventoryKpi/InventoryValue");

    const item = res.data?.[0];
    if (!item) return null;

    return {
      inventoryValues: Number(item.inventoryValues),
      stockAvailable: Number(item.stockAvailable),
      turnoverRatio: Number(item.turnoverRatio),
      inventoryToSalesRatio: Number(item.inventoryToSalesRatio),
      avgInventoryDays: Number(item.avgInventoryDays),
    };
  } catch (err) {
    console.error("❌ fetchInventoryValueKPI failed:", err);
    return null;
  }
};

// 🔷 Inventory Value KPI
export const fetchInventoryValueOverTime = async () => {
  try {
    const res = await api.get("/FiveSInventoryKpi/InventoryValueOver");

    const item = res.data?.[0];
    if (!item) return null;

    return {
      moMValue: Number(item.moMValue),
      inventoryValue: Number(item.inventoryValue),
      year: Number(item.year),
      month: Number(item.month),
     
    };
  } catch (err) {
    console.error("❌ fetchInventoryValueOverTime failed:", err);
    return null;
  }
};