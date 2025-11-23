import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { CalculationResult } from '../types';

interface DistributionChartProps {
  data: CalculationResult;
}

const DistributionChart: React.FC<DistributionChartProps> = ({ data }) => {
  const chartData = [
    { name: 'Ürün Maliyeti', value: data.costOfGoodsExVat, color: '#94a3b8' }, // Slate 400
    { name: 'Kargo + Reklam', value: data.shippingExVat + data.marketingExVat, color: '#60a5fa' }, // Blue 400
    { name: 'Komisyon', value: data.commissionExVat, color: '#fb923c' }, // Orange 400
    { name: 'Vergiler (KDV+GV)', value: data.incomeTax + data.vatPayable, color: '#f87171' }, // Red 400
    { name: 'Net Kâr', value: data.netProfit > 0 ? data.netProfit : 0, color: '#34d399' }, // Emerald 400
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-slate-800 text-white text-xs p-2 rounded shadow-lg border border-slate-700">
          <p className="font-semibold mb-1">{payload[0].name}</p>
          <p>
             {new Intl.NumberFormat('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(payload[0].value)} TL
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DistributionChart;