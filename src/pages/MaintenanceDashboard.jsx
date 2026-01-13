import React, { useState, useEffect } from 'react';
import { Wrench, AlertOctagon, Package, CheckSquare, Clock } from 'lucide-react';
import * as mockAPI from '../services/mockData';
import { format, parseISO } from 'date-fns';
import { Card, CardHeader } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import clsx from 'clsx';

export default function MaintenanceDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setData(mockAPI.fetchMaintenanceData());
      setLoading(false);
    }, 600);
  }, []);

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Top Row: Breakdowns & PM */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Active Breakdowns */}
        <Card className="flex flex-col min-h-0" noPadding>
          <div className="px-4 py-3 border-b border-red-100 dark:border-red-900/30 bg-red-50/50 dark:bg-red-900/10 flex justify-between items-center shrink-0">
            <h2 className="text-sm font-bold text-red-700 dark:text-red-400 flex items-center gap-2">
              <AlertOctagon size={16} />
              Active Breakdowns
            </h2>
            <Badge variant="danger" className="shadow-sm">
              {loading ? "..." : data?.activeBreakdowns.length} Active
            </Badge>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar p-0">
            {loading ? (
              <div className="p-4 space-y-3">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : data.activeBreakdowns.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-400 p-6">
                <CheckSquare size={40} className="mb-2 opacity-20" />
                <p className="text-sm">No active breakdowns. Systems operational.</p>
              </div>
            ) : (
              <table className="w-full text-sm text-left">
                <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700 sticky top-0">
                  <tr>
                    <th className="px-4 py-3 text-xs">Machine</th>
                    <th className="px-4 py-3 text-xs">Issue</th>
                    <th className="px-4 py-3 text-xs">Start Time</th>
                    <th className="px-4 py-3 text-xs">Tech</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                  {data.activeBreakdowns.map((bd) => (
                    <tr key={bd.id} className="bg-red-50/30 dark:bg-red-900/10 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <td className="px-4 py-3 font-bold text-gray-800 dark:text-gray-200 text-xs">{bd.machine}</td>
                      <td className="px-4 py-3 text-red-600 dark:text-red-400 text-xs font-medium">{bd.issue}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 font-mono text-xs flex items-center gap-1.5">
                        <Clock size={12} />
                        {format(parseISO(bd.startTime), 'HH:mm')}
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 px-2 py-0.5 rounded text-[10px] font-medium text-gray-700 dark:text-gray-300 shadow-sm">
                          {bd.technician}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </Card>

        {/* PM Schedule */}
        <Card className="flex flex-col min-h-0" noPadding>
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0">
            <h2 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <CheckSquare size={16} className="text-blue-600 dark:text-blue-400" />
              PM Schedule Status
            </h2>
          </div>
          <div className="flex-1 overflow-auto custom-scrollbar">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-medium border-b border-gray-100 dark:border-gray-700 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-xs">Machine</th>
                  <th className="px-4 py-3 text-xs">Due Date</th>
                  <th className="px-4 py-3 text-xs">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {loading ? (
                   Array.from({length: 5}).map((_, i) => (
                     <tr key={i}><td colSpan={3} className="p-3"><Skeleton className="h-4 w-full" /></td></tr>
                   ))
                ) : (
                  data.pmDue.map((pm, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 text-xs">{pm.machine}</td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">{pm.dueDate}</td>
                      <td className="px-4 py-3">
                        <Badge variant={
                          pm.status === 'Overdue' ? 'danger' : 
                          pm.status === 'Pending' ? 'warning' : 'info'
                        }>
                          {pm.status}
                        </Badge>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Bottom Row: Spare Parts */}
      <Card className="h-1/3 shrink-0 flex flex-col" noPadding>
        <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center shrink-0">
          <h2 className="text-sm font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Package size={16} className="text-purple-600 dark:text-purple-400" />
            Critical Spare Parts
          </h2>
        </div>
        <div className="flex-1 overflow-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {loading ? (
               [1,2,3].map(i => <Skeleton key={i} className="h-20 w-full rounded-lg" />)
            ) : (
              data.spareParts.map((part, idx) => (
                <div key={idx} className={clsx(
                  "p-3 rounded-xl border flex justify-between items-center shadow-sm transition-all hover:shadow-md",
                  part.status === 'Critical' ? "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-900/50" : 
                  part.status === 'Low' ? "bg-amber-50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-900/50" : "bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                )}>
                  <div>
                    <p className="font-bold text-gray-800 dark:text-gray-200 text-sm">{part.part}</p>
                    <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">Min Level: {part.minLevel}</p>
                  </div>
                  <div className="text-right">
                    <span className={clsx(
                      "text-xl font-bold block",
                      part.status === 'Critical' ? "text-red-600 dark:text-red-400" :
                      part.status === 'Low' ? "text-amber-600 dark:text-amber-400" : "text-green-600 dark:text-green-400"
                    )}>
                      {part.stock}
                    </span>
                    <Badge variant={part.status === 'Critical' ? 'danger' : part.status === 'Low' ? 'warning' : 'success'} className="mt-1">
                      {part.status}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
