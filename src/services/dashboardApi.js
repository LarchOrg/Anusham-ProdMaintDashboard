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
