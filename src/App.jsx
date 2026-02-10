import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductionDashboard from './pages/ProductionDashboard';
import MaintenanceDashboard from './pages/MaintenanceDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AnalyticsDashboard2 from './pages/AnalyticsDashboard2';
import BreakdownAnalytics from './pages/BreakdownAnalytics';
import SalesAnalytics from './pages/SalesAnalytics';
import InvenotryAnalytics  from './pages/InvenotryAnalytics';
import InventoryKpi  from './pages/5sInventoryKpi';
import MTTRMTBF from './pages/MTTR&MTBF'; 
import QualityKpi from './pages/QualityKpi';
import SPCAnalysis from './pages/SPCAnalysis';
import ToolLifeAnalysis from './pages/ToolAnalysis';
import Settings from './pages/Settings';
import { SettingsProvider } from './context/SettingsContext';

function App() {
  return (
    <SettingsProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<ProductionDashboard />} />
            <Route path="/maintenance" element={<MaintenanceDashboard />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/maintenanceanalytics" element={<AnalyticsDashboard2 />} />
            <Route path="/mttrmtbf" element={<BreakdownAnalytics />} />
            <Route path="/Salesanalytics" element={<SalesAnalytics />} />
            <Route path="/inventory" element={<InvenotryAnalytics  />} />
            <Route path="/5sInventoryKpi" element={<InventoryKpi  />} />
            <Route path="/Breakdownanalytics" element={<MTTRMTBF />} />
            <Route path="/Qualitykpi" element={<QualityKpi />} />
            <Route path="/SPCAnalysis" element={<SPCAnalysis />} />
            <Route path="/ToolLifeAnalysis" element={<ToolLifeAnalysis />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </SettingsProvider>
  );
}

export default App;
