import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductionDashboard from './pages/ProductionDashboard';
import MaintenanceDashboard from './pages/MaintenanceDashboard';
import AnalyticsDashboard from './pages/AnalyticsDashboard';
import AnalyticsDashboard2 from './pages/AnalyticsDashboard2';
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
            <Route path="/analytics2" element={<AnalyticsDashboard2 />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </SettingsProvider>
  );
}

export default App;
