import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Wrench, Menu, X, Bell, User, Clock, 
  ChevronLeft, ChevronRight, Settings as SettingsIcon, LogOut, 
  Check, Moon, Sun, Maximize, Minimize, AlertCircle, Monitor,Factory,Activity,BarChart3,TrendingUp
} from 'lucide-react';
import { format } from 'date-fns';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useSettings } from '../context/SettingsContext';
import logo from "../assets/favicon.ico";
import logoDark from "../assets/Erpicon_white.png"




// Mock Notifications
const MOCK_NOTIFICATIONS = [
  { id: 1, title: 'Machine Breakdown', message: 'ASSY-09 reported hydraulic leak.', time: '10m ago', type: 'critical' },
  { id: 2, title: 'Stock Alert', message: 'Servo Motor 5kW below min level.', time: '1h ago', type: 'warning' },
  { id: 3, title: 'Shift Report', message: 'Shift A production summary available.', time: '2h ago', type: 'info' },
];

const SidebarItem = ({ to, icon: Icon, label, active, collapsed }) => (
  <Link
    to={to}
    className={clsx(
      "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 mb-1 group relative",
      active 
        ? "bg-primary-600 text-white shadow-md shadow-primary-500/20" 
        : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/50 hover:text-primary-600 dark:hover:text-primary-400",
      collapsed && "justify-center px-2"
    )}
    title={collapsed ? label : undefined}
  >
    <Icon size={20} className={clsx("shrink-0 transition-colors", active ? "text-white" : "text-gray-500 dark:text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400")} />
    
    {!collapsed && (
      <span className="font-medium text-sm whitespace-nowrap overflow-hidden">
        {label}
      </span>
    )}
    
    {active && !collapsed && (
      <motion.div layoutId="active-pill" className="absolute left-0 w-1 h-6 bg-white/20 rounded-r-full" />
    )}
  </Link>
);

export default function Layout({ children }) {
  const { settings, updateSettings } = useSettings();

  //logo switching
  const isDarkTheme =
  settings.theme === "dark" ||
  (settings.theme === "system" &&
    window.matchMedia("(prefers-color-scheme: dark)").matches);

const currentLogo = isDarkTheme ? logoDark : logo;

  
  // Sidebar States
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setCollapsed] = useState(false);
  
  // Notification States
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(MOCK_NOTIFICATIONS);
  const notificationRef = useRef(null);

  // Display States
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [fullscreenError, setFullscreenError] = useState(false);

  const [currentTime, setCurrentTime] = useState(new Date());
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const toggleTheme = () => {
    const nextTheme = settings.theme === 'light' ? 'dark' : settings.theme === 'dark' ? 'system' : 'light';
    updateSettings({ theme: nextTheme });
  };

  const toggleFullscreen = async () => {
    if (!document.fullscreenEnabled) {
      setFullscreenError(true);
      setTimeout(() => setFullscreenError(false), 3000);
      return;
    }

    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
        setIsFullscreen(true);
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
          setIsFullscreen(false);
        }
      }
      setFullscreenError(false);
    } catch (err) {
      setFullscreenError(true);
      setTimeout(() => setFullscreenError(false), 3000);
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setMobileOpen(false);
        setCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const clearNotifications = () => setNotifications([]);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-950 flex overflow-hidden text-gray-900 dark:text-gray-100 transition-colors duration-300 font-sans">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={clsx(
          "fixed inset-y-0 left-0 z-50 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 shadow-2xl lg:shadow-none transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1)] flex flex-col",
          isMobileOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0 lg:relative",
          isCollapsed ? "w-20" : "w-67"
        )}
      >
        {/* Sidebar Header */}
        <div className={clsx("h-20 flex items-center border-b border-gray-100 dark:border-gray-800 transition-all", isCollapsed ? "justify-center px-0" : "px-6")}>
         
         <div className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0">

<img
  src={currentLogo}
  alt="FactoryOps Logo"
  className="w-10 h-20 object-contain transition-all duration-300"
