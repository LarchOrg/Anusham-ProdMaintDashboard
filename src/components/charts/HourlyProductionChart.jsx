import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';

export default function HourlyProductionChart({ data, isDark }) {
  const option = {
    tooltip: {
      trigger: 'axis',
      backgroundColor: isDark ? 'rgba(31, 41, 55, 0.9)' : 'rgba(255, 255, 255, 0.9)',
      borderColor: isDark ? '#374151' : '#e5e7eb',
      textStyle: {
        color: isDark ? '#f3f4f6' : '#333'
      },
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['Achieved', 'Plan'],
      bottom: 0,
      itemHeight: 8,
      itemWidth: 8,
      textStyle: { fontSize: 11, color: isDark ? '#9ca3af' : '#6b7280' }
    },
    grid: {
      left: '2%',
      right: '2%',
      bottom: '25px',
      top: '15px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.map(d => d.hour),
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { 
        color: isDark ? '#9ca3af' : '#6b7280', 
        fontSize: 10, 
        interval: 0,
        margin: 10
      }
    },
    yAxis: {
      type: 'value',
      splitLine: { 
        lineStyle: { 
          type: 'dashed', 
          color: isDark ? '#374151' : '#f3f4f6' 
        } 
      },
      axisLabel: { show: false } // Hide Y axis labels for cleaner look
    },
    series: [
      {
        name: 'Achieved',
        type: 'bar',
        data: data.map(d => d.achieved),
        itemStyle: {
          borderRadius: [4, 4, 0, 0],
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#3b82f6' },
            { offset: 1, color: 'rgba(59, 130, 246, 0.1)' }
          ])
        },
        barMaxWidth: 16,
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#60a5fa' },
              { offset: 1, color: 'rgba(96, 165, 250, 0.2)' }
            ])
          }
        }
      },
      {
        name: 'Plan',
        type: 'line',
        smooth: true, // Smooth curve
        data: data.map(d => d.plan),
        itemStyle: { color: '#10b981' },
        lineStyle: { 
          width: 3, 
          shadowColor: 'rgba(16, 185, 129, 0.5)', 
          shadowBlur: 10 
        },
        symbol: 'none', // Remove dots for cleaner line
        areaStyle: {
          opacity: 0.1,
          color: '#10b981'
        }
      }
    ]
  };

  return <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />;
}
