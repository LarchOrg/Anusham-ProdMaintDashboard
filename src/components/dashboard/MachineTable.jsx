import React from 'react';
import { Download, AlertCircle, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { Skeleton } from '../ui/Skeleton';
import clsx from 'clsx';
import { motion } from 'framer-motion';

const StatusIndicator = ({ status }) => {
  const colors = {
    Running: "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]",
    Breakdown: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]",
    Stop: "bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]"
  };

  return (
    <div className="flex items-center gap-2">
      <div className={clsx("w-2.5 h-2.5 rounded-full animate-pulse", colors[status] || "bg-gray-400")} />
      <span className={clsx(
        "text-xs font-bold",
        status === 'Running' ? "text-green-700 dark:text-green-400" :
        status === 'Breakdown' ? "text-red-700 dark:text-red-400" : "text-amber-700 dark:text-amber-400"
      )}>
        {status}
      </span>
    </div>
  );
};

const ProgressBar = ({ current, total, status }) => {
  const percent = Math.min(100, Math.max(0, (current / total) * 100));
  const color = status === 'Breakdown' ? 'bg-red-500' : percent >= 100 ? 'bg-green-500' : 'bg-primary-500';
  
  return (
    <div className="w-full">
      <div className="flex justify-between text-[10px] mb-1 font-medium text-gray-500 dark:text-gray-400">
        <span>{current} / {total}</span>
        <span>{percent.toFixed(0)}%</span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={clsx("h-full rounded-full", color)}
        />
      </div>
    </div>
  );
};

export function MachineTable({ data, loading, onExport, refreshRate }) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-800/50 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
        <div>
          <h2 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
            Machine Status Monitor
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
          </h2>
          <p className="text-[10px] text-gray-400 mt-0.5">Live updates every {refreshRate}s</p>
        </div>
        <button 
          onClick={onExport}
          className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-1.5 rounded-lg transition-all"
        >
          <Download size={14} /> 
          <span className="hidden sm:inline">Export CSV</span>
        </button>
      </div>
      
      {/* Table Content */}
      <div className="flex-1 overflow-auto custom-scrollbar p-2">
        <table className="w-full text-sm text-left border-separate border-spacing-y-1">
          <thead className="text-gray-400 dark:text-gray-500 font-medium text-[11px] uppercase tracking-wider sticky top-0 z-10">
            <tr>
              <th className="px-4 py-2 bg-white dark:bg-gray-900">Machine / Order</th>
              <th className="px-4 py-2 bg-white dark:bg-gray-900">Status</th>
              <th className="px-4 py-2 bg-white dark:bg-gray-900 w-1/3">Production Progress</th>
              <th className="px-4 py-2 bg-white dark:bg-gray-900 text-right">Rejects</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              Array.from({ length: 8 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-3"><Skeleton className="h-10 w-32" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-6 w-20" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-4 w-full" /></td>
                  <td className="px-4 py-3"><Skeleton className="h-6 w-8 ml-auto" /></td>
                </tr>
              ))
            ) : (
              data.map((machine) => (
                <tr 
                  
                  key={`${machine.id}-${machine.currentOrder}`}

                  className="bg-gray-50/50 dark:bg-gray-800/40 hover:bg-white dark:hover:bg-gray-700 hover:shadow-md hover:scale-[1.005] transition-all duration-200 group rounded-lg"
                >
                  <td className="px-4 py-3 rounded-l-lg border-l-4 border-transparent hover:border-primary-500">
                    <div>
                      <span className="block font-bold text-gray-800 dark:text-gray-200 text-sm group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                        {machine.name}
                      </span>
                      <div className="flex items-center gap-1.5 text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 font-mono">
                        <span className="bg-gray-200 dark:bg-gray-700 px-1 rounded">{machine.currentOrder}</span>
                        <span>•</span>
                        <span>{machine.operator}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <StatusIndicator status={machine.status} />
                    {machine.status === 'Breakdown' && (
                      <span className="text-[10px] text-red-500 block mt-1 font-medium">Tech Notified</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <ProgressBar current={machine.produced} total={machine.target} status={machine.status} />
                  </td>
                  <td className="px-4 py-3 text-right rounded-r-lg">
                    <div className="flex items-center justify-end gap-2">
                      <span className={clsx(
                        "text-sm font-bold",
                        machine.rejects > 0 ? "text-red-600 dark:text-red-400" : "text-gray-400"
                      )}>
                        {machine.rejects}
                      </span>
                      {machine.rejects > 2 && (
                        <AlertCircle size={16} className="text-red-500 animate-pulse" />
                      )}
                      {machine.rejects === 0 && (
                        <CheckCircle2 size={16} className="text-green-500/30" />
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
