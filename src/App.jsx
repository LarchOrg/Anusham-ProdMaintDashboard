import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProductionDashboard from './pages/ProductionDashboard';
import MaintenanceDashboard from './pages/MaintenanceDashboard';
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
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
      </Router>
    </SettingsProvider>
  );
}

export default App;
