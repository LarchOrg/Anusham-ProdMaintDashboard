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

export const fetchMachineStatus = () => {
  const machines = [];
  for (let i = 1; i <= 10; i++) {
    const statusRand = Math.random();
    let status = 'Running';
    if (statusRand > 0.9) status = 'Breakdown';
    else if (statusRand > 0.8) status = 'Stop';

    machines.push({
      id: `MC-${i.toString().padStart(2, '0')}`,
      name: `ASSY-${i.toString().padStart(2, '0')}`,
      status: status,
      currentOrder: `WO-2025-${1000 + i}`,
      operator: `OP-${getRandomInt(100, 199)}`,
      produced: getRandomInt(100, 500),
      target: 550,
      rejects: getRandomInt(0, 5),
    });
  }
  return machines;
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
