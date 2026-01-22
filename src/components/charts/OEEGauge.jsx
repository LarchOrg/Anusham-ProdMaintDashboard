import React from 'react';
import ReactECharts from 'echarts-for-react';
import clsx from 'clsx';

export default function OEEGauge({ value, title, color = '#3b82f6', isDark }) {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 90,
        endAngle: -270,
        min: 0,
        max: 100,
        // Create a ring effect: Inner radius 75%, Outer 100%
        radius: '100%', 
        innerRadius: '75%',
        center: ['50%', '50%'],
        pointer: { show: false },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            color: color,
            shadowColor: color,
            shadowBlur: 5
          }
        },
        axisLine: {
          lineStyle: {
            width: 8, // Thinner background track
            color: [[1, isDark ? '#374151' : '#f3f4f6']]
          }
        },
        splitLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        data: [{ value: value }],
        detail: { show: false } // We use HTML overlay for sharper text
      }
    ]
  };

  return (
    <div className="h-full w-full flex flex-col items-center py-1">
      {/* Title at the top */}
      <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 text-center z-10">
        {title}
      </h4>
      
      {/* Chart Container with Centered Text Overlay */}
      <div className="flex-1 w-full min-h-0 relative">
        <ReactECharts 
          option={option} 
          style={{ height: '100%', width: '100%' }} 
          opts={{ renderer: 'svg' }}
        />
        
        {/* Absolute Centered Percentage */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className={clsx("text-xs font-black leading-none flex items-baseline", isDark ? "text-white" : "text-gray-800")}>
            {value}
            <span className="text-xs font-medium text-gray-400 ml-0.5">%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
