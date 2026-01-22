import { addHours, format, subMinutes } from 'date-fns';

// Utilities for generating realistic data
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomFloat = (min, max) => parseFloat((Math.random() * (max - min) + min).toFixed(1));

// Mock SQL Data Structures

export const fetchProductionKPIs = () => {
  return {
    oee: {
      availability: getRandomFloat(85, 98),
      performance: getRandomFloat(80, 95),
      quality: getRandomFloat(92, 99.9),
    },
    totalProduced: getRandomInt(1500, 2000),
    totalRejects: getRandomInt(10, 50),
    target: 2200,
  };
};

export const fetchMachineStatus = async () => {
  const res = await axios.get("/api/dashboard/production");
  return res.data;
};

export const fetchHourlyProduction = () => {
  const data = [];
  // Generate data from 6 AM to current time (mocking partial day)
  for (let i = 6; i <= 16; i++) {
    data.push({
      hour: `${i}:00`,
      achieved: getRandomInt(180, 220),
      plan: 200,
    });
  }
  return data;
};

export const fetchBottlenecks = () => {
  return [
    { machine: 'ASSY-04', reason: 'Component Shortage', duration: '45m' },
    { machine: 'ASSY-07', reason: 'Alignment Issue', duration: '30m' },
    { machine: 'ASSY-02', reason: 'Operator Break', duration: '15m' },
  ];
};

export const fetchMaintenanceData = () => {
  return {
    pmDue: [
      { machine: 'ASSY-01', dueDate: '2025-05-20', status: 'Pending' },
      { machine: 'ASSY-03', dueDate: '2025-05-18', status: 'Overdue' },
      { machine: 'CNC-02', dueDate: '2025-05-22', status: 'Scheduled' },
    ],
    activeBreakdowns: [
      { id: 'BD-092', machine: 'ASSY-09', issue: 'Hydraulic Leak', startTime: subMinutes(new Date(), 45).toISOString(), technician: 'Dave M.' },
      { id: 'BD-093', machine: 'PACK-01', issue: 'Sensor Fail', startTime: subMinutes(new Date(), 10).toISOString(), technician: 'Pending' },
    ],
    spareParts: [
      { part: 'Servo Motor 5kW', stock: 2, minLevel: 3, status: 'Critical' },
      { part: 'Hydraulic Seal Kit', stock: 15, minLevel: 10, status: 'OK' },
      { part: 'Proximity Sensor', stock: 4, minLevel: 5, status: 'Low' },
    ]
  };
};

// Mocking the specific procedure requested
export const pr_fetch_DeliveryOrder_Sales_Slide = () => {
  return {
    pendingDispatches: 12,
    packedQty: 4500,
    loadingDockStatus: 'Busy'
  };
};
