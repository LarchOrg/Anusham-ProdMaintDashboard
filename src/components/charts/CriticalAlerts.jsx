import React from "react";
import { AlertTriangle } from "lucide-react";

export default function CriticalAlerts() {
  return (
    <div className="p-5 space-y-4 border border-red-500/40 rounded-xl bg-red-500/5">
      
      {/* Title */}
      <h3 className="text-lg font-bold text-red-500 flex items-center gap-2">
        <AlertTriangle size={20} />
        Critical Alerts
      </h3>

      <div className="text-sm space-y-3">
        
        {/* ALERT */}
        <p className="text-gray-800 dark:text-gray-200">
          <span className="text-base font-extrabold text-red-400">
            ALERT:
          </span>{" "}
          Tool 63 – High Vibration
          <br />
          <span className="text-base font-semibold text-red-300">
            Replace in &lt; 100 cycles!
          </span>
        </p>

        {/* WARNING */}
        <p className="text-black dark:text-white">
          <span className="text-base font-extrabold text-amber-400">
            WARNING:
          </span>{" "}
          Tool 41 – Wear exceeds threshold
        </p>
      </div>
    </div>
  );
}
