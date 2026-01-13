import React from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';

export function Card({ children, className, noPadding = false, ...props }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={clsx(
        "bg-white dark:bg-gray-800/60 backdrop-blur-md border border-gray-100 dark:border-gray-700/50 rounded-xl shadow-sm flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300",
        !noPadding && "p-4",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function CardHeader({ title, subtitle, icon: Icon, action, className }) {
  return (
    <div className={clsx("flex items-center justify-between mb-3 shrink-0", className)}>
      <div className="flex items-center gap-2.5">
        {Icon && (
          <div className="p-1.5 rounded-lg bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400">
            <Icon size={16} strokeWidth={2.5} />
          </div>
        )}
        <div>
          <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 leading-none">{title}</h3>
          {subtitle && <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>}
        </div>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}
