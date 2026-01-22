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
