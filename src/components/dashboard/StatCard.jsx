import React from 'react';
import { Card } from '../ui/Card';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export function StatCard({ title, value, subtext, icon: Icon, colorClass, loading, smallValue }) {

  if (loading) {
    return (
      <Card className="h-24 justify-center">
        <div className="flex justify-between items-center">
          <div className="space-y-2 w-full">
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-24 justify-center relative overflow-hidden group border-0 shadow-md">

      {/* Gradient Background Overlay */}
      <div
        className={clsx(
          "absolute inset-0 opacity-10 dark:opacity-20 transition-opacity group-hover:opacity-20",
          colorClass?.bg.replace('bg-', 'bg-gradient-to-br from-white to-') || "bg-gray-100"
        )}
      />

      <div className="flex items-center justify-between z-10 relative px-1">

        <div>
          <p className="text-[11px] font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>

          <div className="flex items-baseline gap-2 mt-1">
            <h3
              className={clsx(
                smallValue ? "text-xl" : "text-2xl",
                "font-extrabold leading-none tracking-tight",
                colorClass?.text || "text-gray-800 dark:text-white"
              )}
            >
              {value}
            </h3>
          </div>

          {subtext && (
            <p className="text-[10px] text-gray-400 dark:text-gray-500 font-medium mt-1">
              {subtext}
            </p>
          )}
        </div>

        <motion.div
          whileHover={{ scale: 1.1, rotate: 5 }}
          className={clsx(
            "p-3 rounded-xl shadow-lg",
            colorClass?.bg || "bg-gray-100 dark:bg-gray-800",
            colorClass?.icon || "text-gray-600"
          )}
        >
          <Icon size={20} strokeWidth={2.5} />
        </motion.div>

      </div>

      {/* Decorative Shine */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rotate-45 transform group-hover:translate-x-2 transition-transform duration-500" />

    </Card>
  );
}