import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

export const useSettings = () => useContext(SettingsContext);

export const SettingsProvider = ({ children }) => {
  // Load initial settings from localStorage or defaults
  const [settings, setSettings] = useState(() => {
    const stored = localStorage.getItem('appSettings');
    return stored ? JSON.parse(stored) : {
      refreshRate: 10,
      shiftStart: '06:00',
      theme: 'system', // 'light', 'dark', 'system'
      colorTheme: 'blue', // 'blue', 'teal'
      notifications: true
    };
  });

  // Apply Light/Dark Mode
  useEffect(() => {
    const applyTheme = () => {
      const root = document.documentElement;
      const isDark = 
        settings.theme === 'dark' || 
        (settings.theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

      if (isDark) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
    };

    applyTheme();
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (settings.theme === 'system') applyTheme();
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [settings.theme]);

  // Apply Color Theme (Blue/Teal)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme-color', settings.colorTheme || 'blue');
  }, [settings.colorTheme]);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