/>


          </div>
          
          <AnimatePresence>
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}
                className="ml-3 whitespace-nowrap"

              >
                  <div className="flex flex-col leading-tight">
                <span className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Larch{""}<span className="text-primary-600">Analytics</span>
                </span>
                {/* Description */}
          <span className="text-xs text-gray-500 dark:text-gray-400">
            An Automotive Software
          </span>
          </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button 
            className="ml-auto lg:hidden text-gray-500 hover:bg-gray-100 p-1 rounded-md"
            onClick={() => setMobileOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 mt-2 overflow-y-auto custom-scrollbar">
          {!isCollapsed && (
            <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2 px-3">
              {/* Modules */}
            </div>
          )}
          
          <SidebarItem to="/" icon={LayoutDashboard} label="Real Time Monitoring" active={location.pathname === '/'} collapsed={isCollapsed} />
          <SidebarItem to="/analytics" icon={Factory} label="Production Analytics" active={location.pathname === '/analytics'} collapsed={isCollapsed} />
           <SidebarItem to="/maintenanceanalytics" icon={Activity} label="Maintenance Analytics" active={location.pathname === '/maintenanceanalytics'} collapsed={isCollapsed} />
           <SidebarItem to="/Breakdownanalytics" icon={BarChart3 } label="Breakdown Analytics" active={location.pathname === '/Breakdownanalytics'} collapsed={isCollapsed} />
           <SidebarItem to="/Salesanalytics" icon={TrendingUp } label="Sales Analytics" active={location.pathname === '/Salesanalytics'} collapsed={isCollapsed} />
          <SidebarItem to="/maintenance" icon={Wrench} label="Maintenance" active={location.pathname === '/maintenance'} collapsed={isCollapsed} />
          
          <SidebarItem to="/settings" icon={SettingsIcon} label="Settings" active={location.pathname === '/settings'} collapsed={isCollapsed} />
        </nav>

        {/* Collapse Toggle */}
        <div className="hidden lg:flex justify-end px-4 py-3">
          <button 
            onClick={() => setCollapsed(!isCollapsed)}
            className="p-1.5 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-gray-700 transition-colors"
          >
            {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/50 backdrop-blur-sm">
          <div className={clsx("flex items-center gap-3", isCollapsed && "justify-center")}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 shrink-0 relative shadow-sm">
              <User size={18} />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></span>
            </div>
            {!isCollapsed && (
              <div className="overflow-hidden">
                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">Supervisor</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">Shift A • Online</p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden h-screen relative">
        {/* Glass Header */}
        <header className="h-16 glass z-30 flex items-center justify-between px-4 lg:px-6 sticky top-0 shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white p-2 -ml-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white hidden sm:block">
              {location.pathname === '/' ? 'Real Time Monitoring' : 
               location.pathname === '/maintenance' ? 'Maintenance Control' 
               : location.pathname === '/analytics' ? 'Production Analytics'
               : location.pathname === '/analytics2' ? 'Maintenance Analytics'
               : 'System Settings'}
            </h1>
            <span className="lg:hidden font-bold text-gray-800 dark:text-white">FactoryOps</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Fullscreen */}
            <div className="relative hidden sm:block">
              <button onClick={toggleFullscreen} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
              </button>
              <AnimatePresence>
                {fullscreenError && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute top-full right-0 mt-2 w-56 bg-red-50 text-red-600 text-xs p-2.5 rounded-lg shadow-lg border border-red-100 flex items-center gap-2 z-50 font-medium"
                  >
                    <AlertCircle size={14} /> Browser blocked fullscreen.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors relative">
              {settings.theme === 'dark' ? <Moon size={20} className="text-primary-400" /> : 
               settings.theme === 'light' ? <Sun size={20} className="text-amber-500" /> :
               <Monitor size={20} />}
            </button>

            {/* Clock */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800/50 rounded-full border border-gray-200 dark:border-gray-700/50">
              <Clock size={14} className="text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 font-mono tracking-tight">
                {format(currentTime, 'yyyy-MM-dd HH:mm:ss')}
              </span>
            </div>
            
            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button 
                className={clsx(
                  "relative p-2 rounded-full transition-all duration-200",
                  showNotifications ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600" : "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <Bell size={20} />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900 animate-pulse" />
                )}
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-80 sm:w-96 bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden origin-top-right z-50"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">Notifications</h3>
                      {notifications.length > 0 && (
                        <button onClick={clearNotifications} className="text-xs text-primary-600 font-medium hover:underline">
                          Mark all read
                        </button>
                      )}
                    </div>
                    
                    <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                      {notifications.length === 0 ? (
                        <div className="p-8 text-center text-gray-400 flex flex-col items-center">
                          <Check size={32} className="mb-2 opacity-50" />
                          <p className="text-sm">No new notifications</p>
                        </div>
                      ) : (
                        <ul className="divide-y divide-gray-50 dark:divide-gray-700/50">
                          {notifications.map((notif) => (
                            <li key={notif.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors cursor-pointer group">
                              <div className="flex gap-3">
                                <div className={clsx(
                                  "w-2 h-2 mt-2 rounded-full shrink-0 shadow-sm",
                                  notif.type === 'critical' ? "bg-red-500 shadow-red-500/50" :
                                  notif.type === 'warning' ? "bg-amber-500 shadow-amber-500/50" : "bg-primary-500 shadow-primary-500/50"
                                )} />
                                <div>
                                  <div className="flex justify-between items-start w-full">
                                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{notif.title}</p>
                                    <span className="text-[10px] text-gray-400 ml-4">{notif.time}</span>
                                  </div>
                                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-relaxed">{notif.message}</p>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block" />

            <button className="hidden sm:flex items-center gap-2 text-gray-500 hover:text-red-600 transition-colors" title="Logout">
              <LogOut size={20} />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-hidden p-3 lg:p-4 bg-gray-100/50 dark:bg-gray-950 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
