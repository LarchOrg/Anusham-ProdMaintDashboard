import React, { useState } from 'react';
import { Save, RefreshCw, Monitor, Clock, Palette } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import clsx from 'clsx';

export default function Settings() {
  const { settings, updateSettings } = useSettings();
  const [saved, setSaved] = useState(false);
  const [localSettings, setLocalSettings] = useState(settings);

  const handleSave = () => {
    updateSettings(localSettings);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLiveChange = (key, value) => {
    const updated = { ...localSettings, [key]: value };
    setLocalSettings(updated);
    updateSettings(updated); // Instant apply for themes
  };

  return (
    <div className="h-full p-6 max-w-4xl mx-auto overflow-y-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">System Configuration</h1>
        <p className="text-gray-500 dark:text-gray-400">Manage dashboard behavior and preferences</p>
      </div>

      <div className="grid gap-6">
        {/* Display Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
              <Monitor size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Display & Theme</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme Preference</label>
              <select 
                value={localSettings.theme}
                onChange={(e) => handleLiveChange('theme', e.target.value)}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              >
                <option value="light">Light Mode</option>
                <option value="dark">Dark Mode</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Accent Color</label>
              <div className="flex gap-3">
                <button
                  onClick={() => handleLiveChange('colorTheme', 'blue')}
                  className={clsx(
                    "flex-1 p-2.5 rounded-lg border flex items-center justify-center gap-2 transition-all",
                    localSettings.colorTheme === 'blue' 
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500" 
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                  <span className="text-sm font-medium">Blue</span>
                </button>
                <button
                  onClick={() => handleLiveChange('colorTheme', 'teal')}
                  className={clsx(
                    "flex-1 p-2.5 rounded-lg border flex items-center justify-center gap-2 transition-all",
                    localSettings.colorTheme === 'teal' 
                      ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20 text-teal-700 dark:text-teal-300 ring-1 ring-teal-500" 
                      : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                  )}
                >
                  <div className="w-4 h-4 rounded-full bg-teal-600"></div>
                  <span className="text-sm font-medium">Teal</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Operational Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
              <RefreshCw size={24} />
            </div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Data & Operations</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Auto-Refresh Interval (seconds)</label>
              <input 
                type="number" 
                min="2" 
                max="60"
                value={localSettings.refreshRate}
                onChange={(e) => setLocalSettings({...localSettings, refreshRate: parseInt(e.target.value) || 10})}
                className="w-full p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Shift Start Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 text-gray-400" size={18} />
                <input 
                  type="time" 
                  value={localSettings.shiftStart}
                  onChange={(e) => setLocalSettings({...localSettings, shiftStart: e.target.value})}
                  className="w-full pl-10 p-2.5 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end pt-4">
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-primary-500/30"
          >
            <Save size={18} />
            {saved ? 'Settings Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
